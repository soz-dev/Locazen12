const ALLOWED_ORIGINS = [
  "https://soz-dev.github.io",
  "http://localhost:5173",
  "http://localhost:4173",
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function json(data, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

function isAuthorized(request, env) {
  const auth = request.headers.get("Authorization") || "";
  return auth === `Bearer ${env.API_TOKEN}`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // GET /rentals — public
    if (request.method === "GET" && path === "/rentals") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM rentals ORDER BY created_at DESC"
      ).all();
      const rentals = results.map((r) => ({
        ...r,
        amenities: JSON.parse(r.amenities || "[]"),
      }));
      return json(rentals, 200, origin);
    }

    // POST /rentals — protégé
    if (request.method === "POST" && path === "/rentals") {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const body = await request.json();
      const id = Date.now().toString();
      await env.DB.prepare(
        `INSERT INTO rentals (id, name, type, price, beds, baths, guests, rating, image, imageY, amenities, airbnb_url, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id,
        body.name,
        body.type || "",
        Number(body.price),
        Number(body.beds),
        Number(body.baths),
        Number(body.guests),
        Number(body.rating),
        body.image || "",
        body.imageY ?? 50,
        JSON.stringify(body.amenities || []),
        body.airbnb_url || "",
        new Date().toISOString()
      ).run();
      return json({ id, ...body }, 201, origin);
    }

    // PUT /rentals/:id — protégé
    if (request.method === "PUT" && path.startsWith("/rentals/")) {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const id = path.split("/")[2];
      const body = await request.json();
      await env.DB.prepare(
        `UPDATE rentals SET name=?, type=?, price=?, beds=?, baths=?, guests=?,
         rating=?, image=?, imageY=?, amenities=?, airbnb_url=? WHERE id=?`
      ).bind(
        body.name,
        body.type || "",
        Number(body.price),
        Number(body.beds),
        Number(body.baths),
        Number(body.guests),
        Number(body.rating),
        body.image || "",
        body.imageY ?? 50,
        JSON.stringify(body.amenities || []),
        body.airbnb_url || "",
        id
      ).run();
      return json({ id, ...body }, 200, origin);
    }

    // DELETE /rentals/:id — protégé
    if (request.method === "DELETE" && path.startsWith("/rentals/")) {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const id = path.split("/")[2];
      await env.DB.prepare("DELETE FROM rentals WHERE id=?").bind(id).run();
      return json({ deleted: id }, 200, origin);
    }

    return json({ error: "Not found" }, 404, origin);
  },
};
