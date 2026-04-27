"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { Language, Filters, CommunityEvent } from "@/types";
import { translations } from "@/data/translations";
import { sampleEvents } from "@/data/events";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FilterBar from "@/components/FilterBar";
import EventCard from "@/components/EventCard";
import TextSizeToggle from "@/components/TextSizeToggle";
import { Heart, Info } from "lucide-react";

const defaultFilters: Filters = {
  category: "all",
  region: "all",
  freeOnly: false,
  searchQuery: "",
};

const TEXT_SIZE_CLASSES = ["text-base", "text-lg", "text-xl"];

function filterEvents(
  events: CommunityEvent[], filters: Filters, lang: Language,
  favourites: Set<string>, showFavOnly: boolean,
): CommunityEvent[] {
  return events.filter((event) => {
    if (showFavOnly && !favourites.has(event.id)) return false;
    if (filters.category !== "all" && event.category !== filters.category) return false;
    if (filters.region !== "all" && event.region !== filters.region) return false;
    if (filters.freeOnly && !event.isFree) return false;
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const searchable = [
        event.title[lang], event.description[lang],
        event.venue, event.organizer, ...event.tags,
      ].join(" ").toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });
}

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [textSize, setTextSize] = useState(0);
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [showFavOnly, setShowFavOnly] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kampungconnect-favourites");
      if (saved) setFavourites(new Set(JSON.parse(saved)));
    } catch { /* ignore */ }
  }, []);

  const saveFavourites = useCallback((favs: Set<string>) => {
    try { localStorage.setItem("kampungconnect-favourites", JSON.stringify([...favs])); } catch { /* ignore */ }
  }, []);

  function toggleFavourite(id: string) {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      saveFavourites(next);
      return next;
    });
  }

  const filteredEvents = useMemo(
    () => filterEvents(sampleEvents, filters, lang, favourites, showFavOnly),
    [filters, lang, favourites, showFavOnly]
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${TEXT_SIZE_CLASSES[textSize]}`}>
      {/* ===== HERO SECTION ===== */}
      <div className="gradient-hero-subtle">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
          {/* Top bar: language + text size */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <LanguageSwitcher current={lang} onChange={setLang} />
            <TextSizeToggle size={textSize} onChange={setTextSize} lang={lang} />
          </div>

          {/* Hero content */}
          <div className="text-center space-y-5 animate-fade-in">
            {/* Logo / Brand */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏘️</span>
              </div>
              <h1 className="text-senior-3xl font-extrabold text-gray-900 tracking-tight">
                Kampung<span className="text-primary-600">Connect</span>
              </h1>
            </div>

            <p className="text-senior-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {t.appSubtitle}
            </p>

            {/* Hero image */}
            <div className="relative max-w-3xl mx-auto mt-4">
              <div className="rounded-3xl overflow-hidden shadow-soft border border-white/50">
                <Image
                  src="/images/hero.png"
                  alt="KampungConnect — connecting seniors to community events"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Simulation badge */}
            <div className="flex justify-center pt-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 text-primary-700 text-sm font-medium shadow-sm border border-primary-100">
                <Info className="w-3.5 h-3.5" aria-hidden="true" />
                Simulated data for demonstration — links go to real onePA pages
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Filters */}
        <section aria-label="Filters" className="mb-6 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-card p-4 sm:p-5 border border-gray-100">
            <FilterBar filters={filters} onChange={setFilters} lang={lang} />
            {/* Favourites toggle */}
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => setShowFavOnly(!showFavOnly)}
                aria-pressed={showFavOnly}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-senior-sm font-medium transition-all ${
                  showFavOnly
                    ? "bg-red-50 text-red-600 border-2 border-red-200 shadow-sm"
                    : "bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-red-200 hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavOnly ? "fill-current" : ""}`} />
                {t.favouritesOnly} {favourites.size > 0 && `(${favourites.size})`}
              </button>
            </div>
          </div>
        </section>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5 px-1">
          <p className="text-senior-sm text-gray-500 font-medium">
            {filteredEvents.length} {t.eventsFound}
          </p>
          {(filters.category !== "all" || filters.region !== "all" || filters.freeOnly || filters.searchQuery || showFavOnly) && (
            <button
              onClick={() => { setFilters(defaultFilters); setShowFavOnly(false); }}
              className="text-senior-sm text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-2"
            >
              {t.clearFilters}
            </button>
          )}
        </div>

        {/* Event list */}
        <section aria-label="Events" className="space-y-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => (
              <div key={event.id} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                <EventCard
                  event={event}
                  lang={lang}
                  isFavourite={favourites.has(event.id)}
                  onToggleFavourite={toggleFavourite}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-card">
              <p className="text-senior-lg text-gray-400">
                {showFavOnly ? t.noFavourites : t.noEvents}
              </p>
              <button
                onClick={() => { setFilters(defaultFilters); setShowFavOnly(false); }}
                className="mt-5 px-6 py-3 bg-primary-600 text-white rounded-full text-senior-base font-semibold hover:bg-primary-700 transition-colors shadow-md"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center space-y-2">
          <p className="text-gray-900 font-semibold">
            🏘️ Kampung<span className="text-primary-600">Connect</span>
          </p>
          <p className="text-sm text-gray-400">
            Made with ❤️ for Singapore&apos;s seniors
          </p>
          <p className="text-sm text-gray-400">
            Data sourced from{" "}
            <a href="https://www.onepa.gov.sg/events" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 underline underline-offset-2">
              onePA
            </a>
            {" "}(simulated for demo)
          </p>
        </div>
      </footer>
    </div>
  );
}
