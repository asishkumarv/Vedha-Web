import dotenv from "dotenv";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { query, pool } from "./pool.js";
import { defaultContent, defaultHealingPages, defaultSubscriptions } from "../seed/defaultData.js";

dotenv.config();

async function init() {
  await query(`
    CREATE TABLE IF NOT EXISTS site_content (
      id TEXT PRIMARY KEY DEFAULT 'default',
      content JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS healing_pages (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      banner_image TEXT NOT NULL DEFAULT '',
      banner_recommended_size TEXT NOT NULL DEFAULT '',
      icon TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL DEFAULT '',
      intro_paragraph TEXT NOT NULL DEFAULT '',
      full_desc TEXT NOT NULL DEFAULT '',
      sections JSONB NOT NULL DEFAULT '[]'::jsonb,
      bullets JSONB NOT NULL DEFAULT '[]'::jsonb,
      quote_text TEXT NOT NULL DEFAULT '',
      quote_author TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      user_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      plan TEXT NOT NULL CHECK (plan IN ('Basic', 'Premium', 'Custom')),
      status TEXT NOT NULL CHECK (status IN ('Active', 'Expired')),
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      size TEXT NOT NULL DEFAULT 'URL',
      used_in TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
      page_slug TEXT REFERENCES healing_pages(slug) ON DELETE CASCADE,
      completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, page_slug)
    );
  `);

  await query("ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES users(id) ON DELETE SET NULL");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@vedhathrive.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminHash = await bcrypt.hash(adminPassword, 10);
  await query(
    `INSERT INTO users (id, name, email, password_hash, role)
     VALUES ($1,$2,$3,$4,'admin')
     ON CONFLICT (email) DO NOTHING`,
    [randomUUID(), "Vedha Admin", adminEmail.toLowerCase(), adminHash]
  );

  await query(
    `INSERT INTO site_content (id, content)
     VALUES ('default', $1::jsonb)
     ON CONFLICT (id) DO NOTHING`,
    [JSON.stringify(defaultContent)]
  );

  for (const page of defaultHealingPages) {
    await query(
      `INSERT INTO healing_pages (
        id, slug, name, banner_image, banner_recommended_size, icon, title, subtitle,
        intro_paragraph, full_desc, sections, bullets, quote_text, quote_author, image
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12::jsonb,$13,$14,$15)
      ON CONFLICT (slug) DO NOTHING`,
      [
        page.id,
        page.slug,
        page.name,
        page.bannerImage,
        page.bannerRecommendedSize,
        page.icon,
        page.title,
        page.subtitle,
        page.introParagraph,
        page.fullDesc,
        JSON.stringify(page.sections),
        JSON.stringify(page.bullets),
        page.quoteText,
        page.quoteAuthor,
        page.image,
      ]
    );
  }

  const defaultImages = [
    { name: "Hero Banner", url: defaultContent.hero.bannerImage, usedIn: "Hero Section" },
    ...defaultContent.sections.map((section) => ({ name: section.title, url: section.image, usedIn: "Homepage Section" })),
    ...defaultContent.cards.map((card) => ({ name: card.title, url: card.image, usedIn: "Healing Card" })),
    ...defaultHealingPages.flatMap((page) => [
      { name: `${page.name} Banner`, url: page.bannerImage, usedIn: "Healing Page Banner" },
      { name: `${page.name} Detail`, url: page.image, usedIn: "Healing Page Detail" },
    ]),
  ];

  for (const image of defaultImages) {
    if (!image.url) continue;
    await query(
      `INSERT INTO media_assets (id, name, url, size, used_in)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (url) DO NOTHING`,
      [randomUUID(), image.name, image.url, "URL", image.usedIn]
    );
  }

  for (const sub of defaultSubscriptions) {
    await query(
      `INSERT INTO subscriptions (id, user_name, email, plan, status, start_date, end_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (email) DO NOTHING`,
      [sub.id || randomUUID(), sub.userName, sub.email, sub.plan, sub.status, sub.startDate, sub.endDate]
    );
  }

  console.log("Database initialized");
}

init()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
