import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProcessDetail = () => {
  const { id } = useParams();

  const contentMap = {
    // --- DAMAGE/PROCESS JOURNEY IDS ---
    "soil-health-restoration": {
      title: "🌾 SOIL — The Root of the Crisis",
      image: "/soil.png",
      fullDesc: "Our health did not decline overnight; it began beneath our feet.",
      points: [
        "The Legacy: Historically, our soil was a living ecosystem. Natural minerals existed in a perfect state of equilibrium, ensuring crops were densely packed with essential nutrients.",
        "The Shift: Post-1960, the rise of intensive chemical farming diminished the vital force of the earth.",
        "The Consequence: There is a direct biological chain: Soil Microbes → Plant Minerals → Human Nutrition. When this chain is compromised, the integrity of the human body follows.",
        "Our health story begins in the soil."
      ]
    },
    "seed-purity-assessment": {
      title: "🌱 SEED — The Altered Blueprint",
      image: "/seed.jpeg",
      fullDesc: "The seed is the first manifestation of life.",
      points: [
        "The Legacy: For generations, we used indigenous, heirloom seeds perfectly adapted to our local climate and geography.",
        "The Shift: The widespread adoption of hybrid and genetically modified seeds changed the 'vitality profile' of our crops.",
        "The Consequence: If the blueprint of the seed is altered, the nutritional essence of the food is fundamentally changed."
      ]
    },
    "natural-food-guidance": {
      title: "🍚 FOOD — The Evolution of Intake",
      image: "/Food.png",
      fullDesc: "Soil → Seed → Food → Body. The primary fuel for our system has undergone a radical transformation.",
      points: [
        "Refinement: Nutrient-rich grains have been replaced by stripped, refined alternatives.",
        "Processing: Traditional cold-pressed oils have given way to chemically refined fats, and the essential presence of fermented foods in our diet has vanished.",
        "A Question for Today: Have you introduced your children to the ancestral flavors that sustained our lineage?",
        "Ganji, Ambali, Java, Ragi Mudda, Sesame Laddus.These were not merely meals, they were medicinal staples designed to maintain the body's internal balance."
      ]
    },
    "chemical-free-kitchen": {
      title: "🍳 KITCHEN — Daily Environmental Damage",
      image: "/kitchen.png",
      fullDesc: "Nutritious ingredients are only half the story; the method of preparation is equally critical.",
      points: [
        "Modern Hazards: Aluminum cookware, non-stick surfaces, re-heated oils, plastic storage, and harsh chemical detergents.Toxic Coatings: Eliminating Teflon (non-stick) and plastic storage.",
        "Ancient Wisdom: Brass (Kanchu) and Bronze (Ethadi) vessels, slow-cooking techniques, natural cleaning agents, and safe storage.",
        "The Science: Repeatedly heating oil creates oxidation compounds, while the interaction of plastic and heat leads to chemical migration into our food.",
        "The kitchen is the temple of your home’s health."
      ]
    },
    "biological-home-architecture": {
      title: "🏠 HOME — The Indoor Environment",
      image: "/Home.jpeg",
      fullDesc: "Does the architecture of your life support your biology?",
      points: [
        "From the kitchen to the bedroom, our modern homes have become hubs for:",
        "Synthetic fragrances and indoor chemicals.",
        "Poor ventilation and synthetic building materials.",
        "The Impact: These factors disrupt our sleep rhythms, respiratory health, and overall air quality."
      ]
    },
    "movement-system-preservation": {
      title: "🧘 YOGA — Stagnation of the System",
      image: "/Yoga.png",
      fullDesc: "While food builds the body, movement is what preserves it.",
      points: [
        "The Reality: Modern life is sedentary. Are you moving enough to induce perspiration? Are you breathing deeply enough to oxygenate your cells?",
        "The Tradition: Once, Yoga was not a 'class'—it was a way of living.",
        "The Science: Movement supports circulation, while conscious breathing restores nervous system balance."
      ]
    },
    "outdoor-nature-reconnection": {
      title: "🌞 NATURE — The Broken Connection",
      image: "/Nature.jpeg",
      fullDesc: "Our biology is designed for the outdoors, yet our lives have moved entirely inside.",
      points: [
        "The Impact: Sunlight regulates our circadian rhythms, and nature exposure is a primary biological requirement for stress regulation.",
        "We have become disconnected from our source."
      ]
    },
    "groundwater-cycle-responsibility": {
      title: "🌧️ RAIN WATER — A Lost Responsibility",
      image: "/Rainwater.png",
      fullDesc: "We extract life-sustaining water from the earth through bore wells and groundwater usage, but we have forgotten the cycle of return.",
      points: [
        "The Problem: Concrete cities prevent natural absorption. Rainwater, instead of recharging the earth, is lost to urban drains.",
        "The Responsibility: Groundwater recharge depends entirely on soil absorption. By neglecting the earth’s hydration, we threaten our future security.",
        "Personal Responsibility: Taking ownership of the water cycle within our own homes."
      ]
    },

     };

  const data = contentMap[id];

  if (!data) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>Content not found for ID: {id}</h2>
        <Link to="/" style={{color: '#d4a34d'}}>Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <style>{`
        .detail-container { max-width: 800px; margin: 80px auto; padding: 20px; font-family: 'Inter', sans-serif; }
        .back-btn { color: #d4a34d; text-decoration: none; font-weight: bold; margin-bottom: 20px; display: inline-block; font-size: 0.9rem;}
        .hero-img { width: 100%; object-fit: cover; border-radius: 15px; margin-bottom: 30px; }
        .title { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 15px; color: #2d332a; }
        .desc { font-size: 1.2rem; line-height: 1.6; color: #444; margin-bottom: 30px; border-left: 4px solid #d4a34d; padding-left: 15px; }
        .point { margin-bottom: 15px; font-size: 1.1rem; list-style-type: none; position: relative; padding-left: 25px; color: #4b5563; line-height: 1.5;}
        .point::before { content: "✓"; position: absolute; left: 0; color: #d4a34d; font-weight: bold; }
        @media (max-width: 768px) { .hero-img { height: 250px; } .title { font-size: 1.8rem; } }
      `}</style>

      <Link to="/" className="back-btn">← BACK TO HOME</Link>
      <img src={data.image} alt={data.title} className="hero-img" />
      <h1 className="title">{data.title}</h1>
      <p className="desc" dangerouslySetInnerHTML={{ __html: data.fullDesc }} />
      
      <div className="points-list">
        {data.points.map((p, i) => (
          <li key={i} className="point">{p}</li>
        ))}
      </div>
    </div>
  );
};

export default ProcessDetail;