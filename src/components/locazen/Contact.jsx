import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact({ visitorType = "proprietaire" }) {
  const [form, setForm] = useState({ name: "", email: "", subject: visitorType === "voyageur" ? "Demande de location" : "Demande de conciergerie", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/soza@live.fr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nom: form.name,
          Email: form.email,
          Sujet: form.subject,
          Message: form.message,
          _subject: `[Locazen] ${form.subject} — ${form.name}`,
          _captcha: "false",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: form.subject, message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-[#2D2D2D] py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <p className="text-[#8E9B90] text-xs tracking-[0.3em] uppercase font-body mb-4">
            Nous écrire
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-light text-[#F7F5F2] tracking-[0.05em]">
            Contact
          </h2>
          <p className="mt-4 text-[#F7F5F2]/50 text-sm font-body max-w-md">
            {visitorType === "voyageur"
              ? "Une question sur nos locations ? On vous répond sous 24h."
              : "Un projet de conciergerie ? Parlons-en."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/40 font-body">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                  className="bg-[#F7F5F2]/5 border border-[#F7F5F2]/10 focus:border-[#8E9B90] outline-none px-4 py-3 text-sm text-[#F7F5F2] placeholder-[#F7F5F2]/25 font-body transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/40 font-body">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                  className="bg-[#F7F5F2]/5 border border-[#F7F5F2]/10 focus:border-[#8E9B90] outline-none px-4 py-3 text-sm text-[#F7F5F2] placeholder-[#F7F5F2]/25 font-body transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/40 font-body">Sujet</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="bg-[#F7F5F2]/5 border border-[#F7F5F2]/10 focus:border-[#8E9B90] outline-none px-4 py-3 text-sm text-[#F7F5F2] font-body transition-colors appearance-none cursor-pointer"
              >
                {visitorType === "voyageur" ? (
                  <>
                    <option value="Demande de location" className="bg-[#2D2D2D]">Demande de location</option>
                    <option value="Disponibilités" className="bg-[#2D2D2D]">Disponibilités</option>
                    <option value="Tarifs et prestations" className="bg-[#2D2D2D]">Tarifs et prestations</option>
                    <option value="Autre" className="bg-[#2D2D2D]">Autre</option>
                  </>
                ) : (
                  <>
                    <option value="Demande de conciergerie" className="bg-[#2D2D2D]">Demande de conciergerie</option>
                    <option value="Estimation de revenus" className="bg-[#2D2D2D]">Estimation de revenus</option>
                    <option value="Gestion de bien" className="bg-[#2D2D2D]">Gestion de bien</option>
                    <option value="Autre" className="bg-[#2D2D2D]">Autre</option>
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/40 font-body">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Décrivez votre projet ou votre question..."
                className="bg-[#F7F5F2]/5 border border-[#F7F5F2]/10 focus:border-[#8E9B90] outline-none px-4 py-3 text-sm text-[#F7F5F2] placeholder-[#F7F5F2]/25 font-body transition-colors resize-none"
              />
            </div>

            {status === "success" && (
              <div className="flex items-center gap-2 text-[#8E9B90] text-sm font-body">
                <CheckCircle size={16} />
                Message envoyé — nous vous répondrons sous 24h.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-body">
                <AlertCircle size={16} />
                Erreur d'envoi. Réessayez ou appelez le 06.59.76.91.94.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center justify-center gap-2 bg-[#8E9B90] hover:bg-[#7a8a7c] disabled:opacity-50 text-[#F7F5F2] py-4 text-xs tracking-[0.2em] uppercase font-body transition-colors duration-300 min-h-[44px]"
            >
              <Send size={13} />
              {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col gap-8 pt-2"
          >
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/30 font-body mb-2">Téléphone</p>
              <a href="tel:0659769194" className="text-[#F7F5F2]/80 hover:text-[#8E9B90] transition-colors font-body text-sm">
                06.59.76.91.94
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/30 font-body mb-2">Email</p>
              <a href="mailto:soza@live.fr" className="text-[#F7F5F2]/80 hover:text-[#8E9B90] transition-colors font-body text-sm">
                soza@live.fr
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/30 font-body mb-2">Localisation</p>
              <p className="text-[#F7F5F2]/80 font-body text-sm">Centre-ville, Sète</p>
            </div>
            <div className="mt-4 pt-8 border-t border-[#F7F5F2]/10">
              <p className="text-[#F7F5F2]/30 text-xs font-body leading-relaxed">
                Disponible 7j/7 pour accompagner voyageurs et propriétaires. Réponse garantie sous 24h.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
