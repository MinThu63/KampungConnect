"use client";

import { Language } from "@/types";

const languageLabels: Record<Language, string> = {
  en: "English",
  zh: "华语",
  ms: "Melayu",
  ta: "தமிழ்",
};

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageSwitcher({ current, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="Language selection">
      {(Object.keys(languageLabels) as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          aria-pressed={current === lang}
          className={`px-4 py-2 rounded-full text-senior-sm font-medium transition-all
            ${current === lang
              ? "bg-primary-600 text-white shadow-md"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:border-primary-400 hover:text-primary-600"
            }`}
        >
          {languageLabels[lang]}
        </button>
      ))}
    </div>
  );
}
