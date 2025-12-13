import Image from "next/image";

export function HomePageCard({ product }) {
  return (
    <div>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg"
      />
    </div>
  );
}
