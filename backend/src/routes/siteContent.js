import express from "express";
import { query } from "../db/pool.js";
import { defaultContent } from "../seed/defaultData.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query("SELECT content FROM site_content WHERE id = 'default'");
    res.json(rows[0]?.content || defaultContent);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const content = req.body;
    const { rows } = await query(
      `INSERT INTO site_content (id, content, updated_at)
       VALUES ('default', $1::jsonb, now())
       ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = now()
       RETURNING content`,
      [JSON.stringify(content)]
    );
    res.json(rows[0].content);
  } catch (error) {
    next(error);
  }
});

router.post("/reset", async (_req, res, next) => {
  try {
    const { rows } = await query(
      `UPDATE site_content SET content = $1::jsonb, updated_at = now()
       WHERE id = 'default'
       RETURNING content`,
      [JSON.stringify(defaultContent)]
    );
    res.json(rows[0].content);
  } catch (error) {
    next(error);
  }
});

export default router;
