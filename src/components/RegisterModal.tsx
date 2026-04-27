"use client";

import { useState } from "react";
import { CommunityEvent, Language } from "@/types";
import { translations } from "@/data/translations";
import { X, Clock, UserPlus, Copy, Check } from "lucide-react";

interface Props {
  event: CommunityEvent;
  lang: Language;
  onClose: () => void;
  onRegistered: () => void;
}

function generateRefCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "PA-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function RegisterModal({ event, lang, onClose, onRegistered }: Props) {
  const t = translations[lang];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [refCode] = useState(generateRefCode);
  const [copied, setCopied] = useState(false);
  const isFull = event.registered >= event.capacity;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
    onRegistered();
  }

  function handleCopy() {
    navigator.clipboard.writeText(refCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.registerFor}
    >
      <div
        className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary-600 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <UserPlus className="w-6 h-6" aria-hidden="true" />
            <h2 className="text-senior-base font-bold">{t.registerFor}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 transition-colors" aria-label={t.close}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-5">
          {/* Event summary */}
          <div className="bg-gray-50 rounded-xl p-3 mb-5">
            <p className="text-senior-sm font-bold text-gray-900">{event.title[lang]}</p>
            <p className="text-sm text-gray-500">{event.venue} • {event.date} • {event.time}</p>
          </div>

          {isFull && !submitted ? (
            <div className="text-center py-6">
              <p className="text-senior-base text-red-600 font-semibold">{t.registrationFull}</p>
            </div>
          ) : submitted ? (
            /* Pending approval state */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-9 h-9 text-amber-600" aria-hidden="true" />
              </div>
              <h3 className="text-senior-lg font-bold text-amber-700">{t.pendingApproval}</h3>
              <p className="text-senior-sm text-gray-600 leading-relaxed">{t.pendingApprovalMsg}</p>

              {/* Reference code */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-sm text-gray-500 font-medium">{t.registrationRef}:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-senior-lg font-mono font-bold text-gray-900 tracking-wider">{refCode}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="Copy reference code"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="text-left bg-blue-50 rounded-xl p-3 space-y-1 text-senior-sm">
                <p className="text-gray-700">👤 {name}</p>
                <p className="text-gray-700">📱 {phone}</p>
                <p className="text-gray-700">📍 {event.venue}</p>
                <p className="text-gray-700">📅 {event.date} • {event.time}</p>
              </div>

              <button
                onClick={onClose}
                className="mt-2 px-6 py-3 bg-primary-600 text-white rounded-full text-senior-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                {t.close}
              </button>
            </div>
          ) : (
            /* Registration form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor={`name-${event.id}`} className="block text-senior-sm font-semibold text-gray-700 mb-1">
                  {t.yourName}
                </label>
                <input
                  id={`name-${event.id}`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-senior-base rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="e.g. Tan Ah Kow"
                />
              </div>
              <div>
                <label htmlFor={`phone-${event.id}`} className="block text-senior-sm font-semibold text-gray-700 mb-1">
                  {t.yourPhone}
                </label>
                <input
                  id={`phone-${event.id}`}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-senior-base rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="e.g. 9123 4567"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-senior-sm font-semibold hover:bg-gray-200 transition-colors">
                  {t.cancel}
                </button>
                <button type="submit" className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl text-senior-sm font-bold hover:bg-green-700 transition-colors">
                  {t.confirmRegister} ✓
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
