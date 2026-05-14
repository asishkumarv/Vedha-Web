export interface HealingSection {
  id: string;
  label: string;
  text: string;
}

export interface BulletPoint {
  id: string;
  icon: string;
  text: string;
}

export interface HealingPage {
  id: string;
  slug: string;
  name: string;
  bannerImage: string;
  bannerRecommendedSize: string;
  icon: string;
  title: string;
  subtitle: string;
  introParagraph: string;
  fullDesc: string;
  sections: HealingSection[];
  bullets: BulletPoint[];
  quoteText: string;
  quoteAuthor: string;
  image: string;
}

export const defaultHealingPages: HealingPage[] = [
  {
    id: "hp1", slug: "soil", name: "Soil",
    bannerImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=500&fit=crop",
    bannerRecommendedSize: "1920 × 500px",
    icon: "🌍", title: "SOIL: The Rebirth of Vitality",
    subtitle: "Restoring Earth's Living Foundation",
    introParagraph: "The soil is the great connector of lives, the source and destination of all.",
    fullDesc: "Soil is not just dirt — it is a living ecosystem teeming with billions of microorganisms that form the foundation of all terrestrial life.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    sections: [
      { id: "s1", label: "The Science", text: "Healthy soil contains over 10 billion microorganisms per gram, including bacteria, fungi, and protozoa that create a complex web of nutrient cycling." },
      { id: "s2", label: "The Practice", text: "Composting, cover cropping, and no-till farming are proven methods to restore soil health and increase nutrient density in food." },
      { id: "s3", label: "The Impact", text: "When we heal the soil, we heal ourselves. Nutrient-dense food grown in living soil contains up to 10x more minerals than conventionally grown produce." },
    ],
    bullets: [
      { id: "b1", icon: "🌱", text: "Understanding soil microbiome and its impact on nutrition" },
      { id: "b2", icon: "🧪", text: "Effects of chemical fertilizers on soil health" },
      { id: "b3", icon: "♻️", text: "Composting and natural soil restoration methods" },
      { id: "b4", icon: "🌿", text: "How healthy soil creates nutrient-dense food" },
    ],
    quoteText: "The nation that destroys its soil destroys itself.",
    quoteAuthor: "VedhaThrive",
  },
  {
    id: "hp2", slug: "seed", name: "Seed",
    bannerImage: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1920&h=500&fit=crop",
    bannerRecommendedSize: "1920 × 500px",
    icon: "🌱", title: "SEED: Reclaiming Natural Life Force",
    subtitle: "Reclaiming Natural Life Force",
    introParagraph: "Seeds carry the memory of thousands of years of evolution.",
    fullDesc: "When we choose heirloom seeds, we choose to preserve the wisdom of nature and protect biodiversity for future generations.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&h=600&fit=crop",
    sections: [
      { id: "s1", label: "The Science", text: "Heirloom seeds are open-pollinated varieties passed down for generations, preserving genetic diversity and nutritional superiority." },
      { id: "s2", label: "The Practice", text: "Seed saving, community seed banks, and growing native varieties are essential practices for food sovereignty." },
    ],
    bullets: [
      { id: "b1", icon: "🧬", text: "The difference between heirloom, hybrid, and GMO seeds" },
      { id: "b2", icon: "🌾", text: "Why native seed varieties are nutritionally superior" },
      { id: "b3", icon: "🏛️", text: "Seed saving traditions and community seed banks" },
      { id: "b4", icon: "🌻", text: "Starting your own heirloom seed garden" },
    ],
    quoteText: "A seed carries within it the dream of a forest.",
    quoteAuthor: "VedhaThrive",
  },
  {
    id: "hp3", slug: "food", name: "Food",
    bannerImage: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1920&h=500&fit=crop",
    bannerRecommendedSize: "1920 × 500px",
    icon: "🍎", title: "FOOD: Nourishing Body and Soul",
    subtitle: "Nourishing Body and Soul",
    introParagraph: "Let food be thy medicine and medicine be thy food.",
    fullDesc: "The journey back to real food is the most powerful healing path available to us today.",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop",
    sections: [
      { id: "s1", label: "The Science", text: "Whole foods contain complex matrices of nutrients that work synergistically — something no supplement can replicate." },
      { id: "s2", label: "The Practice", text: "Traditional cooking methods like slow cooking, fermentation, and soaking preserve and enhance nutritional value." },
    ],
    bullets: [
      { id: "b1", icon: "🥗", text: "Understanding whole foods vs processed foods" },
      { id: "b2", icon: "🫘", text: "Traditional cooking methods that preserve nutrition" },
      { id: "b3", icon: "🌿", text: "Seasonal eating and local food systems" },
      { id: "b4", icon: "🍯", text: "Natural sweeteners and food preservation" },
    ],
    quoteText: "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.",
    quoteAuthor: "VedhaThrive",
  },
  {
    id: "hp4", slug: "kitchen", name: "Kitchen",
    bannerImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=500&fit=crop",
    bannerRecommendedSize: "1920 × 500px",
    icon: "🏺", title: "KITCHEN: Sacred Space of Nourishment",
    subtitle: "Sacred Space of Nourishment",
    introParagraph: "Your kitchen is the pharmacy of your home.",
    fullDesc: "The materials you cook with and the methods you use directly affect your family's health and well-being.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    sections: [
      { id: "s1", label: "The Science", text: "Non-stick coatings release toxic PFAS chemicals when heated, while traditional materials like clay and iron enhance food with beneficial minerals." },
      { id: "s2", label: "The Practice", text: "Transitioning to clay pots, iron skillets, and brass utensils while eliminating plastic and non-stick cookware." },
    ],
    bullets: [
      { id: "b1", icon: "🍳", text: "Dangers of non-stick and aluminum cookware" },
      { id: "b2", icon: "🏺", text: "Benefits of clay, iron, and brass utensils" },
      { id: "b3", icon: "🚫", text: "Eliminating plastic from your kitchen" },
      { id: "b4", icon: "🔥", text: "Traditional cooking techniques for maximum nutrition" },
    ],
    quoteText: "The kitchen is the heart of the home and the foundation of health.",
    quoteAuthor: "VedhaThrive",
  },
  {
    id: "hp5", slug: "home", name: "Home",
    bannerImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1920&h=500&fit=crop",
    bannerRecommendedSize: "1920 × 500px",
    icon: "🏡", title: "HOME: Creating a Toxin-Free Sanctuary",
    subtitle: "Creating a Toxin-Free Sanctuary",
    introParagraph: "Our homes should be our sanctuaries, but modern materials have turned them into sources of invisible toxins.",
    fullDesc: "Reclaiming your home as a healing space starts with understanding what's in your environment and making conscious choices.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    sections: [
      { id: "s1", label: "The Science", text: "Indoor air can be 2-5x more polluted than outdoor air due to VOCs from furniture, paints, and cleaning products." },
      { id: "s2", label: "The Practice", text: "Using natural cleaning alternatives, air-purifying plants, and reducing EMF exposure creates a genuinely healthy home." },
    ],
    bullets: [
      { id: "b1", icon: "🧹", text: "Natural cleaning alternatives" },
      { id: "b2", icon: "🪴", text: "Air-purifying plants for every room" },
      { id: "b3", icon: "💡", text: "Reducing EMF exposure at home" },
      { id: "b4", icon: "🛏️", text: "Natural bedding and furniture choices" },
    ],
    quoteText: "A natural home is the first step toward a natural life.",
    quoteAuthor: "VedhaThrive",
  },
  {
    id: "hp6", slug: "yoga", name: "Yoga",
    bannerImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&h=500&fit=crop",
    bannerRecommendedSize: "1920 × 500px",
    icon: "🧘", title: "YOGA: Union of Body, Mind, and Spirit",
    subtitle: "Union of Body, Mind, and Spirit",
    introParagraph: "Yoga is not about touching your toes. It's about what you learn on the way down.",
    fullDesc: "This ancient practice unlocks the body's natural healing power through the union of breath, movement, and awareness.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    sections: [
      { id: "s1", label: "The Science", text: "Studies show regular yoga practice reduces cortisol, inflammation, and blood pressure while improving immune function." },
      { id: "s2", label: "The Practice", text: "Starting with Surya Namaskar, pranayama breathing, and simple meditation builds a sustainable daily practice." },
    ],
    bullets: [
      { id: "b1", icon: "🌅", text: "Starting a daily practice with Surya Namaskar" },
      { id: "b2", icon: "🫁", text: "Pranayama breathing techniques for detox" },
      { id: "b3", icon: "🧠", text: "Meditation for mental clarity and peace" },
      { id: "b4", icon: "💪", text: "Asanas for strength and flexibility" },
    ],
    quoteText: "Yoga is the journey of the self, through the self, to the self.",
    quoteAuthor: "VedhaThrive",
  },
  {
    id: "hp7", slug: "nature", name: "Nature",
    bannerImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=500&fit=crop",
    bannerRecommendedSize: "1920 × 500px",
    icon: "🌳", title: "NATURE: Reconnecting with the Living World",
    subtitle: "Reconnecting with the Living World",
    introParagraph: "In every walk with nature, one receives far more than he seeks.",
    fullDesc: "Nature is not something separate from us — it is the very fabric of our existence.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    sections: [
      { id: "s1", label: "The Science", text: "Studies show that spending 2 hours per week in nature significantly improves mental health, immune function, and cardiovascular health." },
      { id: "s2", label: "The Practice", text: "Forest bathing, barefoot grounding, sunrise walks, and seasonal living are simple ways to reconnect with nature's rhythms." },
    ],
    bullets: [
      { id: "b1", icon: "🌲", text: "Forest bathing and its scientific benefits" },
      { id: "b2", icon: "🦶", text: "Earthing and barefoot grounding practices" },
      { id: "b3", icon: "🌅", text: "Aligning with circadian rhythms" },
      { id: "b4", icon: "🍂", text: "Seasonal living and nature connection" },
    ],
    quoteText: "Look deep into nature, and then you will understand everything better.",
    quoteAuthor: "VedhaThrive",
  },
  {
    id: "hp8", slug: "rainwater", name: "Rainwater",
    bannerImage: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1920&h=500&fit=crop",
    bannerRecommendedSize: "1920 × 500px",
    icon: "💧", title: "RAINWATER: Harvesting Nature's Gift",
    subtitle: "Harvesting Nature's Gift",
    introParagraph: "Rainwater is nature's purest gift to humanity.",
    fullDesc: "The ancient practice of rainwater harvesting connects us to the most fundamental resource and teaches responsibility toward our environment.",
    image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&h=600&fit=crop",
    sections: [
      { id: "s1", label: "The Science", text: "Rainwater is naturally soft, free of chlorine and fluoride, and when properly filtered, is among the purest drinking water available." },
      { id: "s2", label: "The Practice", text: "Simple rooftop collection systems, storage tanks, and basic filtration can provide a household with clean, sustainable water year-round." },
    ],
    bullets: [
      { id: "b1", icon: "🏠", text: "Setting up rooftop rainwater collection" },
      { id: "b2", icon: "🧪", text: "Purification and filtration methods" },
      { id: "b3", icon: "💧", text: "Benefits of rainwater for drinking and cooking" },
      { id: "b4", icon: "🌧️", text: "Seasonal harvesting strategies" },
    ],
    quoteText: "Water is the driving force of all nature.",
    quoteAuthor: "VedhaThrive",
  },
];
