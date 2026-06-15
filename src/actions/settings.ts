"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getShippingCost(): Promise<number> {
  try {
    const setting = await prisma.siteSettings.findUnique({ where: { key: "shipping_cost" } });
    return setting ? parseInt(setting.value, 10) : 0;
  } catch {
    return 0;
  }
}

export async function updateShippingCost(formData: FormData) {
  const cost = parseInt((formData.get("shipping_cost") as string) || "0", 10) || 0;
  await prisma.siteSettings.upsert({
    where: { key: "shipping_cost" },
    update: { value: String(cost) },
    create: { key: "shipping_cost", value: String(cost) },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/cart");
}
