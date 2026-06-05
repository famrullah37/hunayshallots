import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local", override: true });

import fs from "fs";
import path from "path";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Invalid frontmatter");

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^"(.*)"$/, "$1");
    meta[key] = val;
  }

  const content = match[2].trim();
  return { meta, content };
}

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Seeding ${files.length} artikel blog...\n`);

  for (const file of files) {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8").replace(/^﻿/, "");

    let meta: Record<string, string>;
    let content: string;
    try {
      ({ meta, content } = parseFrontmatter(raw));
    } catch {
      console.error(`  ✗ Gagal parse: ${file}`);
      continue;
    }

    const isId = meta.lang === "id";
    const titleId = isId ? meta.title : (meta.titleId ?? meta.title);
    const titleEn = isId ? (meta.titleEn ?? meta.title) : meta.title;
    const excerptId = isId ? meta.excerpt : (meta.excerptId ?? meta.excerpt);
    const excerptEn = isId ? (meta.excerptEn ?? meta.excerpt) : meta.excerpt;

    // Support ===EN=== separator for bilingual articles
    const [idPart, enPart] = content.split(/\n===EN===\n/);
    const contentId = isId ? idPart.trim() : (enPart ? idPart.trim() : null);
    const contentEn = isId ? (enPart ? enPart.trim() : null) : idPart.trim();
    const coverImage = meta.image ?? null;
    const publishedAt = meta.date ? new Date(meta.date) : new Date();

    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        titleId,
        titleEn,
        excerptId,
        excerptEn,
        contentId,
        contentEn,
        coverImage,
        isPublished: true,
        publishedAt,
      },
      create: {
        slug,
        titleId,
        titleEn,
        excerptId,
        excerptEn,
        contentId,
        contentEn,
        coverImage,
        isPublished: true,
        publishedAt,
      },
    });

    console.log(`  ✓ ${slug}`);
  }

  console.log(`\nDone! ${files.length} artikel berhasil di-seed.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
