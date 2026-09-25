"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export default function Nav() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    const plan = JSON.parse(
      localStorage.getItem(PLAN_KEY) || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem(SAVED_KEY) || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener(
      "fitlog-storage",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage",
        updateCounts
      );
    };
  }, []);

  return (
    <nav className="border-b border-[#24262d] bg-[#0b0c0f]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={24}
            height={24}
          />

          <span className="text-sm font-black text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            href="/"
            className="text-[10px] text-gray-300 transition hover:text-[#ccff00]"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="text-[10px] text-gray-300 transition hover:text-[#ccff00]"
          >
            My Plan
          </Link>

        </div>

        {/* Counts */}
        <div className="flex items-center gap-5">

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[9px] text-gray-400"
          >
            <span>Plan</span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[8px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[9px] text-gray-400"
          >
            <span>Saved</span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-[#24262d] px-1 text-[8px] text-gray-400">
              {savedCount}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
}