"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/actions/auth";
import { DEFAULT_USD_RATE } from "@/lib/currency";

export async function getShippingCost(): Promise<number> {
  try {
    const setting = await prisma.siteSettings.findUnique({ where: { key: "shipping_cost" } });
    return setting ? parseInt(setting.value, 10) : 0;
  } catch {
    return 0;
  }
}

export async function updateShippingCost(formData: FormData) {
  await requireAdmin();
  const cost = parseInt((formData.get("shipping_cost") as string) || "0", 10) || 0;
  await prisma.siteSettings.upsert({
    where: { key: "shipping_cost" },
    update: { value: String(cost) },
    create: { key: "shipping_cost", value: String(cost) },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/cart");
}

export async function getRajaOngkirSettings(): Promise<{ apiKey: string; originCityId: string }> {
  await requireAdmin();
  try {
    const [keySetting, originSetting] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { key: "rajaongkir_key" } }),
      prisma.siteSettings.findUnique({ where: { key: "origin_city_id" } }),
    ]);
    return {
      apiKey: keySetting?.value ?? "",
      originCityId: originSetting?.value ?? "439",
    };
  } catch {
    return { apiKey: "", originCityId: "439" };
  }
}

export async function updateRajaOngkirSettings(formData: FormData) {
  await requireAdmin();
  const apiKey = (formData.get("rajaongkir_key") as string)?.trim() ?? "";
  const originCityId = (formData.get("origin_city_id") as string)?.trim() || "439";

  await Promise.all([
    prisma.siteSettings.upsert({
      where: { key: "rajaongkir_key" },
      update: { value: apiKey },
      create: { key: "rajaongkir_key", value: apiKey },
    }),
    prisma.siteSettings.upsert({
      where: { key: "origin_city_id" },
      update: { value: originCityId },
      create: { key: "origin_city_id", value: originCityId },
    }),
  ]);
  revalidatePath("/admin/settings");
}

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
