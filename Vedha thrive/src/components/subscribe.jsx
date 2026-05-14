import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { api } from '../lib/api';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quad',
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.subscribeNewsletter(email);
      alert("Thank you for joining our journey!");
      setEmail('');
    } catch (error) {
      alert(error.message || "Unable to subscribe right now.");
    }
  };

  return (
    <section className="subscribe-section" id="subscribe">
      <style>
        {`
          .subscribe-section {
            padding: 80px 20px;
            background-color: #f9fbf7; /* Very light sage */
            text-align: center;
            font-family: 'Inter', sans-serif;
            position: relative;
            overflow: hidden;
          }

          .subscribe-container {
            max-width: 600px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .sub-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #b0b0b0;
            display: block;
            margin-bottom: 12px;
          }

          .subscribe-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.8rem, 4vw, 2.4rem);
            color: #2d332a;
            margin-bottom: 15px;
          }

          .subscribe-title span { color: #d4a34d; }

          .subscribe-desc {
            color: #6b7280;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 35px;
          }

          .subscribe-form {
            display: flex;
            gap: 10px;
            background: #fff;
            padding: 8px;
            border-radius: 50px;
            border: 1.5px solid #f2f2eb;
            box-shadow: 0 10px 25px rgba(0,0,0,0.03);
            transition: border-color 0.3s ease;
          }

          .subscribe-form:focus-within {
            border-color: #d4a34d;
          }

          .subscribe-input {
            flex: 1;
            border: none;
            padding: 12px 20px;
            border-radius: 50px;
            outline: none;
            font-size: 1rem;
            color: #2d332a;
          }

          .subscribe-btn {
            background-color: #2d332a;
            color: #fff;
            border: none;
            padding: 12px 30px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .subscribe-btn:hover {
            background-color: #d4a34d;
            transform: scale(1.02);
            box-shadow: 0 5px 15px rgba(212, 163, 77, 0.3);
          }

          /* Floating leaf decoration */
          .floating-leaf {
            position: absolute;
            font-size: 2rem;
            opacity: 0.1;
            animation: floatSlow 10s infinite ease-in-out;
          }

          @keyframes floatSlow {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(20px, -20px) rotate(15deg); }
          }

          @media (max-width: 600px) {
            .subscribe-form {
              flex-direction: column;
              background: transparent;
              padding: 0;
              border: none;
              box-shadow: none;
            }
            .subscribe-input {
              background: #fff;
              border: 1.5px solid #f2f2eb;
              margin-bottom: 10px;
            }
            .subscribe-btn { width: 100%; }
          }
        `}
      </style>

      {/* Background Decorations with fade-in */}
      <span 
        className="floating-leaf" 
        style={{ top: '10%', left: '10%' }}
        data-aos="fade-in"
      >
        🍃
      </span>
      <span 
        className="floating-leaf" 
        style={{ bottom: '15%', right: '12%' }}
        data-aos="fade-in"
        data-aos-delay="300"
      >
        🌿
      </span>

      <div className="subscribe-container" data-aos="fade-up">
        <span className="sub-label">Stay Connected</span>
        <h2 className="subscribe-title">Join the <span>Healing Journey</span></h2>
        <p className="subscribe-desc">
          Receive weekly insights on soil health, ancient Ayurveda, and natural living tips delivered to your inbox.
        </p>

        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            className="subscribe-input" 
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="subscribe-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
