import React from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";

const SETE_CENTER = [43.4045, 3.6978];

const CAT_COLORS = {
  logement: "#0C4A6E",
  plage:    "#38BDF8",
  port:     "#0891B2",
  culture:  "#F59E0B",
  gastro:   "#10B981",
  nature:   "#34D399",
};

const POIS_BASE = [
  { nameKey: "poi_0",  lat: 43.4045, lng: 3.6978, cat: "logement" },
  { nameKey: "poi_1",  lat: 43.3905, lng: 3.6743, cat: "plage"    },
  { nameKey: "poi_2",  lat: 43.3978, lng: 3.6840, cat: "plage"    },
  { nameKey: "poi_3",  lat: 43.3952, lng: 3.6815, cat: "plage"    },
  { nameKey: "poi_4",  lat: 43.4028, lng: 3.6990, cat: "port"     },
  { nameKey: "poi_5",  lat: 43.4048, lng: 3.7012, cat: "port"     },
  { nameKey: "poi_6",  lat: 43.4011, lng: 3.6948, cat: "culture"  },
  { nameKey: "poi_7",  lat: 43.4022, lng: 3.6960, cat: "culture"  },
  { nameKey: "poi_8",  lat: 43.3985, lng: 3.6878, cat: "culture"  },
  { nameKey: "poi_9",  lat: 43.4064, lng: 3.6995, cat: "gastro"   },
  { nameKey: "poi_10", lat: 43.4052, lng: 3.7008, cat: "gastro"   },
  { nameKey: "poi_11", lat: 43.4220, lng: 3.6060, cat: "nature"   },
];

export default function MapSete() {
  const { t } = useTranslation();
  const poisData = t("map.pois", { returnObjects: true });
  const CATEGORIES = Object.fromEntries(
    Object.entries(CAT_COLORS).map(([k, color]) => [k, { label: t(`map.categories.${k}`), color }])
  );
  const POIS = Array.isArray(poisData)
    ? POIS_BASE.map((p, i) => ({ ...p, name: poisData[i]?.name ?? "", desc: poisData[i]?.desc ?? "" }))
    : POIS_BASE;
  return (
    <section id="carte" className="bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-10 md:pt-28 md:pb-12">
          <p className="text-[#0891B2] text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t("map.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#0C4A6E] leading-tight">
            {t("map.title")}
          </h2>
          <p className="mt-4 text-[#0C4A6E]/50 text-sm font-body max-w-xl">
            {t("map.subtitle")}
          </p>
        </div>

        <div style={{ height: "460px" }} className="w-full">
          <MapContainer
            center={SETE_CENTER}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {POIS.map((poi, i) => (
              <CircleMarker
                key={i}
                center={[poi.lat, poi.lng]}
                radius={poi.cat === "logement" ? 13 : 8}
                pathOptions={{
                  fillColor: CATEGORIES[poi.cat].color,
                  fillOpacity: poi.cat === "logement" ? 0.95 : 0.8,
                  color: "white",
                  weight: poi.cat === "logement" ? 2.5 : 1.5,
                }}
              >
                <Popup>
                  <div style={{ fontFamily: "sans-serif", minWidth: 160 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#0C4A6E", marginBottom: 4 }}>
                      {poi.name}
                    </p>
                    <p style={{ fontSize: 11, color: "#666", margin: 0 }}>{poi.desc}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6">
          <div className="flex flex-wrap gap-5">
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-[11px] font-body text-[#0C4A6E]/45">{t(`map.categories.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
