"use client";

import { useState } from "react";
import { Plus, Flame, Drumstick, Wheat, Droplet, Utensils } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { mealPlans, type MealPlan } from "@/lib/data";
import { cn } from "@/lib/utils";

const macroConfig = [
  { key: "protein" as const, label: "Protein", kcalPerG: 4, color: "bg-brand-500", text: "text-brand-700" },
  { key: "carbs" as const, label: "Carbs", kcalPerG: 4, color: "bg-accent-500", text: "text-accent-700" },
  { key: "fat" as const, label: "Fat", kcalPerG: 9, color: "bg-amber-500", text: "text-amber-700" },
];

export default function NutritionPage() {
  const [selected, setSelected] = useState<MealPlan>(mealPlans[0]);

  const macroKcal = {
    protein: selected.protein * 4,
    carbs: selected.carbs * 4,
    fat: selected.fat * 9,
  };
  const totalMacroKcal = macroKcal.protein + macroKcal.carbs + macroKcal.fat;
  const pct = (n: number) => (totalMacroKcal === 0 ? 0 : Math.round((n / totalMacroKcal) * 100));

  return (
    <>
      <PageHeader
        title="Nutrition"
        subtitle="Build meal plans and track macros"
        action={
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            New meal plan
          </button>
        }
      />

      {/* Macro stat cards for selected plan */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Calories" value={`${selected.calories.toLocaleString()} kcal`} icon={Flame} />
        <StatCard label="Protein (g)" value={`${selected.protein} g`} icon={Drumstick} />
        <StatCard label="Carbs (g)" value={`${selected.carbs} g`} icon={Wheat} />
        <StatCard label="Fat (g)" value={`${selected.fat} g`} icon={Droplet} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Meal plan list */}
        <div className="card p-4 lg:col-span-1">
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-ink-900">Meal plans</h2>
            <span className="badge bg-ink-100 text-ink-600">{mealPlans.length}</span>
          </div>
          <div className="space-y-2">
            {mealPlans.map((m) => {
              const active = selected.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={cn(
                    "w-full rounded-xl border p-3 text-left transition",
                    active
                      ? "border-brand-300 bg-brand-50/60"
                      : "border-ink-100 hover:border-brand-200 hover:bg-brand-50/30",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-ink-900">{m.name}</span>
                    <span className="badge bg-brand-50 text-brand-700">{m.tag}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                    <Flame className="h-3.5 w-3.5" />
                    {m.calories.toLocaleString()} kcal
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected plan detail */}
        <div className="space-y-6 lg:col-span-2">
          {/* Macro breakdown */}
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold text-ink-900">{selected.name}</h2>
                <p className="text-sm text-ink-500">Macro breakdown · {selected.calories.toLocaleString()} kcal/day</p>
              </div>
              <span className="badge bg-brand-50 text-brand-700">{selected.tag}</span>
            </div>

            <div className="mt-5 space-y-4">
              {macroConfig.map((mc) => {
                const grams = selected[mc.key];
                const kcal = macroKcal[mc.key];
                const percentage = pct(kcal);
                return (
                  <div key={mc.key}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-ink-700">
                        <span className={cn("h-2.5 w-2.5 rounded-full", mc.color)} />
                        {mc.label}
                      </span>
                      <span className="text-ink-500">
                        <span className={cn("font-semibold", mc.text)}>{grams} g</span>
                        {" · "}
                        {percentage}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-ink-100">
                      <div
                        className={cn("h-full rounded-full", mc.color)}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meals */}
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-brand-600" />
              <h2 className="font-semibold text-ink-900">Meals</h2>
              <span className="badge bg-ink-100 text-ink-600">{selected.meals.length}</span>
            </div>
            <div className="mt-4 space-y-3">
              {selected.meals.map((meal, i) => (
                <div key={i} className="rounded-xl border border-ink-100 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink-900">{meal.name}</h3>
                    <span className="flex items-center gap-1 text-xs font-medium text-ink-500">
                      <Flame className="h-3.5 w-3.5" /> {meal.kcal} kcal
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {meal.items.map((item, ii) => (
                      <span
                        key={ii}
                        className="inline-flex items-center rounded-full border border-ink-100 bg-ink-50 px-3 py-1 text-xs text-ink-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
