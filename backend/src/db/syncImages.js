import dotenv from "dotenv";
import { randomUUID } from "node:crypto";
import { query, pool } from "./pool.js";
import { defaultContent, defaultHealingPages } from "../seed/defaultData.js";

dotenv.config();

function needsRepair(url) {
  return !url || url.startsWith("/") || url.includes("photo-1515694346937-94d85e01e6a0");
}

function mergeSiteImages(current) {
  const next = structuredClone(current || defaultContent);

  if (needsRepair(next.hero?.bannerImage)) {
    next.hero = { ...next.hero, bannerImage: defaultContent.hero.bannerImage };
  }

  next.sections = (next.sections || defaultContent.sections).map((section) => {
    const fallback = defaultContent.sections.find((item) => item.id === section.id);
    return fallback && needsRepair(section.image) ? { ...section, image: fallback.image } : section;
  });

  next.cards = (next.cards || defaultContent.cards).map((card) => {
    const fallback = defaultContent.cards.find((item) => item.id === card.id);
    return fallback && needsRepair(card.image) ? { ...card, image: fallback.image } : card;
  });

  return next;
}

async function upsertMedia(name, url, usedIn) {
  if (!url) return;
  if (url.startsWith("data:")) return;
  await query(
    `INSERT INTO media_assets (id, name, url, size, used_in)
     VALUES ($1,$2,$3,'URL',$4)
     ON CONFLICT (url) DO UPDATE SET
      name = EXCLUDED.name,
      used_in = COALESCE(EXCLUDED.used_in, media_assets.used_in)`,
    [randomUUID(), name, url, usedIn]
  );
}

async function syncImages() {
  await query(`
    CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      size TEXT NOT NULL DEFAULT 'URL',
      used_in TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await query("DELETE FROM media_assets WHERE url LIKE '/%'");
  await query("DELETE FROM media_assets WHERE url LIKE '%photo-1515694346937-94d85e01e6a0%'");

  const siteResult = await query("SELECT content FROM site_content WHERE id = 'default'");
  const siteContent = mergeSiteImages(siteResult.rows[0]?.content);

  await query(
    `INSERT INTO site_content (id, content)
     VALUES ('default', $1::jsonb)
     ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = now()`,
    [JSON.stringify(siteContent)]
  );

  for (const fallback of defaultHealingPages) {
    await query(
      `UPDATE healing_pages SET
        banner_image = CASE WHEN banner_image = '' OR banner_image LIKE '/%' OR banner_image LIKE '%photo-1515694346937-94d85e01e6a0%' THEN $2 ELSE banner_image END,
        image = CASE WHEN image = '' OR image LIKE '/%' OR image LIKE '%photo-1515694346937-94d85e01e6a0%' THEN $3 ELSE image END,
        updated_at = now()
       WHERE slug = $1`,
      [fallback.slug, fallback.bannerImage, fallback.image]
    );
  }

  const healingResult = await query("SELECT name, banner_image, image FROM healing_pages ORDER BY id");

  await upsertMedia("Hero Banner", siteContent.hero.bannerImage, "Hero Section");
  for (const section of siteContent.sections || []) {
    await upsertMedia(section.title, section.image, "Homepage Section");
  }
  for (const card of siteContent.cards || []) {
    await upsertMedia(card.title, card.image, "Healing Card");
  }
  for (const page of healingResult.rows) {
    await upsertMedia(`${page.name} Banner`, page.banner_image, "Healing Page Banner");
    await upsertMedia(`${page.name} Detail`, page.image, "Healing Page Detail");
  }

  console.log("Images synced into site content, healing pages, and media library");
}

syncImages()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
