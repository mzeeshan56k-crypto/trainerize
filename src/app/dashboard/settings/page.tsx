"use client";

import { useState } from "react";
import {
  User, Building2, CreditCard, Bell, Palette,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useLocalState } from "@/lib/useLocalState";
import { cn } from "@/lib/utils";

type TabId = "profile" | "business" | "billing" | "notifications" | "branding";

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business", icon: Building2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "branding", label: "Branding", icon: Palette },
];

const brandColors = [
  { name: "Brand Blue", value: "#1b82f5" },
  { name: "Emerald", value: "#10b981" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Ink", value: "#0f1729" },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        on ? "bg-brand-600" : "bg-ink-200",
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          on ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<TabId>("profile");
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    "New client signups": true,
    "Workout completions": true,
    "Client messages": true,
    "Weekly summary": false,
  });
  const [activeColor, setActiveColor] = useState(brandColors[0].value);
  const [brandLogo, setBrandLogo, brandLogoHydrated] = useLocalState<string | undefined>(
    "ffkc-brand-logo",
    undefined,
  );
  const [profilePhoto, setProfilePhoto, profilePhotoHydrated] = useLocalState<string | undefined>(
    "ffkc-profile-photo",
    undefined,
  );

  function toggleNotification(key: string) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your account, business and branding"
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="card h-fit p-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                tab === t.id
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>

        <div className="card p-6">
          {tab === "profile" && (
            <div>
              <h2 className="font-semibold text-ink-900">Profile</h2>
              <p className="text-sm text-ink-500">Update your personal details.</p>

              <div className="mt-6 flex items-center gap-4">
                {profilePhotoHydrated && profilePhoto ? (
                  <ImageUpload
                    value={profilePhoto}
                    aspect="square"
                    onChange={setProfilePhoto}
                    className="w-24"
                  />
                ) : (
                  <Avatar initials="AT" size="lg" />
                )}
                <div>
                  {profilePhotoHydrated && !profilePhoto && (
                    <ImageUpload
                      aspect="square"
                      label="Change photo"
                      onChange={setProfilePhoto}
                      className="w-24"
                    />
                  )}
                  <p className="mt-1.5 text-xs text-ink-400">JPG or PNG, up to 2MB.</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Full name</label>
                  <input className="input" defaultValue="Alex Turner" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input className="input" type="email" defaultValue="alex@fitforge.app" />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input className="input" defaultValue="+1 415 555 0100" />
                </div>
                <div>
                  <label className="label">Title</label>
                  <input className="input" defaultValue="Head Coach" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Bio</label>
                  <textarea
                    className="input min-h-[96px] resize-y"
                    defaultValue="Certified strength coach helping clients build sustainable habits and lasting results."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="button" className="btn-primary">Save changes</button>
              </div>
            </div>
          )}

          {tab === "business" && (
            <div>
              <h2 className="font-semibold text-ink-900">Business</h2>
              <p className="text-sm text-ink-500">Your coaching business details.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Business name</label>
                  <input className="input" defaultValue="FitForge Coaching" />
                </div>
                <div>
                  <label className="label">Website</label>
                  <input className="input" defaultValue="https://fitforge.app" />
                </div>
                <div>
                  <label className="label">Timezone</label>
                  <select className="input" defaultValue="America/Los_Angeles">
                    <option value="America/Los_Angeles">Pacific (PT)</option>
                    <option value="America/Denver">Mountain (MT)</option>
                    <option value="America/Chicago">Central (CT)</option>
                    <option value="America/New_York">Eastern (ET)</option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                </div>
                <div>
                  <label className="label">Currency</label>
                  <select className="input" defaultValue="USD">
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                    <option value="CAD">CAD — Canadian Dollar</option>
                    <option value="AUD">AUD — Australian Dollar</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="button" className="btn-primary">Save changes</button>
              </div>
            </div>
          )}

          {tab === "billing" && (
            <div>
              <h2 className="font-semibold text-ink-900">Billing</h2>
              <p className="text-sm text-ink-500">Manage your plan and payment method.</p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-100 bg-brand-50/50 p-5">
                <div>
                  <span className="badge bg-brand-100 text-brand-700">Current plan</span>
                  <div className="mt-2 text-lg font-bold text-ink-900">Pro · $49/mo</div>
                  <p className="text-sm text-ink-500">Renews on July 17, 2026</p>
                </div>
                <button type="button" className="btn-primary">Upgrade plan</button>
              </div>

              <div className="mt-6">
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium text-ink-700">Client usage</span>
                  <span className="text-ink-500">42 / 50 clients</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    style={{ width: "84%" }}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="label">Payment method</label>
                <div className="flex items-center gap-4 rounded-xl border border-ink-100 p-4">
                  <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-ink-900 text-xs font-bold text-white">
                    VISA
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-ink-900">Visa ending 4242</div>
                    <div className="text-xs text-ink-500">Expires 08 / 2028</div>
                  </div>
                  <button type="button" className="btn-secondary">Update</button>
                </div>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div>
              <h2 className="font-semibold text-ink-900">Notifications</h2>
              <p className="text-sm text-ink-500">Choose what you want to be notified about.</p>

              <div className="mt-6 divide-y divide-ink-100">
                {Object.keys(notifications).map((key) => (
                  <div key={key} className="flex items-center justify-between py-4">
                    <div>
                      <div className="text-sm font-medium text-ink-900">{key}</div>
                      <div className="text-xs text-ink-500">
                        Email and in-app alerts for {key.toLowerCase()}.
                      </div>
                    </div>
                    <Toggle on={notifications[key]} onToggle={() => toggleNotification(key)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "branding" && (
            <div>
              <h2 className="font-semibold text-ink-900">Branding</h2>
              <p className="text-sm text-ink-500">
                White-label the client app with your own identity.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">App name</label>
                  <input className="input" defaultValue="FitForge" />
                </div>
                <div>
                  <label className="label">Support email</label>
                  <input className="input" type="email" defaultValue="support@fitforge.app" />
                </div>
              </div>

              <div className="mt-6">
                <label className="label">Primary color</label>
                <div className="flex flex-wrap gap-3">
                  {brandColors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      title={c.name}
                      onClick={() => setActiveColor(c.value)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl ring-2 ring-offset-2 transition",
                        activeColor === c.value ? "ring-ink-900" : "ring-transparent",
                      )}
                      style={{ backgroundColor: c.value }}
                    >
                      {activeColor === c.value && <Check className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="label">Logo</label>
                {brandLogoHydrated && (
                  <ImageUpload
                    value={brandLogo}
                    aspect="video"
                    label="Upload logo"
                    onChange={setBrandLogo}
                  />
                )}
                <p className="mt-1.5 text-xs text-ink-400">
                  SVG or PNG, transparent background recommended.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="button" className="btn-primary">Save branding</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
