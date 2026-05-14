import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { api } from '../lib/api';

const HealingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [remoteData, setRemoteData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
    
    api.getHealingPage(id)
      .then(setRemoteData)
      .catch((error) => console.error("Failed to load healing detail", error));

    api.getUserProgress()
      .then(progress => setIsCompleted(progress.includes(id)))
      .catch(() => {});
  }, [id]);

  const markComplete = async () => {
    try {
      await api.updateUserProgress(id);
      setIsCompleted(true);
    } catch (err) {
      console.error("Failed to mark as complete", err);
    }
  };

  const healingMap = {
    "soil": {
      title: "SOIL: The Rebirth of Vitality",
      image: "/soil.png",
      fullDesc: "Just as our health declined with the soil, its restoration begins there as well.",
      sections: [
        { label: "The Renaissance", text: "Today, a growing community of farmers is revitalizing the earth through natural, regenerative practices." },
        { label: "The Methods", text: "Cow-based organic farming, restoration of natural mineral equilibrium, and the total elimination of synthetic chemicals." },
        { label: "The Science", text: "Enhancing soil microbial life directly improves the nutritional density of the harvest." },
        { label: "Foundation", text: "Food grown in living soil is the ultimate foundation for human strength." }
      ]
    },
    "seed": {
      title: "SEED: Reclaiming Natural Life Force",
      image: "/seed.jpeg",
      fullDesc: "The seed is the origin of all vitality. When the seed remains natural, the food remains authentic.",
      sections: [
        { label: "The Renaissance", text: "We are witnessing a powerful movement to restore indigenous, 'Desi' seeds." },
        { label: "The Methods", text: "Cultivating local varieties that are naturally resilient and biologically compatible with our region." },
        { label: "The Science", text: "Genetic diversity in seeds ensures crop stability and a complex, varied nutrient profile." }
      ]
    },
    "food": {
      title: "FOOD: Restoring Natural Strength",
      image: "/Food.png",
      fullDesc: "True physical resilience is reclaimed through the consumption of unadulterated, living foods.",
      sections: [
        { label: "The Revival of Staples", text: "Reintroducing fermented and fiber-rich traditional meals such as Ganji, Ambali, Java, Ragi Mudda, and Sesame Laddus." },
        { label: "The Wealth of Indigenous Rice", text: "Rediscovering the medicinal properties of traditional grains like Bahurupi, Mysore Mallika, Kalabati, Navara, and Mapillai Samba." },
        { label: "Ancestral Wisdom", text: "Beyond the ingredients, we are reviving lost preparation methods—stone grinding, clay-pot storage, glass pickling, and natural overnight fermentation." },
        { label: "The Promise", text: "In this Healing Journey, we provide access to Verified Vendors who offer pesticide-free vegetables and naturally ripened fruits." }
      ]
    },
    "kitchen": {
      title: "KITCHEN: Restoring the Temple of Health",
      image: "/kitchen.png",
      fullDesc: "Your kitchen can once again become a sanctuary for wellness through intentional changes.",
      sections: [
        { label: "Restoration", text: "Reintroducing Brass (Kanchu), Bronze (Ethadi), and high-grade Steel cookware." },
        { label: "Practices", text: "Utilizing fresh, unrefined oils, adopting slow-cooking techniques, and eliminating plastic storage." },
        { label: "Maintenance", text: "Switching to mild, natural cleaning agents to prevent chemical residue." },
        { label: "Core Truth", text: "The method of preparation determines the value of the nutrition." }
      ]
    },
    "home": {
      title: "HOME: The Natural Living Environment",
      image: "/Home.jpeg",
      fullDesc: "Your home should be a silent partner in your healing process, supporting respiratory health and sleep rhythms.",
      sections: [
        { label: "Architectural Balance", text: "Ensuring optimal airflow, maximizing natural light, and reducing synthetic chemical exposure." },
        { label: "Air & Light", text: "Incorporating indoor plants and fresh ventilation." },
        { label: "Bedroom", text: "Utilizing cotton linens and optimizing the environment for natural sleep." },
        { label: "Sacred Spaces", text: "Using herbal incense and cow-dung based products to create a tranquil atmosphere." }
      ]
    },
    "yoga": {
      title: "YOGA: Achieving Systemic Equilibrium",
      image: "/Yoga.png",
      fullDesc: "Movement is the primary mechanism through which the body maintains itself.",
      sections: [
        { label: "The Practice", text: "Transitioning back to a lifestyle of daily movement, breathwork (Pranayama), and activities that stimulate circulation and perspiration." },
        { label: "The Goal", text: "Restoring the balance between the physical body and the mind to support the nervous system." }
      ]
    },
    "nature": {
      title: "NATURE: Realigning with the Earth",
      image: "/Nature.jpeg",
      fullDesc: "The human body reaches peak functionality when it is synchronized with the natural world.",
      sections: [
        { label: "The Realignment", text: "Prioritizing morning sunlight exposure, direct contact with the earth, and regular immersion in natural air." },
        { label: "The Science", text: "Nature exposure is critical for stress regulation and maintaining a healthy circadian rhythm." },
        { label: "Core Truth", text: "Nature is our most profound and accessible physician." }
      ]
    },
    "rainwater": {
      title: "RAIN WATER: Fulfilling Our Responsibility",
      image: "/Rainwater.png",
      fullDesc: "Healing includes our relationship with the planet. We must return what we have extracted.",
      sections: [
        { label: "The Commitment", text: "Implementing rainwater harvesting and groundwater recharge systems in our homes and communities." },
        { label: "The Impact", text: "Sustainable water management is a fundamental duty to ensure the continued vitality of the soil." }
      ]
    }
  };

  const data = remoteData || healingMap[id];
  if (!data) return null;

  return (
    <div className="detail-page-container">
      <style>{`
        .detail-page-container { 
          padding: 60px 20px; 
          background-color: #fdfcf7; 
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }
        .nav-header {
          max-width: 1200px;
          margin: 0 auto 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .back-btn {
          background-color: #2d332a;
          color: #d4a34d !important;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 600;
          border: 1px solid #d4a34d;
          font-size: 0.9rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          transition: 0.3s ease;
          margin-top:20px;  
        }
        .back-btn:hover { background-color: #3d443a; transform: translateX(-5px); }
        
        .detail-title {
          font-family: 'Cinzel Decorative', cursive;
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          color: #2d332a;
          text-align: center;
          margin: 0;
        }

        /* Side by Side Grid ditto to Journey Design */
        .detail-grid-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #eee;
          max-width: 1200px;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .detail-img-container {
          width: 100%;
          height: 100%;
          background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .detail-img-container img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* ensures text in images isn't cut */
        }

        .detail-content {
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .detail-intro-desc {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 1.25rem;
          color: #4b5563;
          line-height: 1.6;
          border-left: 4px solid #d4a34d;
          padding-left: 20px;
          margin-bottom: 35px;
        }
        .detail-section-item {
          margin-bottom: 25px;
          animation: fadeInRight 0.8s ease forwards;
        }
        .section-label {
          color: #d4a34d;
          font-weight: 800;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 5px;
        }
        .section-text {
          color: #2d332a;
          line-height: 1.7;
          font-size: 1.05rem;
          margin: 0;
        }
        .detail-footer-text {
          margin-top: 30px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #d4a34d;
          letter-spacing: 1px;
        }

        @media (max-width: 1024px) {
          .detail-grid-card { grid-template-columns: 1fr; }
          .detail-img-container { aspect-ratio: 16/11; }
          .detail-content { padding: 30px; }
        }
      `}</style>

      <div className="nav-header">
        <Link to="/" className="back-btn">
          <i className="fa fa-arrow-left"></i> BACK TO HEALING JOURNEY
        </Link>
        <h2 className="detail-title" data-aos="fade-down">
          {data.title.split(':')[0]}: <span style={{ color: '#d4a34d' }}>{data.title.split(':')[1]}</span>
        </h2>
      </div>

      <div className="detail-grid-card" data-aos="zoom-in">
        <div className="detail-img-container">
          <img src={data.image} alt={data.title} />
        </div>

        <div className="detail-content">
          <p className="detail-intro-desc" data-aos="fade-up">
            {data.fullDesc}
          </p>

          <div className="detail-sections-stack">
            {data.sections.map((sec, i) => (
              <div key={i} className="detail-section-item" data-aos="fade-left" data-aos-delay={i * 100}>
                <span className="section-label">{sec.label}</span>
                <p className="section-text">{sec.text}</p>
              </div>
            ))}
          </div>

          <div className="detail-footer-actions" style={{ marginTop: '40px' }}>
            {isCompleted ? (
              <div className="completed-badge" style={{ background: '#ecfdf5', color: '#059669', padding: '10px 20px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Completed
              </div>
            ) : (
              <button onClick={markComplete} className="complete-btn" style={{ background: '#d4a34d', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', transition: '0.3s' }}>
                Mark as Complete
              </button>
            )}
          </div>

          <div className="detail-footer-text" style={{ marginTop: '20px' }} data-aos="fade-up">
            🌿 VedhaThrive — Reclaiming the Balance
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealingDetail;
