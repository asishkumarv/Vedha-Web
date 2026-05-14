import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../context/AuthContext';
import { useSiteContent } from '../context/SiteContentContext';

const HealingJourney = () => {
  const navigate = useNavigate();
  const { user, isSubscribed, refreshSubscription } = useAuth();
  const { cards } = useSiteContent();
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    refreshSubscription().catch(() => {});
  }, []);

  const SLUG_MAP = {
    "c1": "soil",
    "c2": "seed",
    "c3": "food",
    "c4": "kitchen",
    "c5": "home",
    "c6": "yoga",
    "c7": "nature",
    "c8": "rainwater",
  };

  const handleCardClick = (id) => {
    const slug = SLUG_MAP[id] || id;
    if (isSubscribed) {
      navigate(`/healing-detail/${slug}`);
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
                
                /* Modal Styling */
                .card-modal-overlay {
                  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                  background: rgba(0,0,0,0.8); z-index: 10000;
                  display: flex; align-items: center; justify-content: center; padding: 20px;
                  backdrop-filter: blur(5px);
                }
                .card-modal {
                  background: #fdfcf7; max-width: 600px; width: 100%; border-radius: 24px;
                  overflow: hidden; border: 1px solid #d4a34d; position: relative;
                }
                .modal-close {
                  position: absolute; top: 15px; right: 15px; width: 32px; height: 32px;
                  background: #2d332a; color: #d4a34d; border-radius: 50%;
                  display: flex; align-items: center; justify-content: center; cursor: pointer;
                  font-size: 1.2rem; border: none; z-index: 2;
                }
                .modal-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
                .modal-body { padding: 30px; }
                .modal-body h3 { font-family: 'Cinzel Decorative', cursive; color: #2d332a; font-size: 1.5rem; margin-bottom: 10px; }
                .modal-body p { color: #4b5563; line-height: 1.6; margin-bottom: 25px; }
                .modal-action { 
                  display: block; width: 100%; padding: 14px; background: #d4a34d; 
                  color: white !important; border-radius: 12px; text-align: center; 
                  font-weight: 700; text-decoration: none; border: none; cursor: pointer;
                }

                @media (max-width: 768px) { .journey-header { flex-direction: column; gap: 15px; text-align: center; } }
            `}</style>

      {activeCard && (
        <div className="card-modal-overlay" onClick={() => setActiveCard(null)}>
          <div className="card-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCard(null)}>&times;</button>
            <img src={activeCard.image} alt={activeCard.title} className="modal-img" />
            <div className="modal-body">
              <h3>{activeCard.title}</h3>
              <p>{activeCard.description}</p>
              <button className="modal-action" onClick={() => { handleCardClick(activeCard.id); setActiveCard(null); }}>
                {isSubscribed ? "Access Now" : "Unlock Journey"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="journey-header">
        <h2 style={{ fontFamily: 'Cinzel Decorative, cursive', fontSize: '2.5rem', margin: 0 }}>
          Let's Start Our - <span style={{ color: '#d4a34d' }}>Healing Journey</span>
        </h2>
        <p className="tagline-desc" data-aos="fade-up" data-aos-delay="200">
          Tracing the Path of Disconnection
        </p>

        {isSubscribed ? (
          <div className="subscribed-status-btn"><i className="fa fa-check-circle"></i> Subscribed</div>
        ) : (
          <button onClick={() => navigate(user ? '/subscription' : '/login')} className="subscribe-badge-btn">Subscribe Now</button>
        )}
      </div>

      <div className="journey-grid">
        {cards.map((item, i) => (
          <div key={item.id} className="journey-card" data-aos="fade-up" data-aos-delay={i * 100}>
            <div className="img-container" onClick={() => setActiveCard(item)}>
              <img src={item.image} alt={item.title} />
              {!isSubscribed && (
                <div className="lock-overlay"><i className="fa fa-lock"></i></div>
              )}
            </div>
            <div className="journey-content" onClick={() => handleCardClick(item.id)}>
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
