import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  if (!id) notFound();

  let products = [];
  try {
    const mod = await import("@/data/products");
    products = mod.products ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to load products module:", err);
  }

  const product = products.find((p) => p.id.toString() === id.toString());

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
