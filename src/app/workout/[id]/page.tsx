"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Workout } from "@/types/workout";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export default function WorkoutDetails() {
  const params = useParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const [isInPlan, setIsInPlan] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch workout
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

  // Check saved plan and saved workouts
  useEffect(() => {
    if (!id) return;

    const savedPlan: Workout[] = JSON.parse(
      localStorage.getItem(PLAN_KEY) || "[]"
    );

    const savedWorkouts: Workout[] = JSON.parse(
      localStorage.getItem(SAVED_KEY) || "[]"
    );

    setIsInPlan(
      savedPlan.some((item) => item.id === Number(id))
    );

    setIsSaved(
      savedWorkouts.some((item) => item.id === Number(id))
    );
  }, [id]);

  // Add workout to today's plan
  const handleAddToPlan = () => {
    if (!workout) return;

    const currentPlan: Workout[] = JSON.parse(
      localStorage.getItem(PLAN_KEY) || "[]"
    );

    const alreadyExists = currentPlan.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      toast.info("Workout is already in today's plan.");
      return;
    }

    const updatedPlan = [...currentPlan, workout];

    localStorage.setItem(
      PLAN_KEY,
      JSON.stringify(updatedPlan)
    );

    setIsInPlan(true);

    // Tell Navbar to update its count
    window.dispatchEvent(new Event("fitlog-storage"));

    toast.success("Workout added to today's plan!");
  };

  // Save workout for later
  const handleSaveForLater = () => {
    if (!workout) return;

    const currentSaved: Workout[] = JSON.parse(
      localStorage.getItem(SAVED_KEY) || "[]"
    );

    const alreadyExists = currentSaved.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      toast.info("Workout is already saved.");
      return;
    }

    const updatedSaved = [...currentSaved, workout];

    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(updatedSaved)
    );

    setIsSaved(true);

    // Tell Navbar to update its count
    window.dispatchEvent(new Event("fitlog-storage"));

    toast.success("Workout saved for later!");
  };

  // Loading
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
      </main>
    );
  }

  // Not found
  if (!workout) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0b0c0f] px-6 text-center">
        <p className="text-xs font-bold tracking-[0.15em] text-[#ccff00]">
          WORKOUT NOT FOUND
        </p>

        <h1 className="mt-3 text-2xl font-bold text-white">
          We couldn&apos;t find this workout.
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
    <main className="min-h-screen bg-[#0b0c0f] px-5 py-8">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex text-xs text-gray-400 transition hover:text-[#ccff00]"
        >
          ← Back to workouts
        </Link>

        {/* Main Details */}
        <div className="grid gap-10 lg:grid-cols-[405px_1fr]">

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col">

            {/* Title */}
            <h1 className="text-3xl font-black uppercase leading-[0.95] text-white md:text-4xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-xl text-xs leading-5 text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[9px] font-bold text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specifications */}
            <div className="mt-5 overflow-hidden rounded-xl border border-[#242832] bg-[#151820]">

              {/* Equipment */}
              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Equipment
                </span>

                <span className="text-[10px] text-gray-200">
                  {workout.equipment}
                </span>
              </div>

              {/* Difficulty */}
              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Difficulty
                </span>

                <span className="text-[10px] text-gray-200">
                  {workout.difficulty}
                </span>
              </div>

              {/* Sets */}
              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Sets
                </span>

                <span className="text-[10px] text-gray-200">
                  {workout.sets}
                </span>
              </div>

              {/* Reps */}
              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Reps
                </span>

                <span className="text-[10px] text-gray-200">
                  {workout.reps}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Duration
                </span>

                <span className="text-[10px] text-gray-200">
                  {workout.duration} min
                </span>
              </div>

              {/* Calories */}
              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Calories
                </span>

                <span className="text-[10px] text-gray-200">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Rating
                </span>

                <span className="text-[10px] text-gray-200">
                  {workout.rating}
                </span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-5">
              <p className="text-[10px] font-bold tracking-[0.12em] text-white">
                INSTRUCTIONS
              </p>

              <ol className="mt-3 space-y-2">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-[9px] leading-4 text-gray-400"
                  >
                    <span className="text-gray-500">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3">

              <button
                onClick={handleAddToPlan}
                disabled={isInPlan}
                className={`rounded-lg px-4 py-2.5 text-[9px] font-bold transition ${
                  isInPlan
                    ? "cursor-default bg-[#ccff00] text-black"
                    : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                }`}
              >
                {isInPlan
                  ? "✓ Added to today's plan"
                  : "▣ Add to today's plan"}
              </button>

              <button
                onClick={handleSaveForLater}
                disabled={isSaved}
                className={`rounded-lg border px-4 py-2.5 text-[9px] font-bold transition ${
                  isSaved
                    ? "border-[#ccff00] text-[#ccff00]"
                    : "border-[#343945] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
                }`}
              >
                {isSaved
                  ? "✓ Saved"
                  : "▢ Save for later"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}