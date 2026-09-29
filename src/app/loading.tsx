import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07162C]">
      <div className="flex flex-col items-center gap-3 animate-pulse">
        <Image
          src="/images/logo.png"
          alt="SAIL logo"
          width={120}
          height={120}
          className="h-20 w-20 object-contain"
          priority
        />
      </div>
    </div>
  );
}
