"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Apple, Flame, CheckCircle2, Circle, Droplet, Plus, Minus, Utensils,
  Sparkles, ScanLine, Camera, Trash2, X, UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalState } from "@/lib/useLocalState";
import { useApp, useCurrentClient } from "@/lib/store";
import { EmptyState } from "@/components/ui/Modal";

type Goal = "cut" | "maintain" | "bulk";
type Pref = "Balanced" | "High-protein" | "Vegetarian" | "Keto";

interface GenMeal {
  name: string;
  items: string[];
  kcal: number;
}
interface GenPlan {
  goal: Goal;
  target: number;
  pref: Pref;
  meals: GenMeal[];
}

interface FoodEntry {
  id: string;
  name: string;
  kcal: number;
}

// Deterministic templates keyed by dietary preference.
const PREF_TEMPLATES: Record<Pref, GenMeal[]> = {
  Balanced: [
    { name: "Breakfast", items: ["Oatmeal", "Banana", "Greek yogurt"], kcal: 0 },
    { name: "Lunch", items: ["Grilled chicken", "Brown rice", "Mixed veg"], kcal: 0 },
    { name: "Snack", items: ["Apple", "Handful almonds"], kcal: 0 },
    { name: "Dinner", items: ["Baked cod", "Sweet potato", "Salad"], kcal: 0 },
  ],
  "High-protein": [
    { name: "Breakfast", items: ["Egg white omelette", "Turkey bacon", "Berries"], kcal: 0 },
    { name: "Lunch", items: ["Lean beef", "Quinoa", "Spinach"], kcal: 0 },
    { name: "Snack", items: ["Protein shake", "Cottage cheese"], kcal: 0 },
    { name: "Dinner", items: ["Grilled salmon", "Asparagus", "Lentils"], kcal: 0 },
  ],
  Vegetarian: [
    { name: "Breakfast", items: ["Tofu scramble", "Whole grain toast", "Avocado"], kcal: 0 },
    { name: "Lunch", items: ["Chickpea bowl", "Couscous", "Roasted veg"], kcal: 0 },
    { name: "Snack", items: ["Hummus", "Carrot sticks"], kcal: 0 },
    { name: "Dinner", items: ["Black bean chili", "Brown rice", "Greens"], kcal: 0 },
  ],
  Keto: [
    { name: "Breakfast", items: ["Eggs", "Avocado", "Cheese"], kcal: 0 },
    { name: "Lunch", items: ["Chicken thigh", "Olive oil salad", "Nuts"], kcal: 0 },
    { name: "Snack", items: ["Beef jerky", "Macadamias"], kcal: 0 },
    { name: "Dinner", items: ["Ribeye steak", "Buttered broccoli"], kcal: 0 },
  ],
};

// Distribute a calorie target across 4 meals (B/L/S/D weighting).
function buildPlan(goal: Goal, target: number, pref: Pref): GenPlan {
  const weights = [0.27, 0.33, 0.12, 0.28]; // sums to 1
  const base = PREF_TEMPLATES[pref];
  const meals = base.map((m, i) => ({
    ...m,
    items: [...m.items],
    kcal: Math.round((target * weights[i]) / 5) * 5, // round to nearest 5
  }));
  return { goal, target, pref, meals };
}

// Faux scanner preset foods.
const SCAN_FOODS = [
  { name: "Protein bar", kcal: 210 },
  { name: "Banana", kcal: 105 },
  { name: "Chicken breast (150g)", kcal: 248 },
  { name: "Greek yogurt cup", kcal: 130 },
  { name: "Almonds (28g)", kcal: 164 },
];
const PHOTO_FOODS = [
  { name: "Avocado toast", kcal: 290 },
  { name: "Caesar salad", kcal: 360 },
  { name: "Salmon poke bowl", kcal: 540 },
  { name: "Oatmeal & berries", kcal: 320 },
];

export default function ClientNutritionPage() {
  const app = useApp();
  const client = useCurrentClient();
  const plan = app.mealPlans[0];
  const waterTarget = 8;

  const [logged, setLogged] = useLocalState<string[]>("ffkc-logged-meals", []);
  const [water, setWater] = useLocalState<number>("ffkc-water", 4);
  const [foodLog, setFoodLog] = useLocalState<FoodEntry[]>("ffkc-foodlog", []);
  const [aiPlan, setAiPlan] = useLocalState<GenPlan | null>("ffkc-ai-meal", null);

  // AI generator form state (transient — no need to persist inputs)
  const [goal, setGoal] = useState<Goal>("cut");
  const [calTarget, setCalTarget] = useState<number>(1850);
  const [pref, setPref] = useState<Pref>("High-protein");

  // Quick-log scanner panel
  const [scanner, setScanner] = useState<null | "barcode" | "photo">(null);

  const toggleMeal = (name: string) =>
    setLogged((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );

  // Calories from logged plan meals + ad-hoc food log entries.
  const loggedMealKcal = (plan?.meals ?? [])
    .filter((m) => logged.includes(m.name))
    .reduce((acc, m) => acc + m.kcal, 0);
  const foodLogKcal = foodLog.reduce((acc, f) => acc + f.kcal, 0);
  const consumedCalories = loggedMealKcal + foodLogKcal;

  // Scale macros proportionally to the share of plan calories consumed.
  const macroShare = plan?.calories ? Math.min(1, loggedMealKcal / plan.calories) : 0;
  const consumed = useMemo(
    () => ({
      protein: Math.round((plan?.protein ?? 0) * macroShare),
      carbs: Math.round((plan?.carbs ?? 0) * macroShare),
      fat: Math.round((plan?.fat ?? 0) * macroShare),
    }),
    [plan, macroShare],
  );

  const addFood = (name: string, kcal: number) => {
    setFoodLog((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name, kcal },
    ]);
    setScanner(null);
  };
  const removeFood = (id: string) =>
    setFoodLog((prev) => prev.filter((f) => f.id !== id));

  const generate = () => {
    const target = Number.isFinite(calTarget) && calTarget > 0 ? calTarget : 2000;
    setAiPlan(buildPlan(goal, target, pref));
  };

  const aiTotal = aiPlan ? aiPlan.meals.reduce((a, m) => a + m.kcal, 0) : 0;

  if (!app.hydrated)
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-600" />
      </div>
    );

  if (!client)
    return (
      <EmptyState
        icon={UserPlus}
        title="No client selected"
        description="Add a client in the Trainer portal, then preview their experience here."
        action={<Link href="/dashboard/clients" className="btn-primary">Go to Clients</Link>}
      />
    );

  return (
    <div className="space-y-6">
      {plan ? (
        <>
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
                  {consumedCalories.toLocaleString()}
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
                tintClass="text-brand-400"
              />
              <MacroBar
                label="Carbs"
                consumed={consumed.carbs}
                target={plan.carbs}
                barClass="bg-accent-500"
                tintClass="text-accent-400"
              />
              <MacroBar
                label="Fat"
                consumed={consumed.fat}
                target={plan.fat}
                barClass="bg-amber-500"
                tintClass="text-amber-400"
              />
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-ink-50 p-4">
              <span className="text-sm font-medium text-ink-600">Calories</span>
              <span className="text-sm font-semibold text-ink-900">
                {consumedCalories.toLocaleString()} / {plan.calories.toLocaleString()} kcal
              </span>
            </div>
          </section>
        </>
      ) : (
        /* No assigned plan — keep the logging tools below working */
        <EmptyState
          icon={Apple}
          title="No meal plan assigned yet"
          description="Your coach hasn't assigned a nutrition plan. You can still quick-log food, generate an AI plan, and track water below."
        />
      )}

      {/* Quick log (faux scanners) */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink-900">Quick log</h2>
          <span className="text-sm text-ink-500">
            {foodLog.length} item{foodLog.length === 1 ? "" : "s"} · {foodLogKcal.toLocaleString()} kcal
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setScanner((s) => (s === "barcode" ? null : "barcode"))}
            className={cn(
              "flex flex-col items-center gap-1 rounded-2xl border p-4 text-sm font-semibold transition active:scale-95",
              scanner === "barcode"
                ? "border-brand-400 bg-brand-500/15 text-brand-400"
                : "border-ink-200 bg-ink-100 text-ink-700 hover:border-brand-300",
            )}
          >
            <ScanLine className="h-6 w-6" /> Scan barcode
          </button>
          <button
            type="button"
            onClick={() => setScanner((s) => (s === "photo" ? null : "photo"))}
            className={cn(
              "flex flex-col items-center gap-1 rounded-2xl border p-4 text-sm font-semibold transition active:scale-95",
              scanner === "photo"
                ? "border-accent-400 bg-accent-500/15 text-accent-400"
                : "border-ink-200 bg-ink-100 text-ink-700 hover:border-accent-300",
            )}
          >
            <Camera className="h-6 w-6" /> Photo log
          </button>
        </div>

        {/* Inline simulated scan result panel */}
        {scanner && (
          <div className="mt-4 rounded-2xl border border-ink-100 bg-ink-50 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-800">
                {scanner === "barcode" ? (
                  <>
                    <ScanLine className="h-4 w-4" /> Detected items
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" /> Recognized meals
                  </>
                )}
              </span>
              <button
                type="button"
                onClick={() => setScanner(null)}
                aria-label="Close scanner"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-ink-500">Tap a result to add it to today&apos;s food log.</p>
            <div className="mt-3 space-y-2">
              {(scanner === "barcode" ? SCAN_FOODS : PHOTO_FOODS).map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => addFood(f.name, f.kcal)}
                  className="flex w-full items-center justify-between rounded-xl border border-ink-100 bg-ink-100 px-3 py-2.5 text-left text-sm transition hover:border-brand-300 active:scale-[0.99]"
                >
                  <span className="font-medium text-ink-800">{f.name}</span>
                  <span className="flex items-center gap-2 text-xs text-ink-500">
                    {f.kcal} kcal
                    <Plus className="h-4 w-4 text-brand-400" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Today's food log */}
        {foodLog.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
              Today&apos;s food log
            </div>
            <div className="space-y-2">
              {foodLog.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-100 px-3 py-2.5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                    <Utensils className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink-800">{f.name}</span>
                  <span className="text-xs text-ink-500">{f.kcal} kcal</span>
                  <button
                    type="button"
                    onClick={() => removeFood(f.id)}
                    aria-label={`Remove ${f.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-ink-300 transition hover:bg-rose-500/15 hover:text-rose-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Meals */}
      {plan && (
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink-900">Meals</h2>
          <span className="text-sm text-ink-500">
            {logged.length} / {plan.meals.length} logged
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {plan.meals.map((meal) => {
            const isLogged = logged.includes(meal.name);
            return (
              <div
                key={meal.name}
                className={cn(
                  "rounded-2xl border p-4 transition",
                  isLogged
                    ? "border-accent-200 bg-accent-500/15"
                    : "border-ink-100 bg-ink-100"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
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
      )}

      {/* AI meal plan generator */}
      <section className="card p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-semibold text-ink-900">AI meal plan generator</h2>
            <p className="text-xs text-ink-400">Build a tailored day of meals instantly</p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="label">Goal</span>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as Goal)}
                className="input"
              >
                <option value="cut">Cut</option>
                <option value="maintain">Maintain</option>
                <option value="bulk">Bulk</option>
              </select>
            </label>
            <label className="block">
              <span className="label">Calorie target</span>
              <input
                type="number"
                inputMode="numeric"
                value={Number.isFinite(calTarget) ? calTarget : ""}
                onChange={(e) => setCalTarget(parseInt(e.target.value, 10))}
                className="input"
                min={1000}
                max={5000}
                step={50}
              />
            </label>
          </div>

          <div>
            <span className="label">Dietary preference</span>
            <div className="flex flex-wrap gap-2">
              {(["Balanced", "High-protein", "Vegetarian", "Keto"] as Pref[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPref(p)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-95",
                    pref === p
                      ? "border-brand-500 bg-brand-600 text-white shadow-glow"
                      : "border-ink-200 bg-ink-100 text-ink-700 hover:border-brand-300",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button type="button" onClick={generate} className="btn-primary w-full">
            <Sparkles className="h-4 w-4" /> Generate plan
          </button>
        </div>

        {/* Generated plan */}
        {aiPlan && (
          <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-900">
                {aiPlan.pref} · {aiPlan.goal} plan
              </span>
              <span className="text-xs text-ink-500">
                ~{aiTotal.toLocaleString()} / {aiPlan.target.toLocaleString()} kcal
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {aiPlan.meals.map((m) => (
                <div
                  key={m.name}
                  className="rounded-xl border border-ink-100 bg-ink-100 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink-900">{m.name}</span>
                    <span className="text-xs text-ink-400">{m.kcal} kcal</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-ink-50 px-2.5 py-0.5 text-xs text-ink-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
