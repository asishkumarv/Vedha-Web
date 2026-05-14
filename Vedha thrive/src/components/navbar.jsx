import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to close the mobile menu automatically
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

          html {
            scroll-behavior: smooth !important;
          }

          section[id] {
            scroll-margin-top: 85px;
          }

          @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .site-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px; 
            background-color: #fdfcf7; 
            display: flex;
            align-items: center;
            z-index: 1000;
            font-family: 'Inter', sans-serif;
            border-bottom: 1px solid rgba(0,0,0,0.06);
            transition: all 0.3s ease;
            animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .header-inner {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 40px;
          }

          .logo-area img {
            // height: 48px; 
            width: 90px;
            display: block;
          }

          .nav-list {
            display: flex;
            list-style: none;
            gap: 28px;
            margin: 0;
            padding: 0;
            align-items: center;
          }

          .nav-link {
            position: relative;
            text-decoration: none;
            color: #3e443c; 
            font-size: 13.5px;
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 4px 0;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #d4a34d;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .nav-link:hover {
            color: #d4a34d;
          }

          /* Dashboard Button Styling */
          .dashboard-link {
            background-color: #d4a34d !important;
            color: #ffffff !important;
            padding: 10px 24px !important;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 600;
            border: none;
            box-shadow: 0 4px 12px rgba(212, 163, 77, 0.25);
            transition: all 0.3s ease !important;
          }

          .dashboard-link:hover {
            transform: translateY(-2px);
            background-color: #c2923c !important;
            box-shadow: 0 6px 15px rgba(212, 163, 77, 0.35);
          }

          .dashboard-link::after {
            display: none;
          }

          .mobile-btn {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            border: none;
            background: transparent;
          }

          .btn-line {
            width: 22px;
            height: 2px;
            background-color: #3e443c;
            transition: 0.3s;
          }

          @media (max-width: 1024px) {
            .mobile-btn { display: flex; }
            
            .nav-list {
              position: absolute;
              top: 70px;
              left: 0;
              width: 100%;
              flex-direction: column;
              background-color: #fdfcf7; 
              max-height: ${isOpen ? '600px' : '0'};
              overflow: hidden;
              transition: max-height 0.4s ease-in-out;
              box-shadow: 0 10px 15px rgba(0,0,0,0.05);
              align-items: flex-start;
              padding: 0; 
              gap: 0;
            }

            .nav-list li {
              width: 100%;
              display: block;
            }

            .nav-link {
              display: block;
              padding: 15px 30px; 
              border-bottom: 1px solid #f2f1eb; 
              width: 100%;
              text-align: left; 
              box-sizing: border-box;
              font-size: 14.5px;
            }

            .dashboard-link {
              display: inline-block !important;
              width: auto !important;
              margin: 20px 30px;
              padding: 10px 24px !important;
            }
          }
        `}
      </style>

      <header className="site-header">
        <div className="header-inner">
          <div className="logo-area">
            <HashLink smooth to="/#home" onClick={closeMenu}>
              <img src="/logo.png" alt="VedhaThrive" />
            </HashLink>
          </div>

          <nav>
            <ul className="nav-list">
              <li><HashLink smooth to="/#home" className="nav-link" onClick={closeMenu}>Home</HashLink></li>
              {/* <li><HashLink smooth to="/#healing-process" className="nav-link" onClick={closeMenu}>Healing Process</HashLink></li>
              <li><HashLink smooth to="/#healing-journey" className="nav-link" onClick={closeMenu}>Healing Journey</HashLink></li> */}
              {/* Updated to point to the correct ID on the subscription page */}
              <li><HashLink smooth to="/#subscribe" className="nav-link" onClick={closeMenu}>Subscribe</HashLink></li>
              <li><HashLink to="/dashboard" className="nav-link dashboard-link" onClick={closeMenu}>Dashboard</HashLink></li>
              {!user ? (
                <li><HashLink to="/login" className="nav-link" onClick={closeMenu}>Login</HashLink></li>
              ) : (
                <li><button className="nav-link" onClick={() => { logout(); closeMenu(); }} style={{ background: 'transparent', border: 0, cursor: 'pointer' }}>Logout</button></li>
              )}
            </ul>
          </nav>

          <button className="mobile-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            <span className="btn-line" style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }}></span>
            <span className="btn-line" style={{ opacity: isOpen ? 0 : 1 }}></span>
            <span className="btn-line" style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }}></span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
