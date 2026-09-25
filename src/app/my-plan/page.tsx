"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";
import PlanCard from "@/components/PlanCard";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const [tab, setTab] = useState<Tab>("plan");

  // Sort By
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const {
    plan,
    saved,
    loaded,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  } = usePlan();

 const statsList = tab === "plan" ? plan : saved;

const minutes = statsList.reduce(
  (sum, workout) => sum + workout.duration,
  0
);

const calories = statsList.reduce(
  (sum, workout) => sum + workout.caloriesBurned,
  0
);


  const list = tab === "plan" ? plan : saved;

  // Sort the current list
  const sortedList = useMemo(() => {
    return [...list].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      // Rating: highest rating first
      return b.rating - a.rating;
    });
  }, [list, sortBy]);

  function handleRemove(id: number) {
    if (tab === "plan") {
      removeFromPlan(id);
      toast.success("Removed from today's plan");
    } else {
      removeFromSaved(id);
      toast.success("Removed from saved");
    }
  }

  function handleToggleDone(id: number) {
    const workout = plan.find((item) => item.id === id);

    toggleDone(id);

    toast.success(
      workout?.done
        ? "Marked as not done"
        : "Marked as done"
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#090a0d]">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <section>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            My Plan
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* Metrics */}
        <section className="mt-6 overflow-hidden rounded-md border border-[#252830] bg-[#111318]">
          <div className="grid grid-cols-3">

            <div className="border-r border-[#252830] px-3 py-4 text-center sm:px-6 sm:py-5">
              <p className="text-xl font-black leading-none text-white sm:text-2xl">
                {statsList.length}
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[10px]">
                Exercises
              </p>
            </div>

            <div className="border-r border-[#252830] px-3 py-4 text-center sm:px-6 sm:py-5">
              <p className="text-xl font-black leading-none text-white sm:text-2xl">
                {minutes}
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[10px]">
                Minutes
              </p>
            </div>

            <div className="px-3 py-4 text-center sm:px-6 sm:py-5">
              <p className="text-xl font-black leading-none text-white sm:text-2xl">
                {calories}
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[10px]">
                Calories
              </p>
            </div>

          </div>
        </section>

        {/* Tabs + Sort */}
        <div className="mt-6 flex items-end justify-between border-b border-[#252830]">

          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab("plan")}
              className={`relative px-4 pb-3 text-[11px] font-bold uppercase tracking-wide transition ${
                tab === "plan"
                  ? "text-[#ccff00]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Today's Plan

              {tab === "plan" && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#ccff00]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setTab("saved")}
              className={`relative px-4 pb-3 text-[11px] font-bold uppercase tracking-wide transition ${
                tab === "saved"
                  ? "text-[#ccff00]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Saved

              {tab === "saved" && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#ccff00]" />
              )}
            </button>
          </div>

          {/* C1 - Sort Dropdown */}
          <div className="relative mb-2">
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as SortOption
                )
              }
              aria-label="Sort workouts"
              className="h-9 appearance-none rounded-md border border-[#2a2d34] bg-[#111318] px-3 pr-8 text-[10px] font-bold text-gray-300 outline-none transition hover:border-[#3a3e47] focus:border-[#ccff00]"
            >
              <option value="duration">
                Sort By: Duration
              </option>

              <option value="calories">
                Sort By: Calories
              </option>

              <option value="rating">
                Sort By: Rating
              </option>
            </select>

            {/* Chevron */}
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Loading */}
        {!loaded && (
          <div className="flex min-h-48 items-center justify-center">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="loading loading-spinner loading-sm text-[#ccff00]" />
              Loading workouts...
            </div>
          </div>
        )}

        {/* Empty State */}
        {loaded && sortedList.length === 0 && (
          <div className="mt-5 flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-[#252830] bg-[#111318] px-6 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-white">
              Nothing Here Yet
            </p>

            <p className="mt-2 max-w-sm text-xs leading-5 text-gray-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex h-9 items-center rounded-md bg-[#ccff00] px-5 text-[10px] font-black uppercase tracking-wide text-black transition hover:bg-[#bdf000]"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {/* Workout List */}
        {loaded && sortedList.length > 0 && (
          <div className="mt-4 space-y-2">
            {sortedList.map((item) => (
              <PlanCard
                key={item.id}
                item={item}
                tab={tab}
                onRemove={handleRemove}
                onToggleDone={
                  tab === "plan"
                    ? handleToggleDone
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
