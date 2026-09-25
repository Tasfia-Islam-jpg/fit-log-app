"use client";

import Image from "next/image";
import Link from "next/link";
import type { PlanItem } from "@/context/PlanContext";

type Props = {
  item: PlanItem;
  tab: "plan" | "saved";
  onRemove: (id: number) => void;
  onToggleDone?: (id: number) => void;
};

export default function PlanCard({
  item,
  tab,
  onRemove,
  onToggleDone,
}: Props) {
  const {
    id,
    name,
    image,
    equipment,
    duration,
    caloriesBurned,
    rating,
    done,
  } = item;

  return (
    <article
      className={`group flex min-h-[72px] items-center gap-3 rounded-md border border-[#252830] bg-[#111318] p-2.5 transition hover:border-[#3a3e47] sm:gap-4 sm:p-3 ${
        done ? "opacity-60" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded sm:h-16 sm:w-24">
        <Image
          src={image}
          alt={name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={`truncate text-[11px] font-black uppercase tracking-wide sm:text-xs ${
              done ? "text-gray-400 line-through" : "text-white"
            }`}
          >
            {name}
          </h3>

          {done && (
            <span className="hidden shrink-0 rounded bg-[#ccff00] px-1.5 py-0.5 text-[8px] font-black uppercase text-black sm:inline-block">
              Done
            </span>
          )}
        </div>

        <p className="mt-0.5 truncate text-[10px] text-gray-500">
          {equipment}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-gray-400 sm:text-[10px]">
          <span className="inline-flex items-center gap-1">
            <span className="text-gray-500">◷</span>
            {duration} min
          </span>

          <span className="inline-flex items-center gap-1">
            <span className="text-gray-500">🔥</span>
            {caloriesBurned} kcal
          </span>

          <span className="inline-flex items-center gap-1">
            <span className="text-[#ccff00]">★</span>
            {rating}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1.5">
        {/* Details */}
        <Link
          href={`/workout/${id}`}
          className="hidden rounded border border-[#2a2d34] px-2.5 py-1.5 text-[9px] font-bold text-gray-400 transition hover:border-[#ccff00] hover:text-white sm:inline-flex"
        >
          View Details
        </Link>

        {/* Done */}
        {tab === "plan" && onToggleDone && (
          <button
            type="button"
            onClick={() => onToggleDone(id)}
            className={`inline-flex h-7 items-center gap-1 rounded px-2.5 text-[9px] font-bold transition ${
              done
                ? "bg-[#ccff00] text-black"
                : "border border-[#2a2d34] text-gray-400 hover:border-[#ccff00] hover:text-white"
            }`}
          >
            <span>{done ? "✓" : "✓"}</span>

            <span className="hidden sm:inline">
              {done ? "Done" : "Mark as Done"}
            </span>
          </button>
        )}

        {/* Remove */}
        <button
          type="button"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${name}`}
          className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#2a2d34] text-sm leading-none text-gray-500 transition hover:border-red-500/50 hover:text-red-400"
        >
          ×
        </button>
      </div>
    </article>
  );
}
