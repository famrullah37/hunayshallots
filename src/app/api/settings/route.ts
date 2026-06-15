import { NextResponse } from "next/server";
import { getShippingCost } from "@/actions/settings";

export async function GET() {
  const shippingCost = await getShippingCost();
  return NextResponse.json({ shippingCost });
}
