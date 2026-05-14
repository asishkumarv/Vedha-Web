import React from 'react';

const BrandMessage = () => {
  return (
    <section className="brand-message-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500&display=swap');

        .brand-message-wrapper {
          background-color: #fdfcf7; /* Matching the cream/off-white background */
          padding: 80px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .brand-logo-box {
          margin-bottom: 20px;
        }

        .brand-logo-box img {
          max-width: 150px; /* Adjust to fit your logo size */
          height: auto;
        }

        .horizontal-divider {
          width: 60px;
          height: 1px;
          background-color: #d4a34d; /* Your signature gold color */
          margin-bottom: 40px;
          opacity: 0.6;
        }

        .main-heading {
              font-family: 'Cinzel Decorative', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: #2d332a;
          margin: 0 0 15px 0;
          letter-spacing: -0.5px;
              color: #d4a34d;
        }

        .sub-heading {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          color: #888888;
          font-weight: 400;
          margin-bottom: 50px;
        }

        .bottom-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          text-transform: capitalize;
          color: #4b5563;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dot-separator {
          color: #d4a34d;
          font-size: 1.2rem;
          line-height: 0;
        }

        @media (max-width: 768px) {
          .brand-message-wrapper { padding: 40px 20px; }
          .bottom-tagline { 
            flex-direction: column; 
            gap: 8px; 
          }
          .dot-separator { display: none; }
        }
      `}</style>

      {/* 1. Logo Section */}
      <div className="brand-logo-box">
        <img 
          src="/logo.png" 
          alt="VedhaThrive Logo" 
        />
      </div>

      {/* 2. Thin Gold Divider */}
      <div className="horizontal-divider"></div>

      {/* 3. The Main Quote */}
      <h2 className="main-heading">Our health is in our hands.</h2>

      {/* 4. The Branding Line */}
      <p className="sub-heading">
        <i>VedhaThrive — Reminding you of the path we forgot.</i>
      </p>

      {/* 5. The Three Pillars Tagline */}
      <div className="bottom-tagline">
        <span>Revive Nature</span>
        <span className="dot-separator">•</span>
        <span>Restore Health</span>
        <span className="dot-separator">•</span>
        <span>Reconnect Life</span>
      </div>
    </section>
  );
};

export default BrandMessage;