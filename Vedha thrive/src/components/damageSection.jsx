import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSiteContent } from '../context/SiteContentContext';

const DamageSection = () => {
  const content = useSiteContent();
  const intro = content?.sections?.[0];
  const damage = content?.sections?.[1];
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <>
      <section className="damage-section" id="damage-awareness">
        <style>
          {`
            /* 1. GLOBAL FIX: Prevents AOS from causing side-scroll across the whole site */
            html, body {
              max-width: 100%;
              overflow-x: hidden;
            }

            .damage-section {
              padding: 60px 20px; /* Reduced padding for mobile */
              background-color: #fdfcf7;
              font-family: 'Inter', sans-serif;
              display: flex;
              justify-content: center;
              /* 2. SECTION FIX: Crops any children that try to animate from off-screen */
              overflow: hidden; 
              width: 100%;
              box-sizing: border-box;
            }

            .container-inner {
              max-width: 1200px;
              width: 100%;
              margin: 0 auto;
            }

            .header-text {
              text-align: center;
              margin-bottom: 40px; /* Reduced from 70px */
            }

            .header-text h2 {
              font-family:'Cinzel Decorative', cursive;
              font-size: clamp(1.8rem, 5vw, 2.5rem); /* Slightly smaller base for mobile */
              color: #2d332a;
              line-height: 1.2;
              max-width: 900px;
              margin: 0 auto;
            }

            .header-text h2 span {
              color: #d4a34d;
            }

            .content-grid {
              display: grid;
              grid-template-columns: 1.1fr 0.9fr;
              gap: 40px; /* Reduced gap from 80px */
              align-items: center;
              width: 100%;
            }

            .image-side {
              position: relative;
              border-radius: 20px; /* Smaller radius for mobile */
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              width: 100%;
            }

            .comparison-img {
              width: 100%;
              height: auto;
              display: block;
              transition: transform 1.5s ease;
            }

            .text-side {
              display: flex;
              flex-direction: column;
              gap: 30px; /* Reduced gap */
              width: 100%;
            }

            .timeline-block {
              position: relative;
              padding-left: 20px; /* Reduced from 30px */
              border-left: 2px solid #e5e7eb;
            }

            .timeline-block.past { border-left-color: #10b981; }
            .timeline-block.modern { border-left-color: #ef4444; }

            .timeline-label {
              font-size: 1.7rem;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              font-weight: 700;
              margin-bottom: 8px;
              display: block;
              color: #2d332a;
              font-style: italic;
            }

            .science-chain {
              background: #2d332a;
              padding: 20px; /* Reduced from 30px */
              border-radius: 15px;
              color: #fff;
              text-align: center;
              box-shadow: 0 10px 20px rgba(45, 51, 42, 0.2);
              width: 100%;
              box-sizing: border-box;
            }

            .chain-formula {
              font-family: 'Playfair Display', serif;
              font-size: 1rem; /* Smaller for mobile */
              display: flex;
              flex-wrap: wrap; /* Allows items to wrap on small screens */
              justify-content: center;
              align-items: center;
              gap: 8px;
              margin-bottom: 10px;
            }
            span.chain-title{
                  margin-bottom: 10px;
                  display: inline-block;
            }

            .chain-arrow { color: #d4a34d; font-weight: bold; }

            /* 3. RESPONSIVENESS FIX */
            @media (max-width: 1024px) {
              .content-grid { 
                grid-template-columns: 1fr; 
                gap: 40px; 
              }
              .image-side { 
                max-width: 600px; 
                margin: 0 auto; 
              }
              .damage-section {
                padding: 40px 15px;
              }
            }

            @media (max-width: 480px) {
              .chain-formula {
                flex-direction: column; /* Stacks the chain vertically on very small phones */
                gap: 5px;
              }
              .chain-arrow {
                transform: rotate(90deg); /* Points arrow down when stacked */
                margin: 5px 0;
              }
            }
          `}
        </style>

        <div className="container-inner">
          <div className="header-text" data-aos="fade-up">
            <h2>
              {intro?.title || "Our health did not change overnight."} <br />
              <span>{damage?.title || "It began from the soil."}</span>
            </h2>
          </div>

          <div className="content-grid">
            {/* LEFT SIDE: IMAGE */}
            <div className="image-side" data-aos="fade-right">
              <img
                src={intro?.image || "/subbanner.jpeg"}
                alt={intro?.title || "Past vs Modern Agriculture Illustration"}
                className="comparison-img"
              />
            </div>

            {/* RIGHT SIDE: CONTENT */}
            <div className="text-side">

              <div className="timeline-block past" data-aos="fade-left" data-aos-delay="200">
                <span className="timeline-label">Once upon a time</span>
                <div className="timeline-content">
                  <p>{intro?.description || "The soil was alive and thriving."}</p>
                </div>
              </div>

              <div className="timeline-block modern" data-aos="fade-left" data-aos-delay="400">
                <span className="timeline-label">After the 1960s</span>
                <div className="timeline-content">
                  <p>{damage?.description || "Chemical farming increased exponentially."}</p>
                </div>
              </div>

              <div className="science-chain" data-aos="zoom-in" data-aos-delay="600">
                <span className="chain-title">The Biological Chain</span>
                <div className="chain-formula">
                  <span>Soil Microbes</span>
                  <span className="chain-arrow">→</span>
                  <span>Plant Minerals</span>
                  <span className="chain-arrow">→</span>
                  <span>Human Nutrition</span>
                </div>
                <p className="chain-impact">
                  If this chain is disturbed, it can have a direct impact on human health.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DamageSection;
