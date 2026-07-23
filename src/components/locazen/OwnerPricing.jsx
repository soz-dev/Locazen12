import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Check, Sparkles, Info } from "lucide-react";

const BED_IMMACULATE = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/c34b497c7_generated_image.png";

const beforeStay = [
  { label: "Gestion de réservations", price: "15 €", unit: "/ réservation", detail: "Mise en ligne annonce + photos sur Airbnb & Booking, tarification, déclaration Mairie, relation hôtes jusqu'à l'arrivée, déclaration taxe de séjour." },
  { label: "Ménage", price: "Forfait", unit: "", detail: "Tarif déterminé selon la taille et la composition de votre logement — à la charge du voyageur." },
  { label: "Grand lit", price: "20 €", unit: "", detail: "Blanchisserie draps grand lit — à la charge du voyageur." },
  { label: "Petit lit", price: "15 €", unit: "", detail: "Blanchisserie draps petit lit — à la charge du voyageur." },
  { label: "Kit serviettes", price: "5 €", unit: "/ personne", detail: "Une grande + une petite serviette — à la charge du voyageur." },
];

const duringStay = [
  { label: "Check-in / Check-out", price: "55 €", detail: "Accueil en personne à l'arrivée et état des lieux à la sortie." },
  { label: "Shopping & traiteurs", price: "Sur devis", detail: "Courses, réservation de traiteurs et services sur-mesure." },
  { label: "Conciergerie durant le séjour", price: "Incluse", detail: "Disponibilité pour vos hôtes si nécessaire durant tout le séjour." },
];

export default function OwnerPricing() {
  return (
    <section id="tarifs" className="py-24 md:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20"
        >
          <div className="relative">
            <div className="relative aspect-[4/3] max-w-[500px]">
              <Image
                src={BED_IMMACULATE}
                alt="Chambre impeccable avec lit parfaitement fait, standard conciergerie professionnelle"
                className="w-full h-full object-cover"
                fittingType="fill"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8E9B90]/15 -z-10" />
          </div>
          <div>
            <p className="text-[#8E9B90] text-xs tracking-[0.3em] uppercase font-body mb-4">
              Tarifs propriétaires
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#2D2D2D] leading-tight mb-6">
              Des tarifs <span className="italic">clairs</span>,<br />sans surprise
            </h2>
            <p className="text-[#2D2D2D]/70 font-body text-base leading-relaxed mb-6">
              Vous avez la possibilité de combiner différentes prestations ou de choisir un pack complet, en fonction de vos besoins. Les packs sont proposés sur devis.
            </p>
            <div className="flex items-start gap-3 p-5 bg-[#E5E0DA]/40">
              <Sparkles size={18} className="text-[#8E9B90] flex-shrink-0 mt-0.5" />
              <p className="text-[#2D2D2D]/70 text-sm font-body">
                <span className="font-medium text-[#2D2D2D]">Facturation fin de mois.</span> Le ménage et la blanchisserie sont à la charge du voyageur — vous conservez l'intégralité de vos revenus locatifs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Avant le séjour */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#2D2D2D] p-8 md:p-10"
          >
            <p className="text-[#8E9B90] text-[10px] tracking-[0.3em] uppercase font-body mb-2">Phase 1</p>
            <h3 className="font-heading text-2xl font-light text-[#F7F5F2] mb-8">Avant le séjour</h3>
            <div className="space-y-6">
              {beforeStay.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="border-b border-[#F7F5F2]/10 pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <span className="text-sm font-body text-[#F7F5F2]/80">{item.label}</span>
                    <span className="font-heading text-lg font-light text-[#8E9B90] whitespace-nowrap">
                      {item.price}<span className="text-xs text-[#F7F5F2]/30 ml-1">{item.unit}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#F7F5F2]/35 font-body leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Durant le séjour */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="border border-[#E5E0DA] p-8 md:p-10 flex flex-col"
          >
            <p className="text-[#8E9B90] text-[10px] tracking-[0.3em] uppercase font-body mb-2">Phase 2</p>
            <h3 className="font-heading text-2xl font-light text-[#2D2D2D] mb-8">Durant le séjour</h3>
            <div className="space-y-6 flex-1">
              {duringStay.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="border-b border-[#E5E0DA] pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <span className="text-sm font-body text-[#2D2D2D]/80">{item.label}</span>
                    <span className="font-heading text-lg font-light text-[#2D2D2D] whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-xs text-[#2D2D2D]/40 font-body leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-8 px-6 py-4 bg-[#2D2D2D] text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body text-center hover:bg-[#2D2D2D]/80 transition-colors duration-300 min-h-[44px] flex items-center justify-center"
            >
              Demander un devis
            </a>
          </motion.div>
        </div>

        <p className="text-center text-[#2D2D2D]/40 text-xs font-body mt-10">
          Pack complet disponible sur devis — ex : Check-in + Check-out + ménage. Appelez-nous au 06.59.76.91.94.
        </p>
      </div>
    </section>
  );
}

  {
    name: "Essentiel",
    tagline: "Pour vos premières locations",
    price: "15%",
    unit: "des revenus locatifs",
    features: [
      "Création d'annonces Airbnb & Booking",
      "Gestion du planning et tarification",
      "Confirmation des réservations",
      "Accueil en personne des voyageurs",
    ],
    highlight: false,
  },
  {
    name: "Sérénité",
    tagline: "Notre formule la plus choisie",
    price: "20%",
    unit: "des revenus locatifs",
    features: [
      "Tout l'Essentiel, inclus",
      "Ménage et blanchisserie entre séjours",
      "État des lieux entrée & sortie",
      "Petit entretien et dépannage",
      "Déclaration des nuitées",
      "Gestion du logement durant la vacance",
    ],
    highlight: true,
  },
  {
    name: "Signature",
    tagline: "Gestion totale, zéro souci",
    price: "25%",
    unit: "des revenus locatifs",
    features: [
      "Tout Sérénité, inclus",
      "Accompagnement des vacanciers 7j/7",
      "Guides touristiques personnalisés",
      "Optimisation tarifique dynamique",
      "Rapport de suivi mensuel",
    ],
    highlight: false,
  },
];

export default function OwnerPricing() {
  return (
    <section id="tarifs" className="py-24 md:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20"
        >
          <div className="relative">
            <div className="relative aspect-[4/3] max-w-[500px]">
              <Image
                src={BED_IMMACULATE}
                alt="Chambre impeccable avec lit parfaitement fait et serviettes pliées, standard conciergerie professionnel"
                className="w-full h-full object-cover"
                fittingType="fill"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8E9B90]/15 -z-10" />
          </div>
          <div>
            <p className="text-[#8E9B90] text-xs tracking-[0.3em] uppercase font-body mb-4">
              Tarifs propriétaires
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#2D2D2D] leading-tight mb-6">
              Une gestion <span className="italic">claire</span>,<br />sans surprise
            </h2>
            <p className="text-[#2D2D2D]/70 font-body text-base leading-relaxed mb-6">
              Nous prenons en charge votre bien de A à Z. Nos honoraires sont un pourcentage simple des revenus locatifs — vous ne payez que lorsque votre bien travaille pour vous.
            </p>
            <div className="flex items-start gap-3 p-5 bg-[#E5E0DA]/40">
              <Sparkles size={18} className="text-[#8E9B90] flex-shrink-0 mt-0.5" />
              <p className="text-[#2D2D2D]/70 text-sm font-body">
                <span className="font-medium text-[#2D2D2D]">Sans frais cachés.</span> Le ménage est à la charge du voyageur, vous conservez l'intégralité de la location.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`relative p-8 flex flex-col ${
                p.highlight
                  ? "bg-[#2D2D2D] text-[#F7F5F2] md:-translate-y-4"
                  : "bg-[#F7F5F2] text-[#2D2D2D] border border-[#E5E0DA]"
              }`}
            >
              {p.highlight && (
                <span className="absolute top-6 right-6 px-3 py-1 bg-[#8E9B90] text-[#F7F5F2] text-[10px] tracking-[0.2em] uppercase font-body">
                  Recommandé
                </span>
              )}
              <h3 className={`font-heading text-3xl font-light mb-1 ${p.highlight ? "text-[#F7F5F2]" : "text-[#2D2D2D]"}`}>
                {p.name}
              </h3>
              <p className={`text-sm font-body mb-6 ${p.highlight ? "text-[#F7F5F2]/50" : "text-[#2D2D2D]/50"}`}>
                {p.tagline}
              </p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className={`font-heading text-5xl font-light ${p.highlight ? "text-[#F7F5F2]" : "text-[#2D2D2D]"}`}>
                  {p.price}
                </span>
                <span className={`text-sm font-body ${p.highlight ? "text-[#F7F5F2]/50" : "text-[#2D2D2D]/50"}`}>
                  {p.unit}
                </span>
              </div>
              <ul className="space-y-3 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm font-body">
                    <Check size={15} className="flex-shrink-0 mt-0.5 text-[#8E9B90]" />
                    <span className={p.highlight ? "text-[#F7F5F2]/80" : "text-[#2D2D2D]/70"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 px-6 py-4 text-xs tracking-[0.2em] uppercase font-body text-center transition-colors duration-300 min-h-[44px] flex items-center justify-center ${
                  p.highlight
                    ? "bg-[#8E9B90] text-[#F7F5F2] hover:bg-[#7a8a7c]"
                    : "border border-[#2D2D2D]/30 text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#F7F5F2]"
                }`}
              >
                Nous contacter
              </a>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[#2D2D2D]/40 text-xs font-body mt-10">
          Devis personnalisé selon votre bien. Le premier rendez-vous est offert et sans engagement.
        </p>
      </div>
    </section>
  );
}
