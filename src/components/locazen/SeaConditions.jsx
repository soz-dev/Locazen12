import React, { useState, useEffect } from "react";
import { Waves, Thermometer, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const API_URL =
  "https://marine-api.open-meteo.com/v1/marine?latitude=43.4045&longitude=3.6978&daily=wave_height_max,sea_surface_temperature_max&timezone=Europe%2FParis&forecast_days=7";

const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

function waveInfo(h) {
  if (h == null) return { label: "—", dot: "#ccc" };
  if (h <= 0.3)  return { label: "Calme",   dot: "#10B981" };
  if (h <= 0.7)  return { label: "Légère",  dot: "#38BDF8" };
  if (h <= 1.5)  return { label: "Agitée",  dot: "#F59E0B" };
  return              { label: "Forte",    dot: "#EF4444" };
}

export default function SeaConditions() {
  const { t } = useTranslation();
  const [days, setDays] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((json) => {
        const { time, wave_height_max, sea_surface_temperature_max } = json.daily;
        setDays(
          time.map((t, i) => ({
            date: new Date(t),
            wave: wave_height_max[i],
            temp: sea_surface_temperature_max[i],
          }))
        );
      })
      .catch(() => setDays(null))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !days) return null;

  return (
    <div className="bg-[#0891B2] border-t border-white/10 py-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <Waves size={14} className="text-white/60" />
          <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-body">
              {t("sea.label")}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 size={20} className="animate-spin text-white/50" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="flex gap-2 min-w-max md:min-w-0 md:grid md:grid-cols-7">
                {days.map((d, i) => {
                  const info = waveInfo(d.wave);
                  const isToday = i === 0;
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center gap-2 py-3 px-4 rounded ${
                        isToday ? "bg-white/20" : ""
                      }`}
                    >
                      <p className={`text-[10px] font-body tracking-wider uppercase ${isToday ? "text-white" : "text-white/50"}`}>
                        {isToday ? t("sea.today") : DAYS_FR[d.date.getDay()]}
                      </p>
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: info.dot }}
                        title={info.label}
                      />
                      <div className="text-center">
                        <p className={`text-xs font-body tabular-nums ${isToday ? "text-white" : "text-white/60"}`}>
                          {d.wave != null ? `${d.wave.toFixed(1)}m` : "—"}
                        </p>
                        <p className={`text-[10px] font-body tabular-nums ${isToday ? "text-[#BAE6FD]" : "text-white/40"}`}>
                          {d.temp != null ? `${Math.round(d.temp)}°C` : "—"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-5 mt-5">
              {[
                { label: t("sea.calm_range"),  dot: "#10B981" },
                { label: t("sea.light_range"), dot: "#38BDF8" },
                { label: t("sea.rough_range"), dot: "#F59E0B" },
                { label: t("sea.strong_range"),dot: "#EF4444" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.dot }} />
                  <span className="text-[10px] font-body text-white/35">{l.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
