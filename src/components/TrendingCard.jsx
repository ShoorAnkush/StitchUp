import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export const TrendingCard = () => {
  const trendingProducts = products.filter((product) => product.isTrending);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:p-6">
        {trendingProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};
