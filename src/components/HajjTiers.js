// src/constants/hajjTiers.js
//
// Single source of truth for Hajj package tiers.
// When you add "Gold", "Platinum", "Premium" — just add a line below.
// Every component that imports this (detail page, listing page, cards)
// picks up the new tier automatically: no other code changes needed.

// Order = display/sort order, low to high (or however you want them ranked)
export const TIER_ORDER = ["Silver", "Comfort", "Gold", "Platinum", "Premium"];

// Visual style per tier. Add a matching entry whenever you add a tier above.
// `badge`  -> classes for the small pill (used in cards/lists)
// `accent` -> hex used for things like the hero tier badge, borders, etc.
export const TIER_STYLES = {
  Silver: {
    badge: "bg-stone-200 text-stone-700",
    accent: "#8b8b8b",
  },
  Comfort: {
    badge: "bg-sky-100 text-sky-700",
    accent: "#0ea5e9",
  },
  Gold: {
    badge: "bg-amber-100 text-amber-800",
    accent: "#D4A017",
  },
  Platinum: {
    badge: "bg-slate-200 text-slate-700",
    accent: "#64748b",
  },
  Premium: {
    badge: "bg-emerald-100 text-emerald-800",
    accent: "#1a6b3c",
  },
};

// Fallback so an unexpected/unknown tier string never crashes styling —
// it just renders neutral instead of throwing.
const DEFAULT_STYLE = {
  badge: "bg-white/90 text-stone-800",
  accent: "#1a6b3c",
};

export function getTierStyle(tier) {
  return TIER_STYLES[tier] || DEFAULT_STYLE;
}

// Returns a sort rank for a tier. Unknown tiers sort last, so if the
// backend ever sends a tier name before you've added it here, it still
// renders — just at the end of the list instead of erroring.
export function tierRank(tier) {
  const i = TIER_ORDER.indexOf(tier);
  return i === -1 ? TIER_ORDER.length : i;
}
