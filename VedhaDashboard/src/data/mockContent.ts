export interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  bannerImage: string;
  recommendedSize: string;
}

export interface SectionContent {
  id: string;
  title: string;
  description: string;
  image: string;
  recommendedSize: string;
}

export interface CardContent {
  id: string;
  title: string;
  description: string;
  image: string;
  recommendedSize: string;
}

export interface FooterContent {
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  footerText: string;
}

export interface SiteContent {
  hero: HeroContent;
  sections: SectionContent[];
  cards: CardContent[];
  footer: FooterContent;
}

export const defaultContent: SiteContent = {
  hero: {
    title: "Begin Your Journey to Natural Wellness",
    subtitle: "Rediscover the ancient wisdom of holistic health through soil, seed, food, and nature.",
    buttonText: "Start Your Healing Journey",
    bannerImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=600&fit=crop",
    recommendedSize: "1920 × 600px",
  },
  sections: [
    { id: "s1", title: "Our Health Did Not Change Overnight", description: "Over the decades, our environment, food, and lifestyle have silently transformed — and so has our health. Understanding this journey is the first step to healing.", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s2", title: "The Damage Journey", description: "From the soil beneath our feet to the air we breathe, damage has compounded at every level. Let's trace it together.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s3", title: "Soil – The Root of the Crisis", description: "Depleted minerals, chemical fertilizers, and lifeless earth — our soil has lost its vitality, and so have we.", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s4", title: "Seed – The Altered Blueprint", description: "Genetically modified and hybrid seeds have replaced the heirloom varieties our ancestors thrived on.", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s5", title: "Food – The Evolution of Intake", description: "Ultra-processed, nutrient-void food has become the norm. It's time to return to real nourishment.", image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s6", title: "Kitchen – Daily Environmental Damage", description: "Plastic containers, non-stick coatings, and microwave habits — our kitchens harbor silent health risks.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s7", title: "Home – The Indoor Environment", description: "From synthetic furnishings to poor ventilation, our homes have become sources of toxins.", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s8", title: "Yoga – Stagnation of the System", description: "Without movement and mindful practice, our body's natural detox and healing systems stagnate.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s9", title: "Nature – The Broken Connection", description: "We've disconnected from the rhythms of nature — sunrise, seasons, barefoot grounding. It's time to reconnect.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
    { id: "s10", title: "Rainwater – A Lost Responsibility", description: "Harvesting and honoring rainwater was once sacred. Today, we let this gift wash away unused.", image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&h=500&fit=crop", recommendedSize: "800 × 500px" },
  ],
  cards: [
    { id: "c1", title: "Organic Farming", description: "Return to chemical-free farming for nutrient-rich produce.", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop", recommendedSize: "400 × 300px" },
    { id: "c2", title: "Heirloom Seeds", description: "Preserve and plant traditional seed varieties.", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop", recommendedSize: "400 × 300px" },
    { id: "c3", title: "Whole Foods", description: "Embrace unprocessed, natural whole foods daily.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", recommendedSize: "400 × 300px" },
    { id: "c4", title: "Clay & Iron Cookware", description: "Replace plastic and non-stick with natural materials.", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&h=300&fit=crop", recommendedSize: "400 × 300px" },
    { id: "c5", title: "Natural Home", description: "Detoxify your living space with natural alternatives.", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=300&fit=crop", recommendedSize: "400 × 300px" },
    { id: "c6", title: "Daily Yoga", description: "Incorporate yoga and breathwork into your routine.", image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop", recommendedSize: "400 × 300px" },
    { id: "c7", title: "Forest Bathing", description: "Spend time in nature to reset your nervous system.", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop", recommendedSize: "400 × 300px" },
    { id: "c8", title: "Rainwater Harvesting", description: "Collect and utilize rainwater sustainably.", image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=300&fit=crop", recommendedSize: "400 × 300px" },
  ],
  footer: {
    address: "123 Wellness Lane, Rishikesh, Uttarakhand, India 249201",
    phone: "+91 98765 43210",
    email: "hello@vedathrive.com",
    facebookUrl: "https://facebook.com/vedathrive",
    instagramUrl: "https://instagram.com/vedathrive",
    youtubeUrl: "https://youtube.com/vedathrive",
    twitterUrl: "https://twitter.com/vedathrive",
    footerText: "© 2026 VedaThrive. All rights reserved. Empowering holistic health through ancient wisdom.",
  },
};
