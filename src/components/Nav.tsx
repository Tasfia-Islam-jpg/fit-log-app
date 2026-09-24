import Link from "next/link";
import Image from "next/image"; 

export default function Nav() {
  return (
    <nav className="border-b border-[#24262d] bg-[#0b0c0f]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/logo.png" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog Logo" width={28} height={28} />

          <span className="text-sm font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full bg-[#ccff00] px-5 py-2 text-xs font-bold text-black"
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-5 py-2 text-xs font-medium text-gray-400 transition hover:text-white"
          >
            MY PLAN
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-3">

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-gray-300"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black">
              0
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-gray-300"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#ccff00] px-1.5 text-[10px] font-bold text-[#ccff00]">
              0
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
}