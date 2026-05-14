import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// damageItems remains the same
const damageItems = [
  "Chemical Soil",
  "Modified Seeds",
  "Processed Food",
  "Adulteration",
  "Polluted Air & Water",
  "Stressful Living",
];

const PreloaderScreen = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Elegant, slow fade-in for the simple theme
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    setIsExiting(true);
    // Smooth transition into the home page
    setTimeout(onComplete, 1200);
  };

  return (
    <div style={{
       inset: 0, zIndex: 999999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    
      /* CHANGED: Subtle gradient background instead of solid black or image */
      background: 'linear-gradient(135deg, #fdfcf7 0%, #fff 100%)',
      backdropFilter: 'blur(25px)',
      transition: 'all 1s cubic-bezier(0.7, 0, 0.3, 1)',
      opacity: isExiting ? 0 : 1,
      transform: isExiting ? 'scale(1.05) translateY(-20px)' : 'scale(1)',
      filter: isExiting ? 'blur(15px)' : 'blur(0)',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Lora:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;700&display=swap');

        .ms-card {
          width: 100%; 
          height: 100vh; /* Premium Single View */
          // max-height: 850px;
          background-color: transparent; /* Changed to match body gradient */
          border: 1px solid #d4a34d;
          border-radius: 4px;
          position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,0.1); /* Lighter shadow for clean look */
          overflow: hidden;
          display: flex;
          background: rgba(255, 255, 255, 0.9); /* Glassmorphism effect */
          backdrop-filter: blur(5px);
        }

        /* Thinner, More Delicate Inner Frame */
        .ms-card::after {
          content: ""; position: absolute;
          top: 15px; left: 15px; right: 15px; bottom: 15px;
          border: 1px solid rgba(212,163,77,0.2);
          pointer-events: none; border-radius: 2px;
          z-index: 1;
        }

        .ms-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
          width: 100%;
          position: relative; 
          z-index: 2;
        }

        .ms-left, .ms-right {
          padding: 5vh 4vw; /* Balanced Padding */
          display: flex; 
          flex-direction: column; 
          justify-content: space-around; /* Distributes sections evenly */
          // height: 100%;
          overflow:hidden;
        }

        .ms-right {
          border-left: 1px solid rgba(212, 163, 77, 0.15);
          background: rgba(212, 163, 77, 0.015);
        }

        /* Typography */
        .ms-h1 {
          font-family: 'Cinzel Decorative', cursive;
          color: #8b6b23; 
          font-size: clamp(1.2rem, 3vh, 1.8rem);
          line-height: 1.2; margin: 0;
          text-transform: uppercase;
          text-align: center;
        }

        .ms-text {
          font-family: 'Lora', serif;
          font-size: clamp(0.9rem, 2vh, 1.1rem); 
          color: #2d332a;
          line-height: 1.5; margin: 0;
          text-align: center;
        }

        .ms-text-red {
          color: #b91c1c;
          font-family: 'Lora', serif;
          font-weight: 700;
          font-size: clamp(0.9rem, 2.2vh, 1.2rem);
          margin: 0;
        }

        /* Updated Boxes: Minimalist with subtle border */
        .ms-box {
          background: rgba(212,163,77,0.05);
          border: 1px solid rgba(212,163,77,0.15);
          padding: 2.5vh; 
          text-align: center;
          margin: 1.5vh 0;
        }

        .ms-truth-section {
          border: 2px double #d4a34d;
          padding: 2.5vh; 
          background: rgba(255, 255, 255, 0.3);
        }

        .ms-truth-grid {
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 1.5vh 2vw;
          margin-top: 1.5vh;
        }

        .ms-truth-item {
          display: flex; align-items: center;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.75rem, 1.8vh, 0.95rem); 
          font-weight: 700; color: #2d332a;
        }

        .ms-truth-item::before {
          content: "◈"; color: #d4a34d; margin-right: 10px;
        }

        .ms-quote-box {
          font-family: 'Cinzel Decorative', cursive;
          font-size: clamp(0.8rem, 2vh, 1rem); 
          color: #8b6b23;
          font-style: italic; 
          border-top: 1px solid rgba(212,163,77,0.2);
          border-bottom: 1px solid rgba(212,163,77,0.2);
          padding: 2vh 0; 
          text-align: center;
          line-height: 1.5;
          opacity: 0.9;
        }

        /* Updated Button: Modern, solid gold look */
        .ms-btn-vedha {
          background: #d4a34d; 
          color: #fff;
          border: 1px solid #b78a3c;
          padding: 18px 60px;
          font-family: 'Inter', sans-serif;
          font-weight: 700; 
          letter-spacing: 4px;
          text-transform: uppercase; 
          font-size: 0.8rem;
          cursor: pointer; 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: block; 
          margin: 10px auto 0;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        .ms-btn-vedha:hover {
          background: #8b6b23; 
          transform: translateY(-5px);
          letter-spacing: 6px;
          box-shadow: 0 15px 30px rgba(139, 107, 35, 0.3);
        }

        @media (max-width: 900px) {
          .ms-card { height: auto; min-height: 100vh; overflow-y: auto; }
          .ms-grid { grid-template-columns: 1fr; height: auto; }
          .ms-right { border-left: none; border-top: 1px solid rgba(212, 163, 77, 0.15); }
          .ms-left, .ms-right { padding: 40px 25px; gap: 40px; justify-content: flex-start; }
          .ms-btn-vedha { padding: 15px 40px; }
        }
      `}</style>

      <div className="ms-card" data-aos="zoom-in">
        <div className="ms-grid">
          
          {/* LEFT SIDE: The Hook */}
          <div className="ms-left">
            <div data-aos="fade-down">
              <h1 className="ms-h1">Do you want to change your health?</h1>
              <p className="ms-text" style={{fontStyle: 'italic', opacity: 0.8, marginTop: '5px'}}>Your home's health… your life's health?</p>
              
              <div style={{ marginTop: '2vh' }}>
                <p className="ms-text">❓ Why are diseases increasing every year?</p>
                <p className="ms-text">❓ Why are even children's bodies becoming "chemical bodies"?</p>
              </div>
            </div>

            <div className="ms-box" data-aos="zoom-in" data-aos-delay="200">
              <p className="ms-text-red" style={{marginBottom: '0.5vh'}}>🤔 REALIZATION</p>
              <p className="ms-text">In the last 75 years… what have we really lost?</p>
              <p className="ms-text" style={{fontWeight: 700, color: '#d4a34d', marginTop: '5px'}}>And… how do we get it back?</p>
            </div>

            <div className="ms-truth-section" data-aos="fade-up" data-aos-delay="400">
              <p className="ms-text-red" style={{textAlign: 'center', marginBottom: '1vh'}}>⚠️ DAMAGE TRUTH</p>
              <div className="ms-truth-grid">
                {damageItems.map(item => (
                  <div key={item} className="ms-truth-item">{item}</div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Path */}
          <div className="ms-right">
            <div data-aos="fade-down" data-aos-delay="600">
              <h2 className="ms-h1" style={{fontSize: 'clamp(1rem, 2.5vh, 1.4rem)'}}>And now… Even our bodies are changing</h2>
              <p className="ms-text-red" style={{ margin: '1.5vh 0' }}>
                Today, even children's bodies are becoming chemical bodies… Isn't this the time to think?
              </p>
              <p className="ms-text" style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                This didn't happen in a single day… Slowly, we moved away from natural living.
              </p>
              <p className="ms-text" style={{ fontWeight: 700, color: '#d4a34d', marginTop: '10px' }}>It's not too late… We can return again.</p>
            </div>

            <div className="ms-quote-box" data-aos="zoom-in" data-aos-delay="800">
              "JUST LIKE A FAMILY DOCTOR IS IMPORTANT… <br/> A FARMER IS EQUALLY IMPORTANT"
            </div>

            <div data-aos="fade-up" data-aos-delay="1000">
              <h3 className="ms-h1" style={{ textAlign: 'center', fontSize: '1.15rem' }}>Now is the time to change</h3>
              <p className="ms-text" style={{textAlign: 'center', fontSize: '0.9rem', marginBottom: '1vh'}}>For your health… For your family… For future generations…</p>
              
              <div className="ms-box" style={{margin: '1.5vh 0', padding: '15px'}}>
                <p className="ms-text" style={{margin: 0}}>We cannot change the last 75 years…</p>
                <p className="ms-text" style={{fontWeight: 800, color: '#8b6b23', fontSize: '1.15rem', marginTop: '5px'}}>But we can protect the next 75 years</p>
              </div>

              <button className="ms-btn-vedha" onClick={handleStart}>
                Let's Start Your Journey With VedhaThrive
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PreloaderScreen;