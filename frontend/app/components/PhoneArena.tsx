export default function PhoneArena({ children }: { children: any }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[390px] h-[780px] bg-black rounded-[40px] border border-purple-500 shadow-[0_0_40px_#a855f7] p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
        {children}
      </div>
    </div>
  );
}
