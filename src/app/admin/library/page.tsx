import {
  Plus, Dumbbell, GraduationCap, Clock, BookOpen, Pencil, Upload,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { exercises } from "@/lib/data";
import { courses } from "@/lib/platform";

export default function LibraryPage() {
  const exerciseChips = exercises.slice(0, 8);

  return (
    <>
      <PageHeader
        title="Global library"
        subtitle="Master content library shared across every facility and coach"
        action={
          <button className="btn-primary">
            <Plus className="h-4 w-4" /> Add asset
          </button>
        }
      />

      <section className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Dumbbell className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-semibold text-ink-900">Exercise library</h2>
              <p className="text-sm text-ink-500">{exercises.length} master exercises with demo videos</p>
            </div>
          </div>
          <span className="badge bg-ink-100 text-ink-700">Synced to all coaches</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {exerciseChips.map((e) => (
            <div key={e.id} className="flex items-center gap-3 rounded-xl border border-ink-100 p-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-500">
                <Dumbbell className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink-900">{e.name}</div>
                <div className="text-xs text-ink-500">{e.muscle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold text-ink-900">Educational courses</h2>
            <p className="text-sm text-ink-500">Published curriculum available to the network</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <div key={c.id} className="card overflow-hidden">
              <div className={`h-2 w-full bg-gradient-to-r ${c.color}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-ink-900">{c.title}</h3>
                  <span className="badge shrink-0 bg-brand-50 text-brand-700">{c.category}</span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-sm text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" /> {c.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {c.durationMin} min
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="btn-secondary flex-1">
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button className="btn-primary flex-1">
                    <Upload className="h-4 w-4" /> Publish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
