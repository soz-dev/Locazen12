import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Marie D.",
    location: "Paris",
    rating: 5,
    text: "Appartement magnifique avec vue sur le port. Tout était impeccable à notre arrivée — linge propre, cuisine équipée. On reviendra l'année prochaine !",
    initials: "MD",
  },
  {
    id: 2,
    name: "Thomas & Emma",
    location: "Lyon",
    rating: 5,
    text: "L'accueil était parfait et le logement exactement comme sur les photos — peut-être encore mieux. Sète est une ville incroyable, idéalement situés.",
    initials: "TE",
  },
  {
    id: 3,
    name: "Julien B.",
    location: "Bordeaux",
    rating: 5,
    text: "La meilleure expérience de location que j'ai eue. Communication au top, aucun souci durant tout le séjour. Je recommande sans la moindre hésitation.",
    initials: "JB",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#0C4A6E]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#38BDF8] text-xs tracking-[0.3em] uppercase font-body mb-4">
            Ils nous ont fait confiance
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#F7F5F2] leading-tight">
            Ce que disent<br />
            <span className="italic text-[#F59E0B]">nos voyageurs</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 flex flex-col"
            >
              <Quote size={22} className="text-[#38BDF8]/35 mb-5" />
              <p className="text-[#F7F5F2]/75 text-sm font-body leading-relaxed flex-1 mb-7">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0891B2] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-body tracking-wider">{t.initials}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[#F7F5F2] text-sm font-body">{t.name}</p>
                  <p className="text-[#F7F5F2]/40 text-xs font-body">{t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={11} className="text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
