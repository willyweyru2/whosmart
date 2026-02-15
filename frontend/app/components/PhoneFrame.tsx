"use client";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-[390px] h-[844px] bg-black rounded-[40px] border border-neutral-800 shadow-2xl overflow-hidden">

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-xl z-10"></div>

        {/* Screen */}
        <div className="h-full w-full p-3">
          {children}
        </div>

      </div>
    </div>
  );
}
