import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSiteContent } from '../context/SiteContentContext';

const HealingProcess = () => {
  const [activeImg, setActiveImg] = useState(null);
  const content = useSiteContent();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-quad',
    });
  }, []);

  const fallbackSections = [
    {
      id: "soil",
      title: "🌾 SOIL — The Root of the Crisis",
      img: "soil.png",
      desc: "Our health did not decline overnight; it began beneath our feet.",
      points: [
        "The Legacy: Historically, our soil was a living ecosystem. Natural minerals existed in a perfect state of equilibrium, ensuring crops were densely packed with essential nutrients.",
        "The Shift: Post-1960, the rise of intensive chemical farming diminished the vital force of the earth.",
        "The Consequence: There is a direct biological chain: Soil Microbes → Plant Minerals → Human Nutrition. When this chain is compromised, the integrity of the human body follows.",
        "Our health story begins in the soil."
      ]
    },
    {
      id: "seed",
      title: "🌱 SEED — The Altered Blueprint",
      img: "seed.jpeg",
      desc: "The seed is the first manifestation of life.",
      points: [
        "The Legacy: For generations, we used indigenous, heirloom seeds perfectly adapted to our local climate and geography.",
        "The Shift: The widespread adoption of hybrid and genetically modified seeds changed the 'vitality profile' of our crops.",
        "The Consequence: If the blueprint of the seed is altered, the nutritional essence of the food is fundamentally changed."
      ]
    },
    {
      id: "food",
      title: "🍚 FOOD — The Evolution of Intake",
      img: "Food.png",
      desc: "Soil → Seed → Food → Body. The primary fuel for our system has undergone a radical transformation.",
      points: [
        "Refinement: Nutrient-rich grains have been replaced by stripped, refined alternatives.",
        "Processing: Traditional cold-pressed oils have given way to chemically refined fats, and the essential presence of fermented foods in our diet has vanished.",
        "A Question for Today: Have you introduced your children to the ancestral flavors that sustained our lineage?",
        "Ganji, Ambali, Java, Ragi Mudda, Sesame Laddus. These were not merely meals, they were medicinal staples designed to maintain the body's internal balance."
      ]
    },
    {
      id: "kitchen",
      title: "🍳 KITCHEN — Daily Environmental Damage",
      img: "kitchen.png",
      desc: "Nutritious ingredients are only half the story; the method of preparation is equally critical.",
      points: [
        "Modern Hazards: Aluminum cookware, non-stick surfaces, re-heated oils, plastic storage, and harsh chemical detergents.",
        "Ancient Wisdom: Brass (Kanchu) and Bronze (Ethadi) vessels, slow-cooking techniques, natural cleaning agents, and safe storage.",
        "The Science: Repeatedly heating oil creates oxidation compounds, while the interaction of plastic and heat leads to chemical migration into our food.",
        "The kitchen is the temple of your home’s health."
      ]
    },
    {
      id: "home",
      title: "🏠 HOME — The Indoor Environment",
      img: "Home.jpeg",
      desc: "Does the architecture of your life support your biology?",
      points: [
        "From the kitchen to the bedroom, our modern homes have become hubs for synthetic fragrances and indoor chemicals.",
        "Poor ventilation and synthetic building materials impact our respiratory health.",
        "The Impact: These factors disrupt our sleep rhythms and overall air quality."
      ]
    },
    {
      id: "yoga",
      title: "🧘 YOGA — Stagnation of the System",
      img: "Yoga.png",
      desc: "While food builds the body, movement is what preserves it.",
      points: [
        "The Reality: Modern life is sedentary. Movement supports circulation and detoxifies the system.",
        "The Tradition: Once, Yoga was not a 'class'—it was a way of living with functional movements.",
        "The Science: Movement preserves the body while conscious breathing restores nervous system balance."
      ]
    },
    {
      id: "nature",
      title: "🌞 NATURE — The Broken Connection",
      img: "Nature.jpeg",
      desc: "Our biology is designed for the outdoors, yet our lives have moved entirely inside.",
      points: [
        "The Impact: Sunlight regulates our circadian rhythms and nature exposure regulates stress.",
        "We have become disconnected from our source, leading to biological disharmony."
      ]
    },
    {
      id: "rainwater",
      title: "🌧️ RAIN WATER — A Lost Responsibility",
      img: "Rainwater.png",
      desc: "We extract water from the earth, but we have forgotten the cycle of return.",
      points: [
        "The Problem: Concrete cities prevent natural absorption; rainwater is lost to urban drains.",
        "The Responsibility: Groundwater recharge depends entirely on soil absorption.",
        "Personal Responsibility: Taking ownership of the water cycle within our own homes."
      ]
    }
  ];
  const sections = content?.sections?.slice(2).map((section) => ({
    id: section.id,
    title: section.title,
    img: section.image,
    desc: section.description,
    points: [section.description],
  })) || fallbackSections;

  return (
    <section className="healing-journey-container">
      {/* Import the traditional fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;600&display=swap');

        .healing-journey-container {
          background-color: #fdfcf7;
        
          color: #2d332a;
          padding: 0;
        }

        .journey-section {
          max-width: 1400px;
          // margin: 0 auto 120px;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        /* ROYAL TITLE STYLE */
        .title-line {
          font-family: 'Cinzel Decorative', cursive;
          font-size: clamp(2rem, 5vw, 2.5rem);
          color: #8b6b23; /* Deep Antique Gold */
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          font-weight: 700;
        }

        .title-line::before, .title-line::after {
          content: "";
          height: 2px;
          width: 80px;
          background: linear-gradient(to right, transparent, #d4a34d, transparent);
        }

        .columns-container {
          display: flex;
          gap: 50px;
          align-items: center;
        }

        /* IMAGE COLUMN - INCREASED WIDTH FOR VISIBILITY */
        .column-left {
          flex: 1.5; 
        }

        .image-frame {
          position: relative;
          background: #fff;
          cursor: pointer;
          transition: transform 0.3s ease;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
          border: 1px solid #e5e5dd;
        }

        .image-frame:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(139, 107, 35, 0.2);
        }

        .image-frame img {
          width: 100%;
          display: block;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          filter: sepia(5%) contrast(1.05); /* Subtle traditional aging */
        }

        .zoom-hint {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(139, 107, 35, 0.9);
          color: white;
          font-size: 0.75rem;
          padding: 5px 10px;
          border-radius: 4px;
          pointer-events: none;
          font-family: 'Inter', sans-serif;
        }

        /* LIGHTBOX MODAL */
        .lightbox {
          position: fixed;
          top: 50%; left: 50%; transform:translate(-50%,-50%); width: 100%; height: 100%;
          background: rgba(18, 16, 11, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-out;
          padding: 20px;
        }

        .lightbox img {
          max-width: 95%;
          max-height: 95%;
          border: 8px solid #d4a34d;
          box-shadow: 0 0 50px rgba(0,0,0,0.8);
          image-rendering: auto;
        }

        /* TEXT COLUMN - LORA SERIF FONT */
        .column-right { 
          flex: 1; 
          font-family: 'Lora', serif;
        }

        .section-desc {
          font-size: 1.7rem;
          line-height: 1.4;
          color: #2d332a;
          margin-bottom: 35px;
          font-style: italic;
          padding-left: 20px;
          border-left: 5px solid #d4a34d;
          background: linear-gradient(90deg, #fdf4e3, transparent);
        }

        .point-item {
          font-size: 1rem;
          line-height: 1.8;
          color: #3e443a;
          position: relative;
          padding-left: 45px;
          margin-bottom: 25px;
          list-style: none;
        }

        .point-item::before {
          content: "❋";
          position: absolute;
          left: 0;
          color: #8b6b23;
          font-size: 1.5rem;
          top: -2px;
        }

        .row-reverse { flex-direction: row-reverse; }

        @media (max-width: 1100px) {
          .columns-container { flex-direction: column; gap: 40px; }
          .column-left { width: 100%; }
          .row-reverse { flex-direction: column; }
        }
      `}</style>

      {/* Lightbox Mode */}
      {activeImg && (
        <div className="lightbox" onClick={() => setActiveImg(null)}>
          <img src={activeImg} alt="Enlarged Diagram" />
        </div>
      )}
      <div className="journey-header">
        <h2 style={{ fontFamily: 'Cinzel Decorative, cursive', fontSize: '2.5rem', margin: 0 }}>
         The <span style={{ color: '#d4a34d' }}>DAMAGE JOURNEY</span>

        </h2>
        <p className="tagline-desc" data-aos="fade-up" data-aos-delay="200">
          Tracing the Path of Disconnection
        </p>
        </div>

      {sections.map((section, index) => (
        <div className="journey-section" key={section.id} data-aos="fade-up">
          <div className="section-header">
            <h2 className="title-line">{section.title}</h2>
          </div>

          <div className={`columns-container ${index % 2 !== 0 ? 'row-reverse' : ''}`}>
            <div className="column-left" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
              <div className="image-frame" onClick={() => setActiveImg(section.img)}>
                <img src={section.img} alt={section.title} />
                <div className="zoom-hint">Click to read text</div>
              </div>
            </div>

            <div className="column-right" data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}>
              <p className="section-desc">{section.desc}</p>
              <div className="points-list">
                {section.points.map((point, i) => (
                  <li key={i} className="point-item">{point}</li>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HealingProcess;
