"use client";

import { useState, useEffect } from "react";
import { CommunityEvent, Language } from "@/types";
import { translations } from "@/data/translations";
import { X, TrainFront, Bus, Footprints, MapPin, ArrowRight, Navigation, Loader2, ArrowDown } from "lucide-react";

interface Props {
  event: CommunityEvent;
  lang: Language;
  onClose: () => void;
}

// Simulated user locations around Singapore
const SIMULATED_LOCATIONS = [
  { name: "Toa Payoh", nearestMrt: "Toa Payoh", line: "North-South Line", lineColor: "#EF4444" },
  { name: "Jurong East", nearestMrt: "Jurong East", line: "East-West Line / North-South Line", lineColor: "#22C55E" },
  { name: "Hougang", nearestMrt: "Hougang", line: "North-East Line", lineColor: "#A855F7" },
  { name: "Woodlands", nearestMrt: "Woodlands", line: "Thomson-East Coast Line", lineColor: "#8B5CF6" },
  { name: "Tampines", nearestMrt: "Tampines", line: "East-West Line / Downtown Line", lineColor: "#22C55E" },
  { name: "Bukit Merah", nearestMrt: "Redhill", line: "East-West Line", lineColor: "#22C55E" },
  { name: "Serangoon", nearestMrt: "Serangoon", line: "North-East Line / Circle Line", lineColor: "#A855F7" },
  { name: "Clementi", nearestMrt: "Clementi", line: "East-West Line", lineColor: "#22C55E" },
];

interface RouteOption {
  label: string;
  type: "mrt" | "bus" | "mrt+bus";
  steps: RouteStep[];
  totalTime: string;
}

interface RouteStep {
  icon: "walk" | "mrt" | "bus" | "transfer" | "destination";
  text: string;
  detail?: string;
  color?: string;
}

// Generate simulated routes from user location to event venue
function generateRoutes(
  userLoc: (typeof SIMULATED_LOCATIONS)[0],
  event: CommunityEvent,
): RouteOption[] {
  const tr = event.transport;
  const isSameLine = userLoc.line.includes(tr.mrtLine.split(" / ")[0]) || tr.mrtLine.includes(userLoc.line.split(" / ")[0]);
  const routes: RouteOption[] = [];

  // MRT direct or with transfer
  if (isSameLine) {
    const mins = 10 + Math.floor(Math.random() * 15);
    routes.push({
      label: "MRT Direct",
      type: "mrt",
      totalTime: `${mins + parseInt(tr.walkFromMrt)} min`,
      steps: [
        { icon: "walk", text: `Walk to ${userLoc.nearestMrt} MRT`, detail: "3 min", color: userLoc.lineColor },
        { icon: "mrt", text: `${userLoc.nearestMrt} → ${tr.nearestMrt}`, detail: `${mins} min • ${tr.mrtLine}`, color: tr.mrtLineColor },
        { icon: "walk", text: `Walk to ${event.venue}`, detail: tr.walkFromMrt },
        { icon: "destination", text: event.venue },
      ],
    });
  } else {
    // Need transfer
    const transferStations: Record<string, string> = {
      "North-South Line": "Dhoby Ghaut",
      "East-West Line": "Jurong East",
      "North-East Line": "Dhoby Ghaut",
      "Circle Line": "Bishan",
      "Downtown Line": "Bugis",
      "Thomson-East Coast Line": "Woodlands",
    };
    const firstLine = userLoc.line.split(" / ")[0];
    const destLine = tr.mrtLine.split(" / ")[0];
    const transfer = transferStations[firstLine] || "City Hall";
    const leg1 = 8 + Math.floor(Math.random() * 12);
    const leg2 = 5 + Math.floor(Math.random() * 10);
    const total = leg1 + leg2 + 5 + parseInt(tr.walkFromMrt);

    routes.push({
      label: "MRT (1 transfer)",
      type: "mrt",
      totalTime: `${total} min`,
      steps: [
        { icon: "walk", text: `Walk to ${userLoc.nearestMrt} MRT`, detail: "3 min" },
        { icon: "mrt", text: `${userLoc.nearestMrt} → ${transfer}`, detail: `${leg1} min • ${firstLine}`, color: userLoc.lineColor },
        { icon: "transfer", text: `Transfer at ${transfer}`, detail: `~5 min walk` },
        { icon: "mrt", text: `${transfer} → ${tr.nearestMrt}`, detail: `${leg2} min • ${destLine}`, color: tr.mrtLineColor },
        { icon: "walk", text: `Walk to ${event.venue}`, detail: tr.walkFromMrt },
        { icon: "destination", text: event.venue },
      ],
    });
  }

  // Bus option
  const busTime = 15 + Math.floor(Math.random() * 25);
  const busService = tr.busServices[Math.floor(Math.random() * tr.busServices.length)];
  routes.push({
    label: `Bus ${busService}`,
    type: "bus",
    totalTime: `${busTime + 5} min`,
    steps: [
      { icon: "walk", text: "Walk to nearest bus stop", detail: "5 min" },
      { icon: "bus", text: `Take Bus ${busService}`, detail: `${busTime} min → ${tr.nearestBusStop}` },
      { icon: "walk", text: `Walk to ${event.venue}`, detail: "3 min" },
      { icon: "destination", text: event.venue },
    ],
  });

  // MRT + Bus combo for longer routes
  if (!isSameLine) {
    const comboTime = 10 + Math.floor(Math.random() * 10);
    const comboBus = tr.busServices[Math.floor(Math.random() * Math.min(2, tr.busServices.length))];
    routes.push({
      label: `MRT + Bus ${comboBus}`,
      type: "mrt+bus",
      totalTime: `${comboTime + 12 + parseInt(tr.walkFromMrt)} min`,
      steps: [
        { icon: "walk", text: `Walk to ${userLoc.nearestMrt} MRT`, detail: "3 min" },
        { icon: "mrt", text: `${userLoc.nearestMrt} → ${tr.nearestMrt}`, detail: `${comboTime} min`, color: userLoc.lineColor },
        { icon: "bus", text: `Take Bus ${comboBus}`, detail: `12 min → ${tr.nearestBusStop}` },
        { icon: "walk", text: `Walk to ${event.venue}`, detail: "2 min" },
        { icon: "destination", text: event.venue },
      ],
    });
  }

  return routes;
}

const stepIcons: Record<string, React.ReactNode> = {
  walk: <Footprints className="w-5 h-5" />,
  mrt: <TrainFront className="w-5 h-5" />,
  bus: <Bus className="w-5 h-5" />,
  transfer: <ArrowRight className="w-5 h-5" />,
  destination: <MapPin className="w-5 h-5" />,
};

const stepColors: Record<string, string> = {
  walk: "text-gray-500 bg-gray-100",
  mrt: "text-red-600 bg-red-50",
  bus: "text-green-700 bg-green-50",
  transfer: "text-amber-600 bg-amber-50",
  destination: "text-primary-600 bg-primary-50",
};

export default function TransportGuide({ event, lang, onClose }: Props) {
  const t = translations[lang];
  const [detecting, setDetecting] = useState(true);
  const [userLocation, setUserLocation] = useState<(typeof SIMULATED_LOCATIONS)[0] | null>(null);
  const [routes, setRoutes] = useState<RouteOption[]>([]);

  // Simulate location detection
  useEffect(() => {
    const timer = setTimeout(() => {
      const loc = SIMULATED_LOCATIONS[Math.floor(Math.random() * SIMULATED_LOCATIONS.length)];
      setUserLocation(loc);
      setRoutes(generateRoutes(loc, event));
      setDetecting(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [event]);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.howToGetThere}
    >
      <div
        className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-senior-lg font-bold text-gray-900">{t.howToGetThere}</h2>
            <p className="text-senior-sm text-gray-500">{event.venue}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label={t.close}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Location detection */}
          {detecting ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <div className="relative">
                <Navigation className="w-10 h-10 text-primary-600 animate-pulse" />
                <Loader2 className="w-6 h-6 text-primary-400 absolute -top-1 -right-1 animate-spin" />
              </div>
              <p className="text-senior-base text-gray-600 font-medium">{t.detectingLocation}</p>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          ) : (
            <>
              {/* User location banner */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">{t.yourLocation}</p>
                  <p className="text-senior-sm font-bold text-blue-900">
                    📍 {userLocation?.name} (near {userLocation?.nearestMrt} MRT)
                  </p>
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">🏁 Destination</p>
                  <p className="text-senior-sm font-bold text-green-900">{event.venue}</p>
                  <p className="text-sm text-green-700">{event.venueAddress}</p>
                </div>
              </div>

              {/* Route options */}
              <div className="space-y-4 pt-2">
                {routes.map((route, ri) => (
                  <div key={ri} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors">
                    {/* Route header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-senior-sm font-bold text-gray-800">
                          {t.option} {ri + 1}: {route.label}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-bold">
                        🕐 {route.totalTime}
                      </span>
                    </div>

                    {/* Steps */}
                    <div className="px-4 py-3 space-y-0">
                      {route.steps.map((step, si) => (
                        <div key={si}>
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${stepColors[step.icon]}`}
                              style={step.color ? { backgroundColor: step.color + "20", color: step.color } : undefined}
                            >
                              {stepIcons[step.icon]}
                            </div>
                            {/* Text */}
                            <div className="pt-1.5">
                              <p className="text-senior-sm font-semibold text-gray-800">{step.text}</p>
                              {step.detail && (
                                <p className="text-sm text-gray-500">{step.detail}</p>
                              )}
                            </div>
                          </div>
                          {/* Connector line */}
                          {si < route.steps.length - 1 && (
                            <div className="flex items-center ml-4 py-1">
                              <ArrowDown className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
