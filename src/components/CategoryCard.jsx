import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

// Build category map once
const categoryMap = {};
for (const p of products) {
  if (!categoryMap[p.category]) {
    categoryMap[p.category] = p;
  }
}

const categories = Object.keys(categoryMap);

export const CategoryCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {categories.map((category) => {
        const product = categoryMap[category];
        if (!product) return null;

        const img = Array.isArray(product.images)
          ? product.images[0]
          : typeof product.images === "string"
          ? product.images
          : "/placeholder.png";

        const href = `/${product.gender}?categories=${encodeURIComponent(
          category
        )}`;

        return (
          <Link
            key={category}
            href={href}
            className="flex flex-col items-center bg-gray-100 rounded-lg shadow hover:shadow-lg p-4 hover:scale-105 transition"
          >
            <div className="w-52 h-52 rounded overflow-hidden">
              <Image
                src={img}
                alt={category}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="mt-2 text-sm font-semibold">{category}</span>
          </Link>
        );
      })}
    </div>
  );
};
