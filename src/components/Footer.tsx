import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#24262d] bg-[#0b0c0f]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
        {/* Logo - left */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog Logo" width={22} height={22} />
          <span className="text-sm font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright - right */}
        <p className="text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
