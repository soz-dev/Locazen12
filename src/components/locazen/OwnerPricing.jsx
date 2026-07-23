import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const BED_IMMACULATE = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80";

export default function OwnerPricing() {
  const { t } = useTranslation();
  const beforeStay = t("ownerPricing.before", { returnObjects: true });
  const duringStay = t("ownerPricing.during", { returnObjects: true });
  return (
    <section id="tarifs" className="py-24 md:py-32 bg-[#F7F5F2] border-t border-[#2D2D2D]/10">
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
              <img
                src={BED_IMMACULATE}
                alt="Chambre impeccable avec lit parfaitement fait, standard conciergerie professionnelle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C4A96B]/15 -z-10" />
          </div>
          <div>
            <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">
              {t("ownerPricing.eyebrow")}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#2D2D2D] leading-tight mb-6">
              {t("ownerPricing.title")}
            </h2>
            <p className="text-[#2D2D2D]/70 font-body text-base leading-relaxed mb-6">
              {t("ownerPricing.subtitle")}
            </p>
            <div className="flex items-start gap-3 p-5 bg-[#E5E0DA]/40">
              <Sparkles size={18} className="text-[#C4A96B] flex-shrink-0 mt-0.5" />
              <p className="text-[#2D2D2D]/70 text-sm font-body">
                <span className="font-medium text-[#2D2D2D]">{t("ownerPricing.billing_title")}</span> {t("ownerPricing.billing_detail")}
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
            <p className="text-[#C4A96B] text-[10px] tracking-[0.3em] uppercase font-body mb-2">{t("ownerPricing.phase1")}</p>
            <h3 className="font-heading text-2xl font-light text-[#F7F5F2] mb-8">{t("ownerPricing.beforeStay")}</h3>
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
                    <span className="font-heading text-lg font-light text-[#C4A96B] whitespace-nowrap">
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
            <p className="text-[#C4A96B] text-[10px] tracking-[0.3em] uppercase font-body mb-2">{t("ownerPricing.phase2")}</p>
            <h3 className="font-heading text-2xl font-light text-[#2D2D2D] mb-8">{t("ownerPricing.duringStay")}</h3>
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
              {t("ownerPricing.quoteBtn")}
            </a>
          </motion.div>
        </div>

        <p className="text-center text-[#2D2D2D]/40 text-xs font-body mt-10">
          {t("ownerPricing.packNote")}
        </p>
      </div>
    </section>
  );
}


