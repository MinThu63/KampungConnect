"use client";

import { Language } from "@/types";
import { translations } from "@/data/translations";
import { Minus, Plus } from "lucide-react";

interface Props {
  size: number;
  onChange: (size: number) => void;
  lang: Language;
}

const MIN = 0;
const MAX = 2;
const LABELS = ["A", "A", "A"];

export default function TextSizeToggle({ size, onChange, lang }: Props) {
  const t = translations[lang];

  return (
    <div className="flex items-center gap-2" role="group" aria-label={t.textSize}>
      <span className="text-sm text-gray-500 font-medium hidden sm:inline">{t.textSize}</span>
      <div className="flex items-center bg-white border-2 border-gray-200 rounded-full overflow-hidden">
        <button
          onClick={() => onChange(Math.max(MIN, size - 1))}
          disabled={size <= MIN}
          className="px-2.5 py-1.5 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease text size"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <span className="px-2 text-sm font-bold text-gray-700 select-none" aria-live="polite">
          {LABELS[size]}
          {size === 1 && "+"}
          {size === 2 && "++"}
        </span>
        <button
          onClick={() => onChange(Math.min(MAX, size + 1))}
          disabled={size >= MAX}
          className="px-2.5 py-1.5 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Increase text size"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
