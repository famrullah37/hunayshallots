import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { destination, weight, courier } = body;
  if (!destination || !courier) {
    return NextResponse.json({ error: "destination and courier required" }, { status: 400 });
  }

  try {
    const [keySetting, originSetting] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { key: "rajaongkir_key" } }),
      prisma.siteSettings.findUnique({ where: { key: "origin_city_id" } }),
    ]);

    const apiKey = keySetting?.value?.trim();
    if (!apiKey) return NextResponse.json({ error: "no_key" }, { status: 400 });

    const originCityId = originSetting?.value?.trim() || "439";
    const weightGrams = Math.max(1000, Number(weight));

    const params = new URLSearchParams({
      origin: originCityId,
      destination: String(destination),
      weight: String(weightGrams),
      courier,
    });

    const res = await fetch("https://api.rajaongkir.com/starter/cost", {
      method: "POST",
      headers: {
        key: apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const data = await res.json();
    const results = data?.rajaongkir?.results;
    if (!Array.isArray(results)) {
      return NextResponse.json({ error: data?.rajaongkir?.status?.description || "invalid_response" }, { status: 400 });
    }
    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 500 });
  }
}
