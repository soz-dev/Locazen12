import React, { useState } from "react";
import { motion } from "framer-motion";
import { Moon, ChevronUp, ChevronDown } from "lucide-react";

const PROPERTY_TYPES = [
  { key: "studio", label: "Studio", pricePerNight: 75, desc: "1-2 voyageurs" },
  { key: "t2", label: "Appartement T2", pricePerNight: 95, desc: "2-4 voyageurs" },
  { key: "maison", label: "Maison", pricePerNight: 165, desc: "4-8 voyageurs" },
];

const CLEANING_FEE = 50;

export default function StayCalculator() {
  const [nights, setNights] = useState(7);
  const [propKey, setPropKey] = useState("t2");

  const prop = PROPERTY_TYPES.find((p) => p.key === propKey);
  const accommodation = nights * prop.pricePerNight;
  const total = accommodation + CLEANING_FEE;

  const change = (delta) =>
    setNights((n) => Math.max(1, Math.min(30, n + delta)));

  return (
    <section id="calculateur" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-[#0891B2] text-xs tracking-[0.3em] uppercase font-body mb-4">
            Estimation
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#0C4A6E] leading-tight">
            Calculez votre séjour
          </h2>
          <p className="mt-4 text-[#0C4A6E]/50 text-sm font-body">
            Tarif indicatif — contactez-nous pour un devis précis et les disponibilités.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contrôles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Nombre de nuits */}
            <div>
              <p className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body text-[#0C4A6E]/55 mb-5">
                <Moon size={12} />
                Durée du séjour
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => change(-1)}
                  className="w-10 h-10 border border-[#E0F2FE] text-[#0891B2] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors"
                >
                  <ChevronDown size={18} />
                </button>
                <span className="font-heading text-5xl font-light text-[#0C4A6E] w-20 text-center tabular-nums">
                  {nights}
                </span>
                <button
                  onClick={() => change(1)}
                  className="w-10 h-10 border border-[#E0F2FE] text-[#0891B2] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors"
                >
                  <ChevronUp size={18} />
                </button>
                <span className="text-sm font-body text-[#0C4A6E]/40">
                  nuit{nights > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Type de logement */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-body text-[#0C4A6E]/55 mb-4">
                Type de logement
              </p>
              <div className="space-y-3">
                {PROPERTY_TYPES.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setPropKey(p.key)}
                    className={`w-full flex items-center justify-between px-5 py-4 border text-left transition-colors ${
                      propKey === p.key
                        ? "border-[#0891B2] bg-[#F0F9FF]"
                        : "border-[#E0F2FE] hover:border-[#0891B2]/40"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-body ${
                          propKey === p.key ? "text-[#0C4A6E]" : "text-[#0C4A6E]/60"
                        }`}
                      >
                        {p.label}
                      </p>
                      <p className="text-[10px] text-[#0C4A6E]/35 font-body mt-0.5">
                        {p.desc}
                      </p>
                    </div>
                    <span
                      className={`font-heading text-lg font-light ${
                        propKey === p.key ? "text-[#0891B2]" : "text-[#0C4A6E]/30"
                      }`}
                    >
                      {p.pricePerNight}€
                      <span className="text-[10px] font-body font-normal text-[#0C4A6E]/30">
                        /nuit
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Résultat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#0C4A6E] p-10 flex flex-col gap-6"
          >
            <p className="text-[#38BDF8]/60 text-xs tracking-[0.3em] uppercase font-body">
              Récapitulatif
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#F7F5F2]/55 text-sm font-body">
                  {prop.pricePerNight}€ × {nights} nuit{nights > 1 ? "s" : ""}
                </span>
                <span className="text-[#F7F5F2] font-heading text-xl font-light">
                  {accommodation.toLocaleString("fr-FR")}€
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#F7F5F2]/55 text-sm font-body">
                  Frais de ménage
                </span>
                <span className="text-[#F7F5F2] font-heading text-xl font-light">
                  {CLEANING_FEE}€
                </span>
              </div>
              <div className="border-t border-[#F7F5F2]/15 pt-5 flex justify-between items-end">
                <span className="text-[#F7F5F2]/70 text-sm font-body">
                  Total estimé
                </span>
                <span className="font-heading text-5xl font-light text-[#F59E0B]">
                  {total.toLocaleString("fr-FR")}€
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full py-4 bg-[#0891B2] text-white text-xs tracking-[0.2em] uppercase font-body hover:bg-[#38BDF8] transition-colors min-h-[44px]"
            >
              Demander un devis
            </button>

            <p className="text-[#F7F5F2]/25 text-[10px] font-body text-center leading-relaxed">
              Tarif indicatif. Prix définitif confirmé lors de la réservation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
