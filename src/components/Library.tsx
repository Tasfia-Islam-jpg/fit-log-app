"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="bg-[#0b0c0f] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <p className="text-[10px] font-bold tracking-[0.15em] text-[#ccff00]">
          THE LIBRARY
        </p>

        <h2 className="mt-1 text-lg font-bold text-white">
          Twelve lifts covering every major muscle group.
        </h2>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
          </div>
        )}

        {/* Workout Grid */}
        {!loading && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <Link
                href={`/workout/${workout.id}`}
                key={workout.id}
                className="group overflow-hidden rounded-md border border-[#24262d] bg-[#111318] transition hover:border-[#ccff00]"
              >
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Tags */}
                  <div className="mb-2 flex flex-wrap gap-1">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-sm bg-[#ccff00] px-2 py-0.5 text-[8px] font-bold uppercase text-black"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  {/* Workout Name */}
                  <h3 className="text-xs font-bold uppercase text-white">
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-1 truncate text-[10px] text-gray-500">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-3 flex items-center justify-between border-t border-[#24262d] pt-2 text-[9px] text-gray-400">
                    <span>{workout.duration} min</span>

                    <span>{workout.caloriesBurned} kcal</span>

                    <span>★ {workout.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}