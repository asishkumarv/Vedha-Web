import express from "express";
import { randomUUID } from "node:crypto";
import { query } from "../db/pool.js";
import { mapSubscription } from "../utils/mapRows.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

function normalize(input) {
  return {
    userName: input.userName?.trim(),
    email: input.email?.trim().toLowerCase(),
    plan: input.plan || "Basic",
    status: input.status || "Active",
    startDate: input.startDate,
    endDate: input.endDate,
  };
}

router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query("SELECT * FROM subscriptions ORDER BY created_at DESC");
    res.json(rows.map(mapSubscription));
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT * FROM subscriptions
       WHERE user_id = $1 OR email = $2
       ORDER BY end_date DESC
       LIMIT 1`,
      [req.user.id, req.user.email]
    );
    res.json(rows[0] ? mapSubscription(rows[0]) : null);
  } catch (error) {
    next(error);
  }
});

router.post("/checkout", requireAuth, async (req, res, next) => {
  try {
    const plan = req.body.plan === "Premium" ? "Premium" : req.body.plan === "Custom" ? "Custom" : "Basic";
    const now = new Date();
    const end = new Date(now);
    if (plan === "Premium") end.setFullYear(end.getFullYear() + 1);
    else end.setMonth(end.getMonth() + 1);

    const { rows: users } = await query("SELECT name, email FROM users WHERE id = $1", [req.user.id]);
    const user = users[0] || req.user;

    const { rows } = await query(
      `INSERT INTO subscriptions (id, user_id, user_name, email, plan, status, start_date, end_date)
       VALUES ($1,$2,$3,$4,$5,'Active',$6,$7)
       ON CONFLICT (email) DO UPDATE SET
        user_id = EXCLUDED.user_id,
        user_name = EXCLUDED.user_name,
        plan = EXCLUDED.plan,
        status = 'Active',
        start_date = EXCLUDED.start_date,
        end_date = EXCLUDED.end_date,
        updated_at = now()
       RETURNING *`,
      [randomUUID(), req.user.id, user.name, user.email, plan, now.toISOString().slice(0, 10), end.toISOString().slice(0, 10)]
    );

    res.status(201).json(mapSubscription(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sub = normalize(req.body);
    const { rows: users } = await query("SELECT id FROM users WHERE email = $1", [sub.email]);
    const userId = users[0]?.id || null;

    const { rows } = await query(
      `INSERT INTO subscriptions (id, user_id, user_name, email, plan, status, start_date, end_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (email) DO UPDATE SET
        user_id = COALESCE(EXCLUDED.user_id, subscriptions.user_id),
        user_name = EXCLUDED.user_name,
        plan = EXCLUDED.plan,
        status = EXCLUDED.status,
        start_date = EXCLUDED.start_date,
        end_date = EXCLUDED.end_date,
        updated_at = now()
       RETURNING *`,
      [randomUUID(), userId, sub.userName, sub.email, sub.plan, sub.status, sub.startDate, sub.endDate]
    );
    res.status(201).json(mapSubscription(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const sub = normalize(req.body);
    const { rows: users } = await query("SELECT id FROM users WHERE email = $1", [sub.email]);
    const userId = users[0]?.id || null;

    const { rows } = await query(
      `UPDATE subscriptions SET
        user_id = COALESCE($2, user_id),
        user_name = $3, email = $4, plan = $5, status = $6, start_date = $7, end_date = $8, updated_at = now()
       WHERE id = $1
       RETURNING *`,
      [req.params.id, userId, sub.userName, sub.email, sub.plan, sub.status, sub.startDate, sub.endDate]
    );
    if (!rows[0]) return res.status(404).json({ message: "Subscription not found" });
    res.json(mapSubscription(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rowCount } = await query("DELETE FROM subscriptions WHERE id = $1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ message: "Subscription not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
