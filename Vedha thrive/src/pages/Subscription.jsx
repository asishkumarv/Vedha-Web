import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../context/AuthContext';

const Subscription = () => {
  const { user, subscribe } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quad',
    });
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleSubscribe = async (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }
    await subscribe(plan);
    alert(`${plan} subscription activated.`);
    navigate('/dashboard');
  };

  return (
    <div className="subscription-page">
      <style>
        {`
          .subscription-page {
            background-color: #ffffff;
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
          }

          /* Dark Hero Header */
          .sub-hero-header {
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                        url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1500');
            background-size: cover;
            background-position: center;
            padding: 120px 20px 80px;
            text-align: center;
            color: white;
            position: relative;
          }

          .back-btn-top {
            position: absolute;
            top: 30px;
            left: 30px;
            color: white;
            text-decoration: none;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 8px;
            opacity: 0.8;
            transition: opacity 0.3s;
          }

          .back-btn-top:hover { opacity: 1; }

          .sub-hero-header h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.5rem, 6vw, 3.8rem);
            margin: 0 0 15px 0;
            font-weight: 500;
          }

          .sub-hero-header h1 span { color: #d4a34d; }

          .sub-hero-header p {
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
            opacity: 0.9;
            font-weight: 300;
          }

          /* Pricing Section */
          .pricing-section {
            padding: 80px 20px;
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            gap: 40px;
            flex-wrap: wrap;
          }

          .p-card {
            background: #fdfcf7;
            border-radius: 24px;
            padding: 50px 40px;
            flex: 1;
            min-width: 320px;
            max-width: 450px;
            border: 1px solid #f2f2eb;
            transition: all 0.4s ease;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          /* Premium Card Highlight */
          .p-card.premium {
            border: 1.5px solid #d4a34d;
            box-shadow: 0 20px 40px rgba(212, 163, 77, 0.1);
          }

          .popular-label {
            position: absolute;
            top: -14px;
            left: 50%;
            transform: translateX(-50%);
            background: #d4a34d;
            color: white;
            padding: 6px 20px;
            border-radius: 30px;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
          }

          .p-card h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.2rem;
            color: #2d332a;
            margin: 0 0 10px 0;
          }

          .p-price {
            font-size: 2.4rem;
            color: #d4a34d;
            font-weight: 600;
            margin-bottom: 30px;
            display: flex;
            align-items: baseline;
            gap: 8px;
          }

          .p-price span {
            font-size: 1rem;
            color: #8c8c8c;
            font-weight: 400;
          }

          .p-features {
            list-style: none;
            padding: 0;
            margin: 0 0 40px 0;
            flex-grow: 1;
          }

          .p-features li {
            margin-bottom: 16px;
            color: #555c52;
            font-size: 1rem;
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }

          .p-features li svg {
            color: #5a7046;
            margin-top: 4px;
            flex-shrink: 0;
          }

          .subscribe-btn {
            width: 100%;
            padding: 18px;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, background 0.3s;
          }

          .btn-basic { background: #5a7046; color: white; }
          .btn-premium { background: #d4a34d; color: white; }

          .subscribe-btn:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
          }

          @media (max-width: 768px) {
            .pricing-section { gap: 30px; padding: 40px 20px; }
            .p-card { padding: 40px 30px; }
          }
        `}
      </style>

      {/* Hero Header */}
      <header className="sub-hero-header">
        <Link to="/" className="back-btn-top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Journeys
        </Link>
        <h1 data-aos="fade-down">Unlock Your <span>Healing Journey</span></h1>
        <p data-aos="fade-up" data-aos-delay="200">
          Choose the path that resonates with your healing goals and begin your transformation today.
        </p>
      </header>

      {/* Pricing Section */}
      <main className="pricing-section">
        
        {/* Basic Plan */}
        <div className="p-card" data-aos="fade-right">
          <h2>Basic Plan</h2>
          <div className="p-price">
            ₹299 <span>per month</span>
          </div>
          <ul className="p-features">
            <li><CheckIcon /> Access to Healing Process content</li>
            <li><CheckIcon /> Monthly wellness newsletter</li>
            <li><CheckIcon /> Community forum access</li>
            <li><CheckIcon /> Basic health assessments</li>
          </ul>
          <button className="subscribe-btn btn-basic" onClick={() => handleSubscribe('Basic')}>Subscribe Now</button>
        </div>

        {/* Premium Plan */}
        <div className="p-card premium" data-aos="fade-left">
          <div className="popular-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            MOST POPULAR
          </div>
          <h2>Premium Plan</h2>
          <div className="p-price">
            ₹999 <span>per year</span>
          </div>
          <ul className="p-features">
            <li><CheckIcon /> <strong>Everything in Basic</strong></li>
            <li><CheckIcon /> Full Healing Journey access</li>
            <li><CheckIcon /> Personalized wellness plans</li>
            <li><CheckIcon /> Video consultations</li>
            <li><CheckIcon /> Ayurvedic recipe collection</li>
            <li><CheckIcon /> Priority support</li>
          </ul>
          <button className="subscribe-btn btn-premium" onClick={() => handleSubscribe('Premium')}>Subscribe Now</button>
        </div>

      </main>
    </div>
  );
};

// Helper Icon Component
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Subscription;
