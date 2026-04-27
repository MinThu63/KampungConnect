"use client";

import { useState } from "react";
import { CommunityEvent, Language } from "@/types";
import { translations } from "@/data/translations";
import {
  Calendar, Clock, MapPin, Phone, Accessibility, DollarSign,
  ExternalLink, Users, Navigation, UserPlus, Heart, Share2, Check,
} from "lucide-react";
import TransportGuide from "./TransportGuide";
import RegisterModal from "./RegisterModal";

interface Props {
  event: CommunityEvent;
  lang: Language;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  exercise: "bg-green-100 text-green-800",
  social: "bg-purple-100 text-purple-800",
  health: "bg-red-100 text-red-800",
  learning: "bg-blue-100 text-blue-800",
  arts: "bg-yellow-100 text-yellow-800",
  food: "bg-orange-100 text-orange-800",
};

export default function EventCard({ event, lang, isFavourite, onToggleFavourite }: Props) {
  const [showTransport, setShowTransport] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [bonusRegistered, setBonusRegistered] = useState(0);
  const [shareToast, setShareToast] = useState(false);
  const t = translations[lang];

  const formattedDate = new Date(event.date).toLocaleDateString(
    lang === "zh" ? "zh-SG" : lang === "ms" ? "ms-SG" : lang === "ta" ? "ta-SG" : "en-SG",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  const totalRegistered = event.registered + bonusRegistered;
  const spotsLeft = event.capacity - totalRegistered;
  const fillPercent = Math.round((totalRegistered / event.capacity) * 100);
  const isFull = spotsLeft <= 0;
  const isAlmostFull = !isFull && fillPercent >= 80;
  const hasRegistered = bonusRegistered > 0;

  function handleShare() {
    const msg = [
      `📅 ${event.title[lang]}`,
      `📍 ${event.venue}`,
      `🗓 ${formattedDate}`,
      `🕐 ${event.time}`,
      event.isFree ? `💰 Free!` : `💰 ${event.price}`,
      `📞 ${event.contactNumber || ""}`,
      "",
      event.eventUrl ? `🔗 ${event.eventUrl}` : "",
    ].filter(Boolean).join("\n");

    if (navigator.share) {
      navigator.share({ title: event.title[lang], text: msg }).catch(() => {});
    } else {
      navigator.clipboard.writeText(msg).catch(() => {});
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  }

  return (
    <>
      <article
        className="bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100/80 overflow-hidden"
        aria-label={event.title[lang]}
      >
        <div className="p-5 sm:p-6 space-y-3">
          {/* Header: category badge + favourite/share + price */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-senior-sm font-semibold ${categoryColors[event.category]}`}>
              {t[event.category]}
            </span>
            <div className="flex items-center gap-1.5">
              {/* Favourite button */}
              <button
                onClick={() => onToggleFavourite(event.id)}
                className={`p-2 rounded-full transition-colors ${
                  isFavourite ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400 hover:text-red-400"
                }`}
                aria-label={isFavourite ? t.unfavourite : t.favourite}
                aria-pressed={isFavourite}
              >
                <Heart className={`w-5 h-5 ${isFavourite ? "fill-current" : ""}`} />
              </button>
              {/* Share button */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-primary-600 transition-colors"
                  aria-label={t.shareWithFamily}
                >
                  {shareToast ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                </button>
                {shareToast && (
                  <div className="absolute right-0 top-full mt-1 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                    {t.shareCopied}
                  </div>
                )}
              </div>
              {event.isAccessible && (
                <span className="flex items-center gap-1 text-primary-600 p-2" title={t.accessible}>
                  <Accessibility className="w-5 h-5" aria-hidden="true" />
                  <span className="sr-only">{t.accessible}</span>
                </span>
              )}
              {event.isFree ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-senior-sm font-bold">
                  {t.free} ✓
                </span>
              ) : (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-warm-100 text-warm-500 text-senior-sm font-bold">
                  <DollarSign className="w-4 h-4" aria-hidden="true" />
                  {event.price}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-senior-lg font-bold text-gray-900 leading-snug">
            {event.title[lang]}
          </h3>

          {/* Description */}
          <p className="text-senior-base text-gray-600 leading-relaxed">
            {event.description[lang]}
          </p>

          {/* Registration bar */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-senior-sm text-gray-600">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span className="font-semibold">{totalRegistered}</span>/{event.capacity} {t.registered}
              </span>
              {isAlmostFull && (
                <span className="text-sm font-bold text-orange-600 animate-pulse">🔥 {t.almostFull}</span>
              )}
              {isFull && (
                <span className="text-sm font-bold text-red-600">❌ Full</span>
              )}
              {!isFull && !isAlmostFull && (
                <span className="text-sm text-gray-500">{spotsLeft} {t.spotsLeft}</span>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull ? "bg-red-500" : isAlmostFull ? "bg-orange-400" : "bg-green-500"
                }`}
                style={{ width: `${Math.min(fillPercent, 100)}%` }}
                role="progressbar"
                aria-valuenow={totalRegistered}
                aria-valuemin={0}
                aria-valuemax={event.capacity}
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3 text-senior-sm text-gray-700">
              <Calendar className="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-3 text-senior-sm text-gray-700">
              <Clock className="w-5 h-5 text-primary-500 shrink-0" aria-hidden="true" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-start gap-3 text-senior-sm text-gray-700">
              <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="font-semibold">{event.venue}</div>
                <div className="text-gray-500">{event.venueAddress}</div>
              </div>
            </div>
          </div>

          {/* Transport button */}
          <button
            onClick={() => setShowTransport(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-senior-sm font-semibold transition-colors border-2 border-blue-200"
          >
            <Navigation className="w-5 h-5" aria-hidden="true" />
            {t.howToGetThere} — 🚇 {event.transport.nearestMrt} ({event.transport.walkFromMrt})
          </button>

          {/* Register button */}
          {hasRegistered ? (
            <div className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 text-amber-700 rounded-xl text-senior-sm font-bold border-2 border-amber-200">
              ⏳ {t.pendingApproval}
            </div>
          ) : (
            <button
              onClick={() => setShowRegister(true)}
              disabled={isFull}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-senior-sm font-bold transition-colors ${
                isFull
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
              }`}
            >
              <UserPlus className="w-5 h-5" aria-hidden="true" />
              {isFull ? t.registrationFull : t.register}
            </button>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-gray-100">
            <span className="text-senior-sm text-gray-500">
              {t.organizedBy}: {event.organizer}
            </span>
            {event.contactNumber && (
              <a
                href={`tel:${event.contactNumber.replace(/\s/g, "")}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full text-senior-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {t.contact}: {event.contactNumber}
              </a>
            )}
          </div>

          {/* Verify link */}
          {event.eventUrl && (
            <div className="pt-2 space-y-1">
              <a
                href={event.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-senior-sm text-primary-600 hover:text-primary-700 font-semibold hover:underline"
              >
                <ExternalLink className="w-5 h-5 shrink-0" aria-hidden="true" />
                {t.viewOnWebsite}
              </a>
              <p className="text-sm text-gray-400 italic">{t.verifyDisclaimer}</p>
            </div>
          )}
        </div>
      </article>

      {showTransport && (
        <TransportGuide event={event} lang={lang} onClose={() => setShowTransport(false)} />
      )}
      {showRegister && (
        <RegisterModal event={event} lang={lang} onClose={() => setShowRegister(false)} onRegistered={() => setBonusRegistered(1)} />
      )}
    </>
  );
}
