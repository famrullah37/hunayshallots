"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { redis } from "@/lib/redis";
import crypto from "crypto";

const COOKIE_NAME = "admin_token";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days in seconds
const RATE_LIMIT_TTL = 60 * 15; // 15 minutes
const MAX_ATTEMPTS = 5;

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function getRateLimitKey(ip: string) {
  return `ratelimit:admin:${ip}`;
}

function getSessionKey(token: string) {
  return `session:admin:${token}`;
}

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Rate limiting: max 5 attempts per 15 min
  const rateLimitKey = getRateLimitKey("admin");
  const attempts = await redis.incr(rateLimitKey);
  if (attempts === 1) {
    await redis.expire(rateLimitKey, RATE_LIMIT_TTL);
  }
  if (attempts > MAX_ATTEMPTS) {
    const ttl = await redis.ttl(rateLimitKey);
    redirect(`/admin/login?error=rate&ttl=${ttl}`);
  }

  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword = password === process.env.ADMIN_PASSWORD;
  if (!validUsername || !validPassword) {
    redirect("/admin/login?error=1");
  }

  // Successful login — clear rate limit and create session
  await redis.del(rateLimitKey);

  const token = generateToken();
  await redis.setex(getSessionKey(token), SESSION_TTL, "admin");

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL,
    path: "/",
  });

  redirect("/admin");
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

export async function getSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    const session = await redis.get(getSessionKey(token));
    return session === "admin";
  } catch {
    return false;
  }
}
