import express from "express";
import { randomUUID } from "node:crypto";
import { query } from "../db/pool.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "A valid email is required" });
    }

    const { rows } = await query(
      `INSERT INTO newsletter_subscribers (id, email)
       VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
       RETURNING id, email, created_at`,
      [randomUUID(), email]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
