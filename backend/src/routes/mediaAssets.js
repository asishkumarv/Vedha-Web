import express from "express";
import { randomUUID } from "node:crypto";
import { query } from "../db/pool.js";

const router = express.Router();

function mapAsset(row) {
  return {
    id: row.id,
    name: row.name,
    url: row.url,
    size: row.size,
    uploadedAt: row.created_at instanceof Date ? row.created_at.toLocaleString() : String(row.created_at),
    usedIn: row.used_in || undefined,
  };
}

router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query("SELECT * FROM media_assets ORDER BY created_at DESC");
    res.json(rows.map(mapAsset));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const name = req.body.name?.trim() || "Image";
    const url = req.body.url?.trim();
    const size = req.body.size?.trim() || "URL";
    const usedIn = req.body.usedIn?.trim() || null;

    if (!url) return res.status(400).json({ message: "Image URL is required" });

    const { rows } = await query(
      `INSERT INTO media_assets (id, name, url, size, used_in)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (url) DO UPDATE SET
        name = EXCLUDED.name,
        size = EXCLUDED.size,
        used_in = COALESCE(EXCLUDED.used_in, media_assets.used_in)
       RETURNING *`,
      [randomUUID(), name, url, size, usedIn]
    );

    res.status(201).json(mapAsset(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rowCount } = await query("DELETE FROM media_assets WHERE id = $1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ message: "Image not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
