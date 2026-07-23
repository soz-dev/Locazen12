import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Heart, Shield, Smile } from "lucide-react";

const KEYS_IMG = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80";

const values = [
  { icon: Heart, label: "Accueil humain", text: "Chaque voyageur est accueilli en personne, jamais une boîte à clés." },
  { icon: Shield, label: "Confiance", text: "Créée en 2019, notre expérience s'enrichit chaque année au contact des voyageurs et des propriétaires." },
  { icon: Smile, label: "Sérénité", text: "Souriants, sociables et accueillants, nous prenons à cœur notre métier et assurerons à vos clients un séjour de qualité." },
];

export default function About() {
  return (
    <section id="apropos" className="py-24 md:py-32 bg-[#E5E0DA]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image with overlap */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-[460px]">
              <Image
                src={KEYS_IMG}
                alt="Main posant délicatement une clé en laiton sur une surface de lin, lumière matinale douce"
                className="w-full h-full object-cover"
                fittingType="fill"
              />
            </div>
            {/* Decorative offset block */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C4A96B]/15 -z-10" />
            <div className="absolute -top-6 -left-6 w-20 h-20 border border-[#C4A96B]/30 -z-10" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">
              À notre propos
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#2D2D2D] leading-tight mb-8">
              Parce que chaque voyageur mérite{" "}
              <span className="italic">un vrai accueil</span>
            </h2>
            <p className="text-[#2D2D2D]/70 font-body text-base leading-relaxed mb-6">
              Nous sommes un couple passionné, et nous prenons en charge votre bien — qu'il s'agisse de votre résidence principale ou secondaire. Nos différents métiers (hôtellerie, restauration, accompagnement et aide à la personne) nous ont permis d'acquérir les qualités requises pour assumer ces missions.
            </p>
            <p className="text-[#2D2D2D]/70 font-body text-base leading-relaxed mb-12">
              Nous avons opté pour une présence physique et non une boîte à clés, impersonnelle et non sécurisée. Être accueilli en personne change la qualité de la location.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#C4A96B]/10">
                    <v.icon size={18} className="text-[#C4A96B]" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-[#2D2D2D] tracking-wide">
                      {v.label}
                    </p>
                    <p className="text-[#2D2D2D]/60 text-sm mt-1">{v.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
