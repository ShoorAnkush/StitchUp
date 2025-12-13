import Image from "next/image";

export function FeatureCard({ name, logo, bgClass }) {
  return (
    <div
      className={`relative rounded-xl mx-auto shadow-lg w-72 h-72 flex flex-col items-center justify-center text-center text-white overflow-hidden ${bgClass}`}
    >
      {/* Logo */}
      <Image
        src={logo}
        alt={`${name} Logo`}
        width={128}
        height={128}
        className="mb-4 object-contain"
      />

      {/* Name */}
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
}
