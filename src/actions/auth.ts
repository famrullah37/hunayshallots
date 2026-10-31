"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { redis } from "@/lib/redis";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import crypto from "crypto";

const COOKIE_NAME = "admin_token";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days in seconds
const RATE_LIMIT_TTL = 60 * 15; // 15 minutes
const MAX_ATTEMPTS = 5;

// "admin" sees everything; "produksi" (production team) handles orders, quote requests and products.
export type Role = "admin" | "produksi";
export type CurrentUser = { id: string | null; name: string; role: Role };

// Session values in Redis: "admin" for the owner account from env (also what
// sessions created before team accounts existed hold), "user:<id>" for team accounts.
const OWNER_SESSION = "admin";

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function getRateLimitKey(ip: string) {
  return `ratelimit:admin:${ip}`;
}

function getSessionKey(token: string) {
  return `session:admin:${token}`;
}

function homeFor(role: Role) {
  return role === "admin" ? "/admin" : "/admin/orders";
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  // Rate limiting: max 5 attempts per 15 min. If Redis is unreachable,
  // skip rate limiting rather than crashing the whole login flow.
  const rateLimitKey = getRateLimitKey("admin");
  try {
    const attempts = await redis.incr(rateLimitKey);
    if (attempts === 1) {
      await redis.expire(rateLimitKey, RATE_LIMIT_TTL);
    }
    if (attempts > MAX_ATTEMPTS) {
      const ttl = await redis.ttl(rateLimitKey);
      redirect(`/admin/login?error=rate&ttl=${ttl}`);
    }
  } catch (err) {
    if ((err as Error & { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    console.error("[auth] rate limit check failed, skipping:", err);
  }

  let sessionValue: string | null = null;
  let role: Role = "admin";

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    sessionValue = OWNER_SESSION;
  } else {
    const user = await prisma.adminUser.findUnique({ where: { username } }).catch(() => null);
    if (user?.isActive && (await verifyPassword(password, user.passwordHash))) {
      sessionValue = `user:${user.id}`;
      role = user.role === "admin" ? "admin" : "produksi";
    }
  }

  if (!sessionValue) {
    redirect("/admin/login?error=1");
  }

  let token: string;
  try {
    await redis.del(rateLimitKey).catch(() => {});
    token = generateToken();
    await redis.setex(getSessionKey(token), SESSION_TTL, sessionValue);
  } catch (err) {
    console.error("[auth] failed to create session in Redis:", err);
    redirect("/admin/login?error=redis");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL,
    path: "/",
  });

  redirect(homeFor(role));
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    await redis.del(getSessionKey(token));
  }

  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}

// Role and active flag are read from the database on every call, so
// deactivating an account or changing its role takes effect immediately.
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const session = await redis.get(getSessionKey(token));
    if (session === OWNER_SESSION) return { id: null, name: process.env.ADMIN_USERNAME || "Admin", role: "admin" };
    if (!session?.startsWith("user:")) return null;

    const user = await prisma.adminUser.findUnique({ where: { id: session.slice(5) } });
    if (!user?.isActive) return null;
    return { id: user.id, name: user.name, role: user.role === "admin" ? "admin" : "produksi" };
  } catch {
    return null;
  }
}

// Middleware only checks that the admin_token cookie is present, not that it
// maps to a live Redis session — every admin server action and page must call
// one of these itself or an attacker can forge the cookie and skip login entirely.
async function requireRole(roles: Role[]): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  if (!roles.includes(user.role)) redirect(homeFor(user.role));
  return user;
}

/** Owner/admin only: dashboard, blog, videos, settings, team accounts. */
export async function requireAdmin(): Promise<CurrentUser> {
  return requireRole(["admin"]);
}

/** Admin or production team: orders, quote requests, products. */
export async function requireTeam(): Promise<CurrentUser> {
  return requireRole(["admin", "produksi"]);
}
