import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FALLBACK: Record<string, object> = {
  p1: { id: "p1", nameId: "Paket Camilan Bawang Kemasan Box 200g", nameEn: "Onion Snack Package Box 200g", descriptionId: "Paket camilan bawang goreng premium dalam kemasan box eksklusif 200g.", descriptionEn: "Premium fried onion snack package in exclusive 200g box packaging.", price: 30000, weight: 250, category: "bawang-merah", imageUrl: "/products/camilan-bawang-merah-box.jpg", whatsappText: null, isActive: true },
  p2: { id: "p2", nameId: "Camilan Bawang Kemasan Pouch 125gr", nameEn: "Onion Snack Pouch 125gr", descriptionId: "Bawang goreng renyah dalam kemasan pouch praktis 125gr.", descriptionEn: "Crispy fried onion in a convenient 125gr pouch packaging.", price: 25000, weight: 150, category: "bawang-merah", imageUrl: "/products/camilan-bawang-merah-pouch.jpg", whatsappText: null, isActive: true },
  p3: { id: "p3", nameId: "Bawang Putih Goreng Toples 150gr", nameEn: "Fried Garlic Jar 150gr", descriptionId: "Bawang putih goreng premium dalam toples kaca 150gr, renyah dan tahan lama.", descriptionEn: "Premium fried garlic in a 150gr glass jar, crispy and long-lasting.", price: 35000, weight: 300, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-toples-150.jpg", whatsappText: null, isActive: true },
  p4: { id: "p4", nameId: "Bawang Merah Goreng Toples 150gr", nameEn: "Fried Shallot Jar 150gr", descriptionId: "Bawang merah goreng premium dalam toples kaca 150gr, gurih dan harum.", descriptionEn: "Premium fried shallot in a 150gr glass jar, savory and aromatic.", price: 35000, weight: 300, category: "bawang-merah", imageUrl: "/products/bawang-merah-goreng-toples-150.jpg", whatsappText: null, isActive: true },
  p5: { id: "p5", nameId: "Bawang Putih Goreng Pouch 100gr", nameEn: "Fried Garlic Pouch 100gr", descriptionId: "Bawang putih goreng dalam kemasan pouch 100gr, praktis untuk dibawa.", descriptionEn: "Fried garlic in a 100gr pouch, convenient to carry.", price: 25000, weight: 120, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-pouch.jpg", whatsappText: null, isActive: true },
  p6: { id: "p6", nameId: "Aneka Sambal Hunay", nameEn: "Hunay Sambal Varieties", descriptionId: "Koleksi sambal autentik Hunay dengan berbagai pilihan rasa pedas.", descriptionEn: "Hunay's authentic sambal collection with various spicy flavor options.", price: 25000, weight: 200, category: "sambal", imageUrl: "/products/sambel-geprek-pedas.jpg", whatsappText: null, isActive: true },
  p7: { id: "p7", nameId: "Bawang Putih Botol 75gr", nameEn: "Garlic Bottle 75gr", descriptionId: "Bawang putih goreng dalam kemasan botol 75gr, cocok untuk oleh-oleh.", descriptionEn: "Fried garlic in a 75gr bottle, perfect as a souvenir.", price: 20000, weight: 200, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-botol.jpg", whatsappText: null, isActive: true },
  p8: { id: "p8", nameId: "Bawang Merah Goreng Pouch 100gr", nameEn: "Fried Shallot Pouch 100gr", descriptionId: "Bawang merah goreng dalam kemasan pouch 100gr, renyah dan gurih.", descriptionEn: "Fried shallot in a 100gr pouch, crispy and savory.", price: 25000, weight: 120, category: "bawang-merah", imageUrl: "/products/bawang-merah-goreng-pouch.jpg", whatsappText: null, isActive: true },
};

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (product) return NextResponse.json(product);
  } catch {
    // fall through to fallback
  }
  const fallback = FALLBACK[id];
  if (fallback) return NextResponse.json(fallback);
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
