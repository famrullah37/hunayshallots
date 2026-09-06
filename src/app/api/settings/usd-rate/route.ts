import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_USD_RATE } from "@/lib/currency";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const setting = await prisma.siteSettings.findUnique({ where: { key: "usd_rate" } });
    const rate = setting ? parseFloat(setting.value) : NaN;
    return NextResponse.json({ rate: rate > 0 ? rate : DEFAULT_USD_RATE });
  } catch {
    return NextResponse.json({ rate: DEFAULT_USD_RATE });
  }
}
