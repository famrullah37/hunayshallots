import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const setting = await prisma.siteSettings.findUnique({ where: { key: "rajaongkir_key" } });
    const apiKey = setting?.value?.trim();
    if (!apiKey) return NextResponse.json({ error: "no_key" }, { status: 400 });

    const res = await fetch("https://api.rajaongkir.com/starter/province", {
      headers: { key: apiKey },
      next: { revalidate: 86400 },
    });
    const data = await res.json();
    const results = data?.rajaongkir?.results;
    if (!Array.isArray(results)) return NextResponse.json({ error: "invalid_key" }, { status: 400 });
    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 500 });
  }
}
