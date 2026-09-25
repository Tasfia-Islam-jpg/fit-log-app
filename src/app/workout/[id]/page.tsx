"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

const SAVED_KEY = "fitlog-saved";

export default function WorkoutDetails() {
  const params = useParams();
  const { plan, addToPlan } = usePlan();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const isInPlan = workout
    ? plan.some((item) => item.id === workout.id)
    : false;

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
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkout();
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const savedWorkouts: Workout[] = JSON.parse(
      localStorage.getItem(SAVED_KEY) || "[]"
    );

    setIsSaved(
      savedWorkouts.some((item) => item.id === Number(id))
    );
  }, [id]);

  const handleAddToPlan = () => {
    if (!workout) return;

    if (isInPlan) {
      toast.info("Workout is already in today's plan.");
      return;
    }

    const result = addToPlan(workout);

    if (result === "added") {
      toast.success("Workout added to today's plan!");
    } else if (result === "exists") {
      toast.info("Workout is already in today's plan.");
    } else if (result === "full") {
      toast.info(
        "Today's plan is full. You can add up to 5 workouts."
      );
    }
  };

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

    window.dispatchEvent(new Event("fitlog-storage"));

    toast.success("Workout saved for later!");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
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

  const planIsFull = plan.length >= 5;

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex text-xs text-gray-400 transition hover:text-[#ccff00]"
        >
          ← Back to workouts
        </Link>

        <div className="grid gap-10 lg:grid-cols-[405px_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-black uppercase leading-[0.95] text-white md:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-3 max-w-xl text-xs leading-5 text-gray-400">
              {workout.description}
            </p>

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

            <div className="mt-5 overflow-hidden rounded-xl border border-[#242832] bg-[#151820]">
              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Equipment
                </span>
                <span className="text-[10px] text-gray-200">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Difficulty
                </span>
                <span className="text-[10px] text-gray-200">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Sets
                </span>
                <span className="text-[10px] text-gray-200">
                  {workout.sets}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Reps
                </span>
                <span className="text-[10px] text-gray-200">
                  {workout.reps}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Duration
                </span>
                <span className="text-[10px] text-gray-200">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#242832] px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Calories
                </span>
                <span className="text-[10px] text-gray-200">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Rating
                </span>
                <span className="text-[10px] text-gray-200">
                  {workout.rating}
                </span>
              </div>
            </div>

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

            <div className="mt-5 flex gap-3">
              <button
                onClick={handleAddToPlan}
                disabled={isInPlan || planIsFull}
                className={`rounded-lg px-4 py-2.5 text-[9px] font-bold transition ${
                  isInPlan || planIsFull
                    ? "cursor-not-allowed bg-[#ccff00] text-black opacity-60"
                    : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                }`}
              >
                {isInPlan
                  ? "✓ Added to today's plan"
                  : planIsFull
                    ? "Today's plan is full"
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
                {isSaved ? "✓ Saved" : "▢ Save for later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}