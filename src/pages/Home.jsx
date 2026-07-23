import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SelectionScreen from "@/components/locazen/SelectionScreen";
import Navbar from "@/components/locazen/Navbar";
import Hero from "@/components/locazen/Hero";
import Services from "@/components/locazen/Services";
import About from "@/components/locazen/About";
import Prestations from "@/components/locazen/Prestations";
import Sete from "@/components/locazen/Sete";
import Footer from "@/components/locazen/Footer";
import TravelerRentals from "@/components/locazen/TravelerRentals";
import TravelerTarifs from "@/components/locazen/TravelerTarifs";
import OwnerPricing from "@/components/locazen/OwnerPricing";

const SETE_AERIAL = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/19bec1b47_generated_b8bfc10c.png";
const BED_IMMACULATE = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/c34b497c7_generated_image.png";

export default function Home() {
  const [visitorType, setVisitorType] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("locazen_visitor");
    if (stored) setVisitorType(stored);
  }, []);

  const handleSelect = (type) => {
    setVisitorType(type);
    localStorage.setItem("locazen_visitor", type);
    window.scrollTo(0, 0);
  };

  const handleSwitch = () => {
    setVisitorType(null);
    localStorage.removeItem("locazen_visitor");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#F7F5F2] min-h-screen">
      <AnimatePresence mode="wait">
        {!visitorType ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SelectionScreen onSelect={handleSelect} />
          </motion.div>
        ) : visitorType === "voyageur" ? (
          <motion.div
            key="voyageur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar visitorType={visitorType} onSwitch={handleSwitch} />
            <Hero
              image={SETE_AERIAL}
              wordTop="Séjour"
              wordBottom="Sète"
              eyebrow="Locations · Sète"
              tagline="Vivez Sète comme un local, respirez comme en vacances"
              ctaLabel="Voir les locations"
              ctaHref="#locations"
            />
            <TravelerRentals />
            <TravelerTarifs />
            <Sete />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="proprietaire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar visitorType={visitorType} onSwitch={handleSwitch} />
            <Hero
              image={BED_IMMACULATE}
              wordTop="Conciergerie"
              wordBottom="Sète"
              eyebrow="Propriétaires · Sète"
              tagline="Votre bien, entre de bonnes mains"
              ctaLabel="Découvrir nos services"
              ctaHref="#services"
            />
            <Services />
            <About />
            <Prestations />
            <OwnerPricing />
            <Sete />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
