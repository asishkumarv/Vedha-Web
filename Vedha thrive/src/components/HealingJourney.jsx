import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const HealingJourney = () => {
  const navigate = useNavigate();
  const { user, isSubscribed, refreshSubscription } = useAuth();
  const [journeys, setJourneys] = useState([
    { id: "soil", title: "Soil: The Rebirth of Vitality", img: "soil.png" },
    { id: "seed", title: "Seed: Reclaiming Life Force", img: "seed.jpeg" },
    { id: "food", title: "Food: Restoring Natural Strength", img: "Food.png" },
    { id: "kitchen", title: "Kitchen: Restoring the Temple", img: "kitchen.png" },
    { id: "home", title: "Home: Natural Environment", img: "Home.jpeg" },
    { id: "yoga", title: "Yoga: Achieving Systemic Equilibrium", img: "Yoga.png" },
    { id: "nature", title: "Nature: Realigning with the Earth", img: "Nature.jpeg" },
    { id: "rainwater", title: "Rain Water: Fulfilling Our Responsibility", img: "Rainwater.png" }
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    api.getHealingPages()
      .then((pages) => {
        setJourneys(pages.map((page) => ({
          id: page.slug,
          title: page.title,
          img: page.image || page.bannerImage,
        })));
      })
      .catch((error) => console.error("Failed to load healing journeys", error));
    refreshSubscription().catch(() => {});
  }, []);

  const handleCardClick = (id) => {
    if (isSubscribed) {
      // FIX: Now points correctly to healing-detail
      navigate(`/healing-detail/${id}`);
    } else {
      navigate(user ? '/subscription' : '/login');
    }
  };

  return (
    <section className="journey-section" id='healing-journey'>
      <style>{`
                .journey-section { padding: 0px 20px; background-color: #fdfcf7; }
                .journey-header { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto 40px;flex-direction:column;padding-top:2.5rem; }
                .subscribe-badge-btn { background-color: #d4a34d; color: white !important; padding: 10px 24px; border-radius: 50px; font-weight: 600; border: none; font-size: 0.9rem; transition: 0.3s ease; cursor: pointer; }
                .subscribe-badge-btn:hover { background-color: #b3893f; }
                .subscribed-status-btn { background-color: #2d332a; color: #d4a34d !important; padding: 10px 24px; border-radius: 50px; font-weight: 600; border: 1px solid #d4a34d; font-size: 0.9rem; cursor: default; display: flex; align-items: center; gap: 8px; }
                .journey-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; max-width: 1200px; margin: 0 auto;margin-bottom:2rem; }
                .journey-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #eee; position: relative; cursor: pointer; transition: 0.3s ease; }
                .journey-card:hover { transform: translateY(-8px); border-color: #d4a34d; }
                .img-container { position: relative; width: 100%; aspect-ratio: 16/11; overflow: hidden; display: flex; align-items: center; justify-content: center; }
                .img-container img { width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; }
                .lock-overlay { position: relative; background: rgba(255, 255, 255, 0.9); width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 10; color: #d4a34d; font-size: 1.4rem; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
                .journey-content { padding: 20px; text-align: left; }
                .tagline-desc{font-family: 'Inter', sans-serif;color: #2d332a;}
                .journey-content h3 { font-size: 1.1rem; color: #2d332a; margin: 0 0 8px 0; }
                .status-text { font-size: 0.85rem; font-weight: 600; color: #d4a34d; }
                @media (max-width: 768px) { .journey-header { flex-direction: column; gap: 15px; text-align: center; } }
            `}</style>

      <div className="journey-header">
        <h2 style={{ fontFamily: 'Cinzel Decorative, cursive', fontSize: '2.5rem', margin: 0 }}>
          Let's Start Our - <span style={{ color: '#d4a34d' }}>Healing Journey</span>

        </h2>
        <p className="tagline-desc" data-aos="fade-up" data-aos-delay="200">
          Tracing the Path of Disconnection
        </p>

        {/* <p>Returning to the Source, Restoring Balance</p> */}
        {isSubscribed ? (
          <div className="subscribed-status-btn"><i className="fa fa-check-circle"></i> Subscribed</div>
        ) : (
          <button onClick={() => navigate(user ? '/subscription' : '/login')} className="subscribe-badge-btn">Subscribe Now</button>
        )}
      </div>

      <div className="journey-grid">
        {journeys.map((item, i) => (
          <div key={i} className="journey-card" data-aos="fade-up" data-aos-delay={i * 100} onClick={() => handleCardClick(item.id)}>
            <div className="img-container">
              <img src={item.img} alt={item.title} />
              {!isSubscribed && (
                <div className="lock-overlay"><i className="fa fa-lock"></i></div>
              )}
            </div>
            <div className="journey-content">
              <h3>{item.title}</h3>
              <span className="status-text">{isSubscribed ? "WATCH NOW" : "LOCKED - ₹99"}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealingJourney;
