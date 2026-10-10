"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { requireAdmin } from "@/actions/auth";

export type InquiryState = { ok: boolean; error?: string };

const MAX_PER_HOUR = 5;

function clean(value: FormDataEntryValue | null, max = 200): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: real users never see or fill this field.
  if (clean(formData.get("website"))) return { ok: true };

  const name = clean(formData.get("name"), 120);
  const company = clean(formData.get("company"), 160);
  const email = clean(formData.get("email"), 160);
  const phone = clean(formData.get("phone"), 40);
  const country = clean(formData.get("country"), 80);
  const product = clean(formData.get("product"), 80);
  const volume = clean(formData.get("volume"), 80);
  const packaging = clean(formData.get("packaging"), 80);
  const message = clean(formData.get("message"), 3000);
  const sourcePage = clean(formData.get("sourcePage"), 120);

  if (!name || !company || !email || !country || !product) {
    return { ok: false, error: "missing" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "email" };
  }

  // Rate limit per IP. If Redis is down, accept the inquiry rather than lose a lead.
  try {
    const h = await headers();
    const ip = (h.get("x-forwarded-for") || h.get("x-real-ip") || "unknown").split(",")[0].trim();
    const key = `ratelimit:inquiry:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 60 * 60);
    if (count > MAX_PER_HOUR) return { ok: false, error: "rate" };
  } catch {
    /* ignore */
  }

  try {
    await prisma.inquiry.create({
      data: {
        name,
        company,
        email,
        phone: phone || null,
        country,
        product,
        volume: volume || null,
        packaging: packaging || null,
        message: message || null,
        sourcePage: sourcePage || null,
      },
    });
  } catch (err) {
    console.error("[inquiry] save failed", err);
    return { ok: false, error: "server" };
  }

  return { ok: true };
}

export async function getInquiries() {
  await requireAdmin();
  return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
}
