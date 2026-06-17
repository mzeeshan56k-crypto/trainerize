"use client";

import { useState } from "react";
import {
  Apple, Flame, CheckCircle2, Circle, Droplet, Plus, Minus, Utensils,
} from "lucide-react";
import { mealPlans } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ClientNutritionPage() {
  const plan = mealPlans[0];

  const [logged, setLogged] = useState<Set<string>>(new Set());
  const [water, setWater] = useState(4);
  const waterTarget = 8;

  const toggleMeal = (name: string) => {
    setLogged((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  // Fabricated "consumed" values (~70% of target) so the day feels in-progress.
  const consumed = {
    protein: Math.round(plan.protein * 0.7),
    carbs: Math.round(plan.carbs * 0.7),
    fat: Math.round(plan.fat * 0.7),
    calories: Math.round(plan.calories * 0.7),
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-accent-500 via-accent-600 to-brand-700 p-6 text-white shadow-glow">
        <div className="flex items-center gap-2 text-sm text-accent-50">
          <Apple className="h-4 w-4" />
          <span>Your nutrition plan</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold">{plan.name}</h1>
        <div className="mt-3 flex items-center gap-2">
          <span className="badge bg-white/20 text-white">{plan.tag}</span>
          <span className="text-sm text-accent-50">
            {plan.calories.toLocaleString()} kcal / day
          </span>
        </div>
        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-white/15 p-4 backdrop-blur">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <Flame className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-accent-50">
              Calories today
            </div>
            <div className="text-lg font-semibold">
              {consumed.calories.toLocaleString()}
              <span className="text-sm font-normal text-accent-50">
                {" "}/ {plan.calories.toLocaleString()} kcal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Today's macros */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink-900">Today&apos;s macros</h2>
        <div className="mt-4 space-y-4">
          <MacroBar
            label="Protein"
            consumed={consumed.protein}
            target={plan.protein}
            barClass="bg-brand-500"
            tintClass="text-brand-600"
          />
          <MacroBar
            label="Carbs"
            consumed={consumed.carbs}
            target={plan.carbs}
            barClass="bg-accent-500"
            tintClass="text-accent-600"
          />
          <MacroBar
            label="Fat"
            consumed={consumed.fat}
            target={plan.fat}
            barClass="bg-amber-500"
            tintClass="text-amber-600"
          />
        </div>
        <div className="mt-5 flex items-center justify-between rounded-xl bg-ink-50 p-4">
          <span className="text-sm font-medium text-ink-600">Calories</span>
          <span className="text-sm font-semibold text-ink-900">
            {consumed.calories.toLocaleString()} / {plan.calories.toLocaleString()} kcal
          </span>
        </div>
      </section>

      {/* Meals */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink-900">Meals</h2>
          <span className="text-sm text-ink-500">
            {logged.size} / {plan.meals.length} logged
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {plan.meals.map((meal) => {
            const isLogged = logged.has(meal.name);
            return (
              <div
                key={meal.name}
                className={cn(
                  "rounded-2xl border p-4 transition",
                  isLogged
                    ? "border-accent-200 bg-accent-50"
                    : "border-ink-100 bg-white"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Utensils className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-ink-900">{meal.name}</span>
                      <span className="text-xs text-ink-400">{meal.kcal} kcal</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {meal.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-ink-50 px-2.5 py-0.5 text-xs text-ink-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleMeal(meal.name)}
                    aria-label={isLogged ? `Mark ${meal.name} not eaten` : `Log ${meal.name} as eaten`}
                    aria-pressed={isLogged}
                    className="shrink-0 transition active:scale-90"
                  >
                    {isLogged ? (
                      <CheckCircle2 className="h-7 w-7 text-accent-500" />
                    ) : (
                      <Circle className="h-7 w-7 text-ink-200" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Water */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink-900">Log water</h2>
          <span className="text-sm text-ink-500">
            {water} / {waterTarget} glasses
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: waterTarget }).map((_, i) => (
            <Droplet
              key={i}
              className={cn(
                "h-7 w-7 transition",
                i < water ? "fill-brand-400 text-brand-500" : "text-ink-200"
              )}
            />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setWater((w) => Math.max(0, w - 1))}
            aria-label="Remove a glass of water"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition hover:bg-ink-50 active:scale-95"
          >
            <Minus className="h-5 w-5" />
          </button>
          <span className="w-16 text-center text-2xl font-bold text-ink-900">
            {water}
          </span>
          <button
            type="button"
            onClick={() => setWater((w) => Math.min(waterTarget, w + 1))}
            aria-label="Add a glass of water"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow transition hover:bg-brand-700 active:scale-95"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

function MacroBar({
  label, consumed, target, barClass, tintClass,
}: {
  label: string;
  consumed: number;
  target: number;
  barClass: string;
  tintClass: string;
}) {
  const pct = Math.min(100, Math.round((consumed / target) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink-700">{label}</span>
        <span className="text-ink-500">
          <span className={cn("font-semibold", tintClass)}>{consumed}g</span> / {target}g
        </span>
      </div>
      <div className="mt-1.5 h-2.5 w-full rounded-full bg-ink-100">
        <div
          className={cn("h-full rounded-full", barClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
