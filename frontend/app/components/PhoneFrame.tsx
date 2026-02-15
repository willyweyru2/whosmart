"use client";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">

      {/* iPhone Frame */}
      <div className="relative bg-black rounded-[44px] border border-neutral-800 shadow-2xl overflow-hidden
                      w-[390px] h-[844px] max-w-full max-h-full scale-[0.9] sm:scale-100">

        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[130px] h-[32px] bg-black rounded-full z-20 border border-neutral-800"></div>

        {/* Screen Safe Area */}
        <div className="h-full w-full pt-10 pb-6 px-4">
          {children}
        </div>

      </div>
    </div>
  );
}
