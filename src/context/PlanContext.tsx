"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Workout } from "@/types/workout";

export type PlanItem = Workout & { done?: boolean };

type PlanContextType = {
  plan: PlanItem[];
  saved: PlanItem[];
  loaded: boolean;
  addToPlan: (w: Workout) => "added" | "exists" | "full";
  addToSaved: (w: Workout) => "added" | "exists";
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
};

const PLAN_CAP = 5;

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Restore from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    try {
      const p = localStorage.getItem("fitlog-plan");
      const s = localStorage.getItem("fitlog-saved");
      if (p) setPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

  function addToPlan(w: Workout) {
    if (plan.some((p) => p.id === w.id)) return "exists" as const;
    if (plan.length >= PLAN_CAP) return "full" as const;
    setPlan((prev) => [...prev, { ...w, done: false }]);
    return "added" as const;
  }

  function addToSaved(w: Workout) {
    if (saved.some((s) => s.id === w.id)) return "exists" as const;
    setSaved((prev) => [...prev, { ...w }]);
    return "added" as const;
  }

  function removeFromPlan(id: number) {
    setPlan((prev) => prev.filter((p) => p.id !== id));
  }

  function removeFromSaved(id: number) {
    setSaved((prev) => prev.filter((s) => s.id !== id));
  }

  function toggleDone(id: number) {
    setPlan((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        loaded,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}

export { PLAN_CAP };
