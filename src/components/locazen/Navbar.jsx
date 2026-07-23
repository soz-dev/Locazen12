import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Phone, Repeat, Lock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_PASSWORD = "SohanKahyl9434";

const travelerLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Locations", href: "#locations" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Sète", href: "#sete" },
  { label: "Contact", href: "#contact" },
];

const ownerLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#apropos" },
  { label: "Prestations", href: "#prestations" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ visitorType, onSwitch }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const [adminErr, setAdminErr] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const links = visitorType === "voyageur" ? travelerLinks : ownerLinks;
  const modeLabel = visitorType === "voyageur" ? "Voyageur" : "Propriétaire";

  const handleLogoClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("accueil");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openAdminModal = () => {
    setAdminPwd("");
    setAdminErr(false);
    setShowPwd(false);
    setOpen(false);
    setAdminOpen(true);
  };

  const submitAdminPwd = (e) => {
    e.preventDefault();
    if (adminPwd === ADMIN_PASSWORD) {
      setAdminOpen(false);
      navigate("/locazen-admin");
    } else {
      setAdminErr(true);
      setAdminPwd("");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#F7F5F2]/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={handleLogoClick} className="font-heading text-2xl tracking-[0.2em] font-light text-[#2D2D2D] min-h-[44px]">
              LOCAZEN
            </button>
            <span className="hidden md:inline px-3 py-1 bg-[#8E9B90]/10 text-[#8E9B90] text-[10px] tracking-[0.2em] uppercase font-body">
              {modeLabel}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-body tracking-[0.1em] uppercase text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onSwitch}
              className="hidden md:flex items-center gap-2 text-[#8E9B90] hover:text-[#2D2D2D] transition-colors min-h-[44px] px-2"
              aria-label="Changer de profil"
            >
              <Repeat size={14} />
              <span className="text-xs tracking-[0.15em] uppercase font-body">Changer</span>
            </button>
            <a
              href="tel:0659769194"
              className="hidden md:flex items-center gap-2 text-sm tracking-wide text-[#8E9B90] hover:text-[#2D2D2D] transition-colors"
            >
              <Phone size={14} />
              06.59.76.91.94
            </a>
            <button
              onClick={openAdminModal}
              className="hidden md:flex items-center gap-1.5 text-[#2D2D2D]/30 hover:text-[#2D2D2D]/60 transition-colors min-h-[44px] px-2"
              aria-label="Accès administration"
            >
              <Lock size={13} />
              <span className="text-[10px] tracking-[0.15em] uppercase font-body">Admin</span>
            </button>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Ouvrir le menu"
            >
              <Menu size={24} className="text-[#2D2D2D]" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F7F5F2] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Fermer le menu"
            >
              <X size={28} className="text-[#2D2D2D]" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="font-heading text-3xl font-light tracking-[0.15em] text-[#2D2D2D] hover:text-[#8E9B90] transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setOpen(false); onSwitch(); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex items-center gap-2 text-[#8E9B90]"
              >
                <Repeat size={16} />
                <span className="text-sm tracking-[0.15em] uppercase font-body">Changer de profil</span>
              </motion.button>
              <motion.a
                href="tel:0659769194"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-2 flex items-center gap-2 text-[#2D2D2D]/70"
              >
                <Phone size={16} />
                06.59.76.91.94
              </motion.a>
              <motion.button
                onClick={openAdminModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-2 flex items-center gap-2 text-[#2D2D2D]/30 hover:text-[#2D2D2D]/60 transition-colors"
              >
                <Lock size={14} />
                <span className="text-xs tracking-[0.15em] uppercase font-body">Admin</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal mot de passe admin */}
      <AnimatePresence>
        {adminOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#2D2D2D]/50 backdrop-blur-sm px-6"
            onClick={(e) => { if (e.target === e.currentTarget) setAdminOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="bg-[#F7F5F2] w-full max-w-sm p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setAdminOpen(false)}
                className="absolute top-4 right-4 p-1 text-[#2D2D2D]/40 hover:text-[#2D2D2D] transition-colors"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 flex items-center justify-center bg-[#2D2D2D]">
                  <Lock size={15} className="text-[#F7F5F2]" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-light tracking-[0.1em] text-[#2D2D2D]">Administration</h2>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#8E9B90] font-body">Accès restreint</p>
                </div>
              </div>

              <form onSubmit={submitAdminPwd} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={adminPwd}
                    onChange={(e) => { setAdminPwd(e.target.value); setAdminErr(false); }}
                    placeholder="Mot de passe"
                    autoFocus
                    className={`w-full bg-white border px-4 py-3 text-sm font-body text-[#2D2D2D] outline-none pr-10 transition-colors ${
                      adminErr ? "border-red-400" : "border-[#2D2D2D]/20 focus:border-[#2D2D2D]/60"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D2D2D]/40 hover:text-[#2D2D2D]/70"
                    tabIndex={-1}
                  >
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {adminErr && (
                  <p className="text-red-500 text-xs font-body tracking-wide">Mot de passe incorrect.</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#2D2D2D] text-[#F7F5F2] py-3 text-xs tracking-[0.2em] uppercase font-body hover:bg-[#2D2D2D]/80 transition-colors"
                >
                  Accéder
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
