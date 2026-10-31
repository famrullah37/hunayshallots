"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { requireAdmin } from "@/actions/auth";

export type OrderItemInput = { id: string; name: string; quantity: number; price: number; weight: number };

export type OrderInput = {
  customerName: string;
  whatsapp: string;
  address: string;
  country: string;
  notes: string;
  items: OrderItemInput[];
  totalWeight: number;
  subtotal: number;
  shippingEstimate: number | null;
};

const MAX_PER_HOUR = 10;

function clean(value: unknown, max = 200): string {
  return String(value ?? "").trim().slice(0, max);
}

function toInt(value: unknown, max = 1_000_000_000): number {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0;
}

// Called fire-and-forget from /cart right before WhatsApp opens: the WhatsApp
// message stays the real order channel, this just keeps a record in admin.
export async function submitOrder(input: OrderInput): Promise<{ ok: boolean }> {
  const customerName = clean(input.customerName, 120);
  const whatsapp = clean(input.whatsapp, 40);
  const address = clean(input.address, 1000);
  const country = clean(input.country, 80);
  const notes = clean(input.notes, 1000);
  const items = (Array.isArray(input.items) ? input.items : []).slice(0, 50).map((i) => ({
    id: clean(i.id, 60),
    name: clean(i.name, 160),
    quantity: toInt(i.quantity, 999),
    price: toInt(i.price),
    weight: toInt(i.weight, 100_000),
  }));

  if (!customerName || !whatsapp || !address || !country || items.length === 0) return { ok: false };

  // Rate limit per IP. If Redis is down, keep the order rather than lose it.
  try {
    const h = await headers();
    const ip = (h.get("x-forwarded-for") || h.get("x-real-ip") || "unknown").split(",")[0].trim();
    const key = `ratelimit:order:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 60 * 60);
    if (count > MAX_PER_HOUR) return { ok: false };
  } catch {
    /* ignore */
  }

  try {
    await prisma.order.create({
      data: {
        customerName,
        whatsapp,
        address,
        country,
        notes: notes || null,
        items,
        totalWeight: toInt(input.totalWeight),
        subtotal: toInt(input.subtotal),
        shippingEstimate: input.shippingEstimate == null ? null : toInt(input.shippingEstimate),
      },
    });
    return { ok: true };
  } catch (err) {
    console.error("[order] save failed", err);
    return { ok: false };
  }
}

export async function getOrders() {
  await requireAdmin();
  return prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
}
