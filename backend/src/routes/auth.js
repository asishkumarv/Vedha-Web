import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { query } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

function publicUser(row) {
  return { id: row.id, name: row.name, email: row.email, role: row.role };
}

function sign(user) {
  return jwt.sign(publicUser(user), process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
}

router.post("/signup", async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password || "";
    const role = req.body.role === "admin" ? "admin" : "user";

    if (!name || !email || password.length < 6) {
      return res.status(400).json({ message: "Name, valid email, and 6+ character password are required" });
    }

    const hash = await bcrypt.hash(password, 10);
    const { rows } = await query(
      `INSERT INTO users (id, name, email, password_hash, role)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, name, email, role`,
      [randomUUID(), name, email, hash, role]
    );
    const user = rows[0];
    res.status(201).json({ token: sign(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password || "";
    const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ token: sign(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await query("SELECT id, name, email, role FROM users WHERE id = $1", [req.user.id]);
    if (!rows[0]) return res.status(404).json({ message: "User not found" });
    res.json(publicUser(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.get("/me/progress", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await query("SELECT page_slug FROM user_progress WHERE user_id = $1", [req.user.id]);
    res.json(rows.map(r => r.page_slug));
  } catch (error) {
    next(error);
  }
});

router.post("/me/progress/:slug", requireAuth, async (req, res, next) => {
  try {
    await query(
      "INSERT INTO user_progress (user_id, page_slug) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [req.user.id, req.params.slug]
    );
    res.status(201).json({ message: "Progress updated" });
  } catch (error) {
    next(error);
  }
});

export default router;
