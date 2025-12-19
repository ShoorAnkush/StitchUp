// app/[gender]/page.jsx
import { products } from "@/data/products";
import { GenderPageClient } from "@/components/GenderPageClient";
import { FilterProvider } from "@/context/FilterContext";

export default async function GenderPage({ params }) {
  const { gender } = await params;

  const genderProducts = products.filter((p) => p.gender === gender);

  if (genderProducts.length === 0) {
    return (
      <div className="p-6">
        <p>No products found for {gender}.</p>
      </div>
    );
  }

  return (
    <FilterProvider>
      <GenderPageClient gender={gender} products={genderProducts} />
    </FilterProvider>
  );
}
