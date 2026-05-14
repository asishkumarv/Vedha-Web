import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

const Dashboard = () => {
  const { user, subscription } = useAuth();
  const [guides, setGuides] = useState([]);
  const [completedSlugs, setCompletedSlugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = user?.name || "Guest User"; 
  const userPlan = subscription?.plan ? `${subscription.plan} Plan` : "Free Plan";
  const isPremium = subscription?.plan?.toLowerCase() === 'premium';
  const isBasic = subscription?.plan?.toLowerCase() === 'basic';

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out' });
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const [guidesData, progressData] = await Promise.all([
          api.getHealingPages(),
          api.getUserProgress().catch(() => [])
        ]);
        setGuides(guidesData);
        setCompletedSlugs(progressData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalGuides = guides.length;
  const completedCount = completedSlugs.length;
  const progressPercent = totalGuides > 0 ? (completedCount / totalGuides) * 100 : 0;

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p>Loading your healing journey...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <style>
        {`
          .dashboard-container {
            background-color: #fdfcf7;
            min-height: 100vh;
            padding: 100px 20px 60px; /* Space for fixed header */
            font-family: 'Inter', sans-serif;
          }

          .dashboard-wrapper {
            max-width: 1100px;
            margin: 0 auto;
          }

          .welcome-header {
            margin-bottom: 40px;
          }

          .welcome-header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            color: #2d332a;
            margin: 0;
          }

          .welcome-header p {
            color: #6b7280;
            margin-top: 5px;
          }

          /* Stats Grid */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
            margin-bottom: 60px;
          }

          .stat-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 32px;
            border: 1px solid #f0f0e8;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.03);
            transition: transform 0.3s ease;
          }

          .stat-card:hover {
            transform: translateY(-5px);
          }

          /* Profile Section */
          .profile-card {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .profile-top {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
          }

          .avatar-circle {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #5a7046 0%, #3d5a2b 100%);
            border-radius: 16px; /* Modern squircle */
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 8px 16px rgba(90, 112, 70, 0.2);
          }

          .user-meta h2 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0;
          }

          .user-meta span {
            font-size: 0.85rem;
            color: #d4a34d;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .upgrade-btn {
            display: block;
            width: 100%;
            padding: 14px;
            background-color: #d4a34d;
            color: white !important;
            text-align: center;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(212, 163, 77, 0.3);
            margin-top: auto;
          }

          .upgrade-btn:hover {
            background-color: #c2923c;
            box-shadow: 0 6px 16px rgba(212, 163, 77, 0.4);
          }

          /* Progress Stat */
          .progress-container {
            margin-top: 15px;
            background: #f3f4f1;
            height: 8px;
            border-radius: 10px;
            overflow: hidden;
          }

          .progress-bar {
            background: #5a7046;
            height: 100%;
            border-radius: 10px;
          }

          .stat-label {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }

          .stat-label p {
            font-size: 0.85rem;
            color: #6b7280;
            font-weight: 500;
          }

          .stat-label h3 {
            font-size: 1.75rem;
            color: #2d332a;
            margin: 0;
          }

          /* Section Title */
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }

          .section-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            color: #2d332a;
          }

          /* Guide Cards */
          .guides-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
          }

          .guide-item {
            background: #ffffff;
            border-radius: 20px;
            padding: 24px;
            border: 1px solid #f0f0e8;
            display: flex;
            align-items: center;
            gap: 16px;
            transition: all 0.3s ease;
            text-decoration: none;
          }

          .guide-item:hover {
            border-color: #d4a34d;
            box-shadow: 0 12px 24px rgba(0,0,0,0.04);
          }

          .icon-box {
            width: 48px;
            height: 48px;
            background: #f7f8f2;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #5a7046;
          }

          .guide-content h4 {
            font-size: 1rem;
            color: #2d332a;
            margin: 0;
            font-weight: 600;
          }

          .status-badge {
            display: inline-block;
            margin-top: 6px;
            font-size: 0.75rem;
            padding: 2px 8px;
            border-radius: 6px;
            font-weight: 500;
          }

          .status-completed { background: #ecfdf5; color: #059669; }
          .status-progress { background: #fffbeb; color: #d97706; }
          .status-notstart { background: #f3f4f6; color: #6b7280; }

          @media (max-width: 640px) {
            .dashboard-container { padding-top: 80px; }
            .welcome-header h1 { font-size: 2rem; }
            .stats-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>

      <div className="dashboard-wrapper">
        <header className="welcome-header" data-aos="fade-right">
          <h1>Welcome back, {userName.split(' ')[0]}!</h1>
          <p>Here is an overview of your healing progress.</p>
        </header>

        <div className="stats-grid">
          {/* Profile & Plan Card */}
          <div className="stat-card profile-card" data-aos="fade-up">
            <div className="profile-top">
              <div className="avatar-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div className="user-meta">
                <h2>{userName}</h2>
                <span>{userPlan}</span>
              </div>
            </div>
            {!isPremium && (
              <Link to="/subscription" className="upgrade-btn">
                {isBasic ? 'Upgrade to Premium' : 'Upgrade to Subscribe'}
              </Link>
            )}
          </div>

          {/* Guides Stats Card */}
          <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
            <div className="stat-label">
              <p>Guides Completed</p>
              <h3>{completedCount}/{totalGuides}</h3>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#8c8c8c', marginTop: '12px' }}>
              {progressPercent === 100 ? "You've finished all guides!" : `Keep going! ${totalGuides - completedCount} more to reach 100%.`}
            </p>
          </div>

          {/* Subscription Card */}
          <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-label">
              <p>Current Status</p>
              <h3>{subscription?.status || "Free tier"}</h3>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>Account is Active</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#8c8c8c', marginTop: '12px' }}>
              {subscription?.endDate ? `Plan valid until ${subscription.endDate}` : "Create an account and subscribe to unlock all journeys"}
            </p>
          </div>
        </div>

        <div className="section-header" data-aos="fade-up">
          <h2>Your Accessible Guides</h2>
        </div>

        <div className="guides-grid">
          {guides.map((guide) => {
            const isCompleted = completedSlugs.includes(guide.slug);
            return (
              <GuideLink 
                key={guide.slug}
                slug={guide.slug}
                title={guide.name} 
                image={guide.image || guide.bannerImage}
                status={isCompleted ? "Completed" : "Available"} 
                statusClass={isCompleted ? "status-completed" : "status-progress"}
                icon={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const GuideLink = ({ title, status, icon, image, statusClass, slug }) => (
  <Link to={`/healing-detail/${slug}`} className="guide-item" data-aos="fade-up">
    <div className="icon-box" style={{ overflow: 'hidden', padding: 0 }}>
      {image ? (
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      )}
    </div>
    <div className="guide-content">
      <h4>{title}</h4>
      <span className={`status-badge ${statusClass}`}>{status}</span>
    </div>
  </Link>
);

export default Dashboard;
