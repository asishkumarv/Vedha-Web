export function mapHealingPage(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    bannerImage: row.banner_image,
    bannerRecommendedSize: row.banner_recommended_size,
    icon: row.icon,
    title: row.title,
    subtitle: row.subtitle,
    introParagraph: row.intro_paragraph,
    fullDesc: row.full_desc,
    sections: row.sections || [],
    bullets: row.bullets || [],
    quoteText: row.quote_text,
    quoteAuthor: row.quote_author,
    image: row.image,
  };
}

export function mapSubscription(row) {
  return {
    id: row.id,
    userName: row.user_name,
    email: row.email,
    plan: row.plan,
    status: row.status,
    startDate: row.start_date instanceof Date ? row.start_date.toISOString().slice(0, 10) : String(row.start_date).slice(0, 10),
    endDate: row.end_date instanceof Date ? row.end_date.toISOString().slice(0, 10) : String(row.end_date).slice(0, 10),
  };
}
