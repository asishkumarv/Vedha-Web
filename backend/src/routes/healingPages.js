import express from "express";
import { query } from "../db/pool.js";
import { mapHealingPage } from "../utils/mapRows.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query("SELECT * FROM healing_pages ORDER BY id");
    res.json(rows.map(mapHealingPage));
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const { rows } = await query("SELECT * FROM healing_pages WHERE slug = $1", [req.params.slug]);
    if (!rows[0]) return res.status(404).json({ message: "Healing page not found" });
    res.json(mapHealingPage(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.put("/:slug", async (req, res, next) => {
  try {
    const page = req.body;
    const { rows } = await query(
      `UPDATE healing_pages SET
        name = $2,
        banner_image = $3,
        banner_recommended_size = $4,
        icon = $5,
        title = $6,
        subtitle = $7,
        intro_paragraph = $8,
        full_desc = $9,
        sections = $10::jsonb,
        bullets = $11::jsonb,
        quote_text = $12,
        quote_author = $13,
        image = $14,
        updated_at = now()
       WHERE slug = $1
       RETURNING *`,
      [
        req.params.slug,
        page.name,
        page.bannerImage,
        page.bannerRecommendedSize,
        page.icon,
        page.title,
        page.subtitle,
        page.introParagraph,
        page.fullDesc,
        JSON.stringify(page.sections || []),
        JSON.stringify(page.bullets || []),
        page.quoteText,
        page.quoteAuthor,
        page.image,
      ]
    );
    if (!rows[0]) return res.status(404).json({ message: "Healing page not found" });
    res.json(mapHealingPage(rows[0]));
  } catch (error) {
    next(error);
  }
});

export default router;
