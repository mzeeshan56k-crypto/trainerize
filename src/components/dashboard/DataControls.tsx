"use client";

import { useState } from "react";
import { Database, Trash2, Sparkles } from "lucide-react";
import { useApp } from "@/lib/store";
import { Modal } from "@/components/ui/Modal";

export function DataControls({ variant = "inline" }: { variant?: "inline" | "card" }) {
  const { seedSampleData, resetAll, seeded, clients } = useApp();
  const [confirm, setConfirm] = useState<null | "seed" | "reset">(null);

  const hasData = clients.length > 0;

  const buttons = (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => setConfirm("seed")} className="btn-secondary">
        <Sparkles className="h-4 w-4" /> Load example data
      </button>
      <button
        onClick={() => setConfirm("reset")}
        disabled={!hasData && !seeded}
        className="btn border border-rose-200 text-rose-600 hover:bg-rose-50"
      >
        <Trash2 className="h-4 w-4" /> Clear all data
      </button>
    </div>
  );

  return (
    <>
      {variant === "card" ? (
        <div className="card p-5">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-brand-600" />
            <h3 className="font-semibold text-ink-900">Workspace data</h3>
          </div>
          <p className="mt-1 text-sm text-ink-500">
            Your data is stored locally in this browser. Load a fully-populated example
            workspace to explore, or clear everything to start fresh.
          </p>
          <div className="mt-4">{buttons}</div>
        </div>
      ) : (
        buttons
      )}

      <Modal
        open={confirm === "seed"}
        onClose={() => setConfirm(null)}
        title="Load example data?"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setConfirm(null)}>Cancel</button>
            <button
              className="btn-primary"
              onClick={() => { seedSampleData(); setConfirm(null); }}
            >
              Load example workspace
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-600">
          This fills every portal with example clients, programs, workouts, messages
          and analytics so you can see the platform fully populated. It replaces any
          current data in this browser.
        </p>
      </Modal>

      <Modal
        open={confirm === "reset"}
        onClose={() => setConfirm(null)}
        title="Clear all data?"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setConfirm(null)}>Cancel</button>
            <button
              className="btn border border-rose-200 bg-rose-600 text-white hover:bg-rose-700"
              onClick={() => { resetAll(); setConfirm(null); }}
            >
              Yes, clear everything
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-600">
          This permanently removes all clients, programs, workouts and other data from
          this browser. This cannot be undone.
        </p>
      </Modal>
    </>
  );
}
