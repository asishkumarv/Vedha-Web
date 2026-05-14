import React, { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSiteContent } from '../context/SiteContentContext';

const Footer = () => {
  const content = useSiteContent();
  const footer = content?.footer;
  useEffect(() => {
    // Refresh AOS to catch the footer on different page lengths
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quad',
    });
  }, []);

  return (
    <footer  className="footer-section">
      <style>
        {`
          .footer-section {
            background-color: #1a2e1a;
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            
            /* THE FIX: Break out of any parent container */
            width: 100vw;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            
            padding: 80px 0 30px;
            box-sizing: border-box;
          }

          /* Prevent horizontal scroll caused by 100vw including scrollbar width */
          body {
            overflow-x: hidden;
          }

          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 60px;
          }

          .footer-brand h3 {
            font-family: 'Playfair Display', serif;
            color: #d4a34d;
            font-size: 1.8rem;
            margin-bottom: 15px;
          }

          .footer-brand p {
            font-size: 0.9rem;
            opacity: 0.7;
            line-height: 1.6;
          }

          .footer-col h4 {
            font-size: 1.1rem;
            margin-bottom: 25px;
            font-weight: 600;
            color: #d4a34d;
          }

          .footer-links {
            list-style: none;
            padding: 0;
          }

          .footer-links li {
            margin-bottom: 12px;
          }

          .footer-links a {
            color: #fff;
            text-decoration: none;
            opacity: 0.6;
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }

          .footer-links a:hover {
            opacity: 1;
            color: #d4a34d;
          }

          .footer-bottom-line {
            width: 100%;
            border-top: 1px solid rgba(255,255,255,0.1);
            margin-top: 80px;
          }

          .footer-bottom-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px 40px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            opacity: 0.5;
          }

          @media (max-width: 968px) {
            .footer-container { grid-template-columns: 1fr 1fr; }
            .footer-brand { grid-column: span 2; }
          }

          @media (max-width: 650px) {
            .footer-container { grid-template-columns: 1fr; padding: 0 20px; }
            .footer-brand { grid-column: span 1; }
            .footer-bottom-content { 
              flex-direction: column; 
              gap: 15px; 
              text-align: center;
              padding: 30px 20px 0;
            }
          }
        `}
      </style>

      <div className="footer-container">
        <div className="footer-brand" data-aos="fade-up">
          <h3>VedhaThrive</h3>
          <p>Revive Nature • Restore Health • Reconnect Life</p>
          <p style={{marginTop: '10px'}}>{footer?.footerText || "True healing begins with the soil. Join us on a journey to rediscover natural wellness through ancient wisdom."}</p>
        </div>

        <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><HashLink smooth to="/#healing-process">Healing Process</HashLink></li>
            <li><HashLink smooth to="/#healing-journey">Healing Journey</HashLink></li>
            <li><HashLink smooth to="/#subscribe-now">Membership</HashLink></li>
            <li><HashLink to="/dashboard">Dashboard</HashLink></li>
          </ul>
        </div>

        <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
          <h4>Contact Us</h4>
          <ul className="footer-links">
            <li><a href={`mailto:${footer?.email || "info@vedhathrive.com"}`}>{footer?.email || "info@vedhathrive.com"}</a></li>
            <li><span style={{opacity: 0.6}}>{footer?.address || "Anantapur, Andhra Pradesh"}</span></li>
            <li><span style={{opacity: 0.6}}>{footer?.phone || ""}</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-line">
        <div className="footer-bottom-content">
          <p>© 2026 VedhaThrive. All rights reserved.</p>
          <div style={{display: 'flex', gap: '20px'}}>
            <a href="#" style={{color: '#fff', textDecoration: 'none'}}>Privacy</a>
            <a href="#" style={{color: '#fff', textDecoration: 'none'}}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
