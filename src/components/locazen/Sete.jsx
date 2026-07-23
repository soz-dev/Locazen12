import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";

const SETE_IMG = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";

export default function Sete() {
  const { scrollYProgress } = useScroll();
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="sete" className="relative overflow-hidden bg-[#2D2D2D]">
      {/* Full-bleed image */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-105">
          <img
            src={SETE_IMG}
            alt="Le port de Sète au coucher du soleil, reflets dorés sur les canaux méditerranéens"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-[#2D2D2D]/30 to-transparent" />

        {/* Content over image */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-[#8E9B90]" />
              <p className="text-[#F7F5F2]/60 text-xs tracking-[0.3em] uppercase font-body">
                Ville de Sète
              </p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#F7F5F2] leading-tight">
              À proximité<br />
              <span className="italic">de tout</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="bg-[#2D2D2D] py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <blockquote className="font-heading text-2xl md:text-3xl font-light text-[#F7F5F2]/80 italic leading-relaxed">
            « L'amitié n'exige rien en retour, que de l'entretien »
          </blockquote>
          <p className="mt-6 text-[#8E9B90] text-sm tracking-[0.2em] uppercase font-body">
            Georges Brassens
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 max-w-[260px] mx-auto px-6"
        >
          <img
            src="https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Brassens-StudioHarcourt-1957.png&width=600"
            alt="Portrait de Georges Brassens par Studio Harcourt, 1957 — né à Sète en 1921"
            className="w-full opacity-80"
          />
          <p className="mt-4 text-center text-[#F7F5F2]/30 text-[10px] tracking-[0.25em] uppercase font-body">
            1921 — 1981 · Sète
          </p>
        </motion.div>
      </div>
    </section>
  );
}
