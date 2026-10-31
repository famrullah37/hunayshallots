import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProductBySlug, getProducts } from "@/actions/products";

// Rendered per request: the Docker build has no database to prerender from.
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  const related = product.category
    ? (await getProducts(true).catch(() => []))
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  return <ProductDetail product={product} related={related} />;
}
