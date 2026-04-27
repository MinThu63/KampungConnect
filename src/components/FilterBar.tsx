"use client";

import { EventCategory, Filters, Language, Region } from "@/types";
import { translations } from "@/data/translations";
import { Search } from "lucide-react";

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  lang: Language;
}

const categories: (EventCategory | "all")[] = ["all", "exercise", "social", "health", "learning", "arts", "food"];
const regions: (Region | "all")[] = ["all", "north", "south", "east", "west", "central"];

const categoryEmoji: Record<EventCategory | "all", string> = {
  all: "📋",
  exercise: "🏃",
  social: "🤝",
  health: "🏥",
  learning: "📱",
  arts: "🎨",
  food: "🍳",
};

export default function FilterBar({ filters, onChange, lang }: Props) {
  const t = translations[lang];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" aria-hidden="true" />
        <input
          type="search"
          placeholder={t.searchPlaceholder}
          value={filters.searchQuery}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          className="w-full pl-12 pr-4 py-3 text-senior-base rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 bg-gray-50 transition-colors focus:bg-white"
          aria-label={t.searchPlaceholder}
        />
      </div>

      {/* Category buttons */}
      <div className="flex gap-2 flex-wrap" role="group" aria-label={t.allCategories}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange({ ...filters, category: cat })}
            aria-pressed={filters.category === cat}
            className={`px-4 py-2 rounded-full text-senior-sm font-medium transition-all flex items-center gap-2
              ${filters.category === cat
                ? "bg-primary-600 text-white shadow-md"
                : "bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-primary-300 hover:text-primary-600"
              }`}
          >
            <span aria-hidden="true">{categoryEmoji[cat]}</span>
            {t[cat === "all" ? "allCategories" : cat]}
          </button>
        ))}
      </div>

      {/* Region + Free toggle row */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={filters.region}
          onChange={(e) => onChange({ ...filters, region: e.target.value as Region | "all" })}
          className="px-4 py-3 text-senior-base rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none bg-white"
          aria-label={t.allRegions}
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {t[r === "all" ? "allRegions" : r]}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-3 cursor-pointer bg-white px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-primary-400 transition-colors">
          <input
            type="checkbox"
            checked={filters.freeOnly}
            onChange={(e) => onChange({ ...filters, freeOnly: e.target.checked })}
            className="w-5 h-5 rounded accent-primary-600"
          />
          <span className="text-senior-sm font-medium">{t.freeOnly}</span>
        </label>
      </div>
    </div>
  );
}
