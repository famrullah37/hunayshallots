import { NextResponse } from "next/server";
import { getProducts } from "@/actions/products";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const exclude = searchParams.get("exclude");

  const products = await getProducts(true).catch(() => []);

  let result = products;
  if (category) result = result.filter((p) => p.category === category);
  if (exclude) result = result.filter((p) => p.id !== exclude);

  return NextResponse.json(result.slice(0, 4));
}
