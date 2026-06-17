// Shared media config for the demo. Course masterclasses and exercise demos
// use public-domain sample clips so video playback works out of the box.
// Swap these URLs for your own hosted assets before going to production.

export const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
];

export function sampleVideo(seed: string | number) {
  const n =
    typeof seed === "number"
      ? seed
      : seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return SAMPLE_VIDEOS[n % SAMPLE_VIDEOS.length];
}

// Deterministic gradient poster for an exercise / lesson tile.
export const posterGradients = [
  "from-brand-500 to-brand-700",
  "from-accent-400 to-accent-600",
  "from-purple-500 to-indigo-600",
  "from-amber-400 to-orange-500",
  "from-rose-500 to-pink-600",
  "from-teal-500 to-emerald-600",
];

export function posterFor(seed: string | number) {
  const n =
    typeof seed === "number"
      ? seed
      : seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return posterGradients[n % posterGradients.length];
}
