"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  await prisma.product.create({
    data: {
      nameId: formData.get("nameId") as string,
      nameEn: formData.get("nameEn") as string,
      descriptionId: (formData.get("descriptionId") as string) || null,
      descriptionEn: (formData.get("descriptionEn") as string) || null,
      price: parseInt(formData.get("price") as string, 10),
      weight: parseInt((formData.get("weight") as string) || "0", 10),
      category: formData.get("category") as string,
      imageUrl: (formData.get("imageUrl") as string) || null,
      whatsappText: (formData.get("whatsappText") as string) || null,
      isActive: formData.get("isActive") === "true",
      sortOrder: parseInt((formData.get("sortOrder") as string) || "0", 10),
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await prisma.product.update({
    where: { id },
    data: {
      nameId: formData.get("nameId") as string,
      nameEn: formData.get("nameEn") as string,
      descriptionId: (formData.get("descriptionId") as string) || null,
      descriptionEn: (formData.get("descriptionEn") as string) || null,
      price: parseInt(formData.get("price") as string, 10),
      weight: parseInt((formData.get("weight") as string) || "0", 10),
      category: formData.get("category") as string,
      imageUrl: (formData.get("imageUrl") as string) || null,
      whatsappText: (formData.get("whatsappText") as string) || null,
      isActive: formData.get("isActive") === "true",
      sortOrder: parseInt((formData.get("sortOrder") as string) || "0", 10),
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function getProducts(activeOnly = false) {
  return prisma.product.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}
