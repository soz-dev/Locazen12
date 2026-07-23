import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchRentals, createRental, updateRental, deleteRental } from "@/lib/rentalsApi";
import { AMENITIES, getAmenity } from "@/components/locazen/amenities";
import RentalForm from "@/components/locazen/RentalForm";

export default function Admin() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const { toast } = useToast();

  const isAdmin = sessionStorage.getItem("locazen_admin") === "true";

  useEffect(() => {
    fetchRentals()
      .then(setRentals)
      .catch(() => toast({ title: "Erreur de chargement", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => { setEditing(null); setShowForm(true); };
  const openEdit = (r) => { setEditing(r); setShowForm(true); };

  const handleSave = async (payload) => {
    try {
      if (editing) {
        const updated = await updateRental(editing.id, payload);
        setRentals((prev) => prev.map((r) => r.id === editing.id ? { ...r, ...payload } : r));
        toast({ title: "Location mise à jour" });
      } else {
        const created = await createRental(payload);
        setRentals((prev) => [created, ...prev]);
        toast({ title: "Location ajoutée" });
      }
    } catch {
      toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" });
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (r) => {
    if (!confirm(`Supprimer « ${r.name} » ?`)) return;
    try {
      await deleteRental(r.id);
      setRentals((prev) => prev.filter((x) => x.id !== r.id));
      toast({ title: "Location supprimée" });
    } catch {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Header */}
      <header className="bg-[#2D2D2D] text-[#F7F5F2] px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-[#F7F5F2]/60 hover:text-[#F7F5F2] transition-colors min-h-[44px] px-2">
            <ArrowLeft size={18} />
            <span className="text-xs tracking-[0.2em] uppercase font-body hidden sm:inline">Retour au site</span>
          </Link>
        </div>
        <div className="text-center">
          <p className="text-[#8E9B90] text-[10px] tracking-[0.3em] uppercase font-body">LocaZen · Administration</p>
          <h1 className="font-heading text-2xl font-light">Gestion des locations</h1>
        </div>
        <div className="w-20 hidden sm:block" />
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#2D2D2D]/50 text-sm font-body">
            {rentals.length} location{rentals.length > 1 ? "s" : ""}
          </p>
          {isAdmin && (
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-6 py-3 bg-[#8E9B90] text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#7a8a7c] transition-colors min-h-[44px]"
            >
              <Plus size={16} />
              Ajouter
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#8E9B90]" />
          </div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#2D2D2D]/40 font-body">Aucune location pour le moment.</p>
            {isAdmin && (
              <button onClick={openCreate} className="mt-6 text-[#8E9B90] hover:underline text-sm font-body">
                Ajouter la première location
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rentals.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-[#E5E0DA] overflow-hidden flex flex-col"
              >
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0 bg-[#E5E0DA]/40">
                    {r.image ? (
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading text-xl font-light text-[#2D2D2D]">{r.name}</h3>
                        <p className="text-[#2D2D2D]/50 text-xs font-body mt-1">{r.type || "—"}</p>
                      </div>
                      <span className="font-heading text-lg text-[#2D2D2D]">{r.price}€<span className="text-xs text-[#2D2D2D]/40">/nuit</span></span>
                    </div>
                    <div className="flex gap-3 mt-3 text-[#2D2D2D]/50 text-xs font-body">
                      <span>{r.beds} ch.</span>
                      <span>{r.baths} sdb</span>
                      <span>{r.guests} voyag.</span>
                      <span className="flex items-center gap-1">★ {r.rating}</span>
                    </div>
                    {r.amenities?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {r.amenities.slice(0, 6).map((key) => {
                          const a = getAmenity(key);
                          if (!a) return null;
                          const Icon = a.Icon;
                          return (
                            <span key={key} className="w-7 h-7 flex items-center justify-center bg-[#8E9B90]/10">
                              <Icon size={13} className="text-[#8E9B90]" />
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex border-t border-[#E5E0DA]">
                    <button onClick={() => openEdit(r)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.15em] uppercase font-body text-[#2D2D2D]/70 hover:bg-[#E5E0DA]/30 transition-colors min-h-[44px]">
                      <Pencil size={14} /> Modifier
                    </button>
                    <button onClick={() => handleDelete(r)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.15em] uppercase font-body text-[#2D2D2D]/70 hover:bg-red-50 hover:text-red-600 transition-colors min-h-[44px] border-l border-[#E5E0DA]">
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <RentalForm
          rental={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null); }}
        />
      )}
    </div>
  );
}
