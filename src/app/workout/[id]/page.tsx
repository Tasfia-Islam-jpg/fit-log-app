"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";

export default function WorkoutDetails() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workout");
        }

        const data: Workout[] = await response.json();

        const selectedWorkout = data.find(
          (item) => item.id === Number(id)
        );

        setWorkout(selectedWorkout || null);
      } catch (error) {
        console.error("Error fetching workout:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkout();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0b0c0f] px-6 text-center">
        <p className="text-xs font-bold tracking-[0.15em] text-[#ccff00]">
          WORKOUT NOT FOUND
        </p>

        <h1 className="mt-3 text-2xl font-bold text-white">
          We couldn't find this workout.
        </h1>

        <Link
          href="/"
          className="mt-6 rounded-sm bg-[#ccff00] px-5 py-2 text-xs font-bold text-black"
        >
          BACK TO WORKOUTS
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-6 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          href="/"
          className="mb-5 inline-flex text-xs text-gray-400 transition hover:text-[#ccff00]"
        >
          ← Back to workouts
        </Link>

        {/* Details Card */}
        <div className="overflow-hidden rounded-lg border border-[#24262d] bg-[#111318]">

          <div className="grid lg:grid-cols-2">

            {/* Image */}
            <div className="relative min-h-[350px] lg:min-h-[500px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Information */}
            <div className="p-6 lg:p-8">

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-sm bg-[#ccff00] px-2 py-1 text-[9px] font-bold uppercase text-black"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl">
                {workout.name}
              </h1>

              {/* Rating */}
              <p className="mt-3 text-sm text-gray-400">
                ★ {workout.rating}
              </p>

              {/* Description */}
              <div className="mt-6">
                <p className="text-[10px] font-bold tracking-[0.15em] text-[#ccff00]">
                  DESCRIPTION
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {workout.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="mt-6 grid grid-cols-2 gap-3">

                <div className="border border-[#24262d] bg-[#0b0c0f] p-3">
                  <p className="text-[9px] text-gray-500">
                    EQUIPMENT
                  </p>

                  <p className="mt-1 text-xs font-bold text-white">
                    {workout.equipment}
                  </p>
                </div>

                <div className="border border-[#24262d] bg-[#0b0c0f] p-3">
                  <p className="text-[9px] text-gray-500">
                    DIFFICULTY
                  </p>

                  <p className="mt-1 text-xs font-bold text-white">
                    {workout.difficulty}
                  </p>
                </div>

                <div className="border border-[#24262d] bg-[#0b0c0f] p-3">
                  <p className="text-[9px] text-gray-500">
                    DURATION
                  </p>

                  <p className="mt-1 text-xs font-bold text-white">
                    {workout.duration} MIN
                  </p>
                </div>

                <div className="border border-[#24262d] bg-[#0b0c0f] p-3">
                  <p className="text-[9px] text-gray-500">
                    CALORIES
                  </p>

                  <p className="mt-1 text-xs font-bold text-white">
                    {workout.caloriesBurned} KCAL
                  </p>
                </div>

                <div className="border border-[#24262d] bg-[#0b0c0f] p-3">
                  <p className="text-[9px] text-gray-500">
                    SETS
                  </p>

                  <p className="mt-1 text-xs font-bold text-white">
                    {workout.sets}
                  </p>
                </div>

                <div className="border border-[#24262d] bg-[#0b0c0f] p-3">
                  <p className="text-[9px] text-gray-500">
                    REPS
                  </p>

                  <p className="mt-1 text-xs font-bold text-white">
                    {workout.reps}
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Instructions */}
          <div className="border-t border-[#24262d] p-6 lg:p-8">

            <p className="text-[10px] font-bold tracking-[0.15em] text-[#ccff00]">
              INSTRUCTIONS
            </p>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-6 text-gray-400"
                >
                  <span className="font-bold text-[#ccff00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>

          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-[#24262d] p-6 sm:flex-row">

            <button
              className="flex-1 rounded-sm bg-[#ccff00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#b8e600]"
            >
              ADD TO TODAY&apos;S PLAN
            </button>

            <button
              className="flex-1 rounded-sm border border-[#ccff00] px-5 py-3 text-xs font-bold text-[#ccff00] transition hover:bg-[#ccff00] hover:text-black"
            >
              SAVE FOR LATER
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}