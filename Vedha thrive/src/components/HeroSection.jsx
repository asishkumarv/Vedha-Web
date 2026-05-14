import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

const HeroSection = () => {
  const leaves = Array.from({ length: 6 });
  const content = useSiteContent();
  const hero = content?.hero;

  return (
    <div className="hero-wrapper">
      <style>
        {`
          :root {
            --primary-gold: #d4a34d;
            --navbar-height: 80px; 
          }

          .hero-wrapper {
            width: 100%;
            position: relative;
            background: #ffffff;
            padding-top: 63px;
            overflow: hidden;
          }
            .hero-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden; /* This crops any "bleeding" pixels */
  padding-top: var(--navbar-height);
}

          .banner-container {
            width: 100%;
            position: relative;
            line-height: 0;
          }

          .responsive-banner-img {
            width: 100%;
            height: auto;
            display: block;
            /* Using object-fit: cover ensures the image fills the area 
               without stretching, even if the screen is very wide */
            object-fit: cover;
            min-height: 300px; /* Prevents image from becoming too small on mobile */
          }

          /* Floating Leaves Effect */
          .leaf {
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--primary-gold);
            opacity: 0;
            border-radius: 50% 0;
            animation: driftLeaf 12s infinite linear;
            z-index: 10;
            pointer-events: none;
          }

          @keyframes driftLeaf {
            0% { transform: translateY(100%) rotate(0deg); opacity: 0; }
            20% { opacity: 0.2; }
            80% { opacity: 0.2; }
            100% { transform: translateY(-400%) translateX(40px) rotate(360deg); opacity: 0; }
          }

          .leaf:nth-child(1) { left: 10%; bottom: 10%; animation-delay: 0s; }
          .leaf:nth-child(2) { left: 30%; bottom: 20%; animation-delay: 4s; }
          .leaf:nth-child(3) { left: 60%; bottom: 15%; animation-delay: 2s; }
          .leaf:nth-child(4) { left: 85%; bottom: 25%; animation-delay: 6s; }

          @media (max-width: 768px) {
            :root { --navbar-height: 60px; }
            .responsive-banner-img {
              min-height: 250px;
              /* Center the focus on the middle of the graphic for mobile */
              object-position: center; 
            }
          }
        `}
      </style>

      <div id="home">
        <div className="banner-container">
          <img
            src={hero?.bannerImage || "/newbanner.jpeg"}
            alt={hero?.title || "VedhaThrive banner"}
            className="responsive-banner-img"
          />

          <div className="leaves-container">
            {leaves.map((_, i) => (
              <div key={i} className="leaf"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
