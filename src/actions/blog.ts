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

export async function createPost(formData: FormData) {
  const titleEn = formData.get("titleEn") as string;
  const slug = toSlug(titleEn);

  await prisma.blogPost.create({
    data: {
      titleId: formData.get("titleId") as string,
      titleEn,
      slug,
      contentId: (formData.get("contentId") as string) || null,
      contentEn: (formData.get("contentEn") as string) || null,
      excerptId: (formData.get("excerptId") as string) || null,
      excerptEn: (formData.get("excerptEn") as string) || null,
      coverImage: (formData.get("coverImage") as string) || null,
      isPublished: formData.get("isPublished") === "true",
      publishedAt:
        formData.get("isPublished") === "true" ? new Date() : null,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  const isPublished = formData.get("isPublished") === "true";
  const existing = await prisma.blogPost.findUnique({ where: { id } });

  await prisma.blogPost.update({
    where: { id },
    data: {
      titleId: formData.get("titleId") as string,
      titleEn: formData.get("titleEn") as string,
      contentId: (formData.get("contentId") as string) || null,
      contentEn: (formData.get("contentEn") as string) || null,
      excerptId: (formData.get("excerptId") as string) || null,
      excerptEn: (formData.get("excerptEn") as string) || null,
      coverImage: (formData.get("coverImage") as string) || null,
      isPublished,
      publishedAt:
        isPublished && !existing?.publishedAt ? new Date() : existing?.publishedAt,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function getPosts(publishedOnly = false) {
  return prisma.blogPost.findMany({
    where: publishedOnly ? { isPublished: true } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}
