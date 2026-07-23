import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "@/components/locazen/ServiceCard";

const KEYS_IMG   = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80";
const ROOM_IMG   = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80";
const TOWEL_IMG  = "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?auto=format&fit=crop&w=800&q=80";

const services = [
  {
    title: "Suivi de vos réservations",
    description: "Gestion complète de vos plannings, tarification et confirmation de réservations sur Airbnb et Booking.",
    image: ROOM_IMG,
    alt: "Chambre d'hôtel impeccable, lit parfaitement fait, linge blanc immaculé",
    href: "#prestations",
  },
  {
    title: "Gestion des arrivées & départs",
    description: "Accueil en personne de vos voyageurs, état des lieux et accompagnement tout au long du séjour.",
    image: KEYS_IMG,
    alt: "Remise de clés professionnelle, signature de bail, accueil propriétaire",
    href: "#apropos",
  },
  {
    title: "Sérénité totale",
    description: "Ménage, blanchisserie, petit entretien et gestion du logement entre les locations. Votre bien est entre de bonnes mains.",
    image: TOWEL_IMG,
    alt: "Serviettes soigneusement pliées et disposées, chambre préparée avec soin",
    href: "#prestations",
  },
];

export default function Services() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 360, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">
            Nos engagements
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2D2D] leading-tight">
            Chaque détail,<br />
            <span className="italic">pensé pour vous</span>
          </h2>
        </motion.div>

        {/* Scroll controls */}
        <div className="flex justify-end gap-3 mb-8">
          <button
            onClick={() => scroll(-1)}
            className="p-3 border border-[#E5E0DA] hover:border-[#8E9B90] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft size={18} className="text-[#2D2D2D]" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="p-3 border border-[#E5E0DA] hover:border-[#8E9B90] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Défiler vers la droite"
          >
            <ChevronRight size={18} className="text-[#2D2D2D]" />
          </button>
        </div>

        {/* Horizontal scroll reel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((s, i) => (
            <div key={i} className="snap-start">
              <ServiceCard {...s} index={i} href={s.href} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
