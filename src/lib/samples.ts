// Optional example dataset. Loaded only when the user clicks "Load example data".
// The live app starts empty — this is here so the platform can be explored fully.

import {
  clients, exercises, workouts, programs, mealPlans, conversations, appointments,
} from "@/lib/data";
import {
  kanbanColumns, challenges, aiSuggestions, platformUsers, broadcasts,
} from "@/lib/platform";
import type { DB } from "@/lib/store";

export const sampleData: DB = {
  clients,
  exercises,
  workouts,
  programs,
  mealPlans,
  conversations,
  appointments,
  kanban: kanbanColumns,
  challenges,
  aiSuggestions,
  users: platformUsers,
  broadcasts: broadcasts.map((b) => ({ ...b })),
  checkins: [],
  settings: {
    trainerName: "Alex Coach",
    trainerEmail: "alex@ffkc.app",
    businessName: "FitForge Coaching",
    brandColor: "#1b82f5",
  },
  currentClientId: clients[0]?.id ?? null,
  seeded: true,
};
