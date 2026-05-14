import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Philosophy = () => {
  useEffect(() => {
    // Initializing AOS for the scroll reveal animations
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quad',
    });
  }, []);

  return (
    <section className="philosophy-section">
      <style>
        {`
          .philosophy-section {
            position: relative;
            padding: 120px 20px;
            /* Updated background with your new image */
            /* The gradient is slightly darker at the bottom to ground the text */
            background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), 
                              url('/philosophy.jpeg'); 
            background-size: cover;
            background-position: center;
            background-attachment: fixed; /* Parallax effect */
            color: #fff;
            text-align: center;
            font-family: 'Inter', sans-serif;
            overflow: hidden;
          }

          .philosophy-inner {
            max-width: 900px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .philosophy-title {
            font-family: 'Cinzel Decorative', serif;
            font-size: clamp(2.5rem, 6vw, 3.5rem);
            color: #d4a34d;
            margin-bottom: 30px;
            letter-spacing: 1px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }

          .philosophy-text {
            font-size: clamp(1.1rem, 3vw, 1.4rem);
            line-height: 1.8;
            font-weight: 400;
            margin-bottom: 50px;
            /* Using a glassmorphism effect to make text pop against the detailed image */
            background: rgba(0, 0, 0, 0.2);
            padding: 30px;
            border-radius: 20px;
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          /* Floating Icons Styling */
          .accent-icons {
            display: flex;
            justify-content: center;
            gap: 40px;
            font-size: 2.2rem;
          }

          .accent-icons span {
            display: inline-block;
            filter: drop-shadow(0 0 15px rgba(212, 163, 77, 0.5));
          }

          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          .accent-icons span:nth-child(1) { animation: float 6s ease-in-out infinite; }
          .accent-icons span:nth-child(2) { animation: float 7s ease-in-out infinite; animation-delay: 1s; }
          .accent-icons span:nth-child(3) { animation: float 5.5s ease-in-out infinite; animation-delay: 0.5s; }
          .accent-icons span:nth-child(4) { animation: float 8s ease-in-out infinite; animation-delay: 1.5s; }

          @media (max-width: 768px) {
            .philosophy-section { 
                padding: 80px 20px; 
                background-attachment: scroll; /* Disabling parallax on mobile for performance */
            }
            .philosophy-text { padding: 20px; }
            .accent-icons { gap: 20px; font-size: 1.8rem; }
          }
        `}
      </style>

      <div className="philosophy-inner">
        <h2 className="philosophy-title" data-aos="fade-down">
          Our Philosophy
        </h2>
        
        <div className="philosophy-text" data-aos="zoom-in" data-aos-delay="200">
          <p>
            At VedhaThrive, we believe that true healing begins when the soil beneath our feet, 
            nature, and the earth we nurture are restored. When we restore the earth, we restore ourselves.
          </p>
        </div>

        <div className="accent-icons">
          <span data-aos="fade-up" data-aos-delay="400">🌿</span>
          <span data-aos="fade-up" data-aos-delay="500">🌱</span>
          <span data-aos="fade-up" data-aos-delay="600">🦋</span>
          <span data-aos="fade-up" data-aos-delay="700">🍃</span>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;