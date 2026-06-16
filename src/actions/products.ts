"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function uniqueSlug(base: string, excludeId?: string) {
  const slug = toSlug(base);
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (!existing || existing.id === excludeId) return slug;
  return `${slug}-${Math.random().toString(36).slice(2, 6)}`;
}

export async function createProduct(formData: FormData) {
  const nameEn = formData.get("nameEn") as string;
  const slug = await uniqueSlug(nameEn);
  await prisma.product.create({
    data: {
      slug,
      nameId: formData.get("nameId") as string,
      nameEn,
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

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}
