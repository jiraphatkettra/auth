"use client";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-[#2997ff] to-[#90b8ff] flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white text-[11px] font-bold tracking-tight">PE</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white tracking-tight">
              Product<span className="text-[#2997ff]">Explorer</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-[#86868b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
            <span>DummyJSON API</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-[#a1a1a6] hidden sm:inline">
            Lab 11: RHF & Zod
          </span>
        </div>
      </div>
    </header>
  );
}
