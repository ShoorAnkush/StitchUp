import Image from "next/image";

export function FeatureCard({ name, logo, bgGradient }) {
  return (
    <div className="relative w-72 h-72 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 mx-auto flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 rounded-2xl opacity-[0.08]"
        style={{ background: bgGradient }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src={logo}
          alt={`${name} Logo`}
          width={140}
          height={140}
          className="object-contain"
        />

        <h3 className="mt-6 text-sm font-medium tracking-wide text-gray-700 uppercase">
          {name}
        </h3>
      </div>
    </div>
  );
}
