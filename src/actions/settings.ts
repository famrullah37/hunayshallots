"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/actions/auth";
import { DEFAULT_USD_RATE } from "@/lib/currency";

export async function getUsdRate(): Promise<number> {
  await requireAdmin();
  try {
    const setting = await prisma.siteSettings.findUnique({ where: { key: "usd_rate" } });
    const rate = setting ? parseFloat(setting.value) : NaN;
    return rate > 0 ? rate : DEFAULT_USD_RATE;
  } catch {
    return DEFAULT_USD_RATE;
  }
}

export async function updateUsdRate(formData: FormData) {
  await requireAdmin();
  const rate = parseFloat((formData.get("usd_rate") as string) || "") || DEFAULT_USD_RATE;
  await prisma.siteSettings.upsert({
    where: { key: "usd_rate" },
    update: { value: String(rate) },
    create: { key: "usd_rate", value: String(rate) },
  });
  revalidatePath("/admin/settings");
}
