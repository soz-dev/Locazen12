const API_URL = "https://locazen12-api.motastic.workers.dev";
const TOKEN   = "SohanKahyl9434";

const authHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`,
};

export async function fetchRentals() {
  const res = await fetch(`${API_URL}/rentals`);
  if (!res.ok) throw new Error("Impossible de charger les locations");
  return res.json();
}

export async function createRental(payload) {
  const res = await fetch(`${API_URL}/rentals`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
}

export async function updateRental(id, payload) {
  const res = await fetch(`${API_URL}/rentals/${id}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
}

export async function deleteRental(id) {
  const res = await fetch(`${API_URL}/rentals/${id}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
  return res.json();
}
