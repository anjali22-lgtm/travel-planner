import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import beachImage from '../assets/beach.jpg';

function Home() {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${beachImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '80px 20px',
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h2 className="text-4xl font-bold mb-4">Welcome to Travel Planner 🌍</h2>
      <p className="text-lg mb-6">
        Plan your perfect trip with personalized travel guides, destination insights, and more!
      </p>

      {/* ✅ Wrap the button inside Link */}
      <Link to="/plan">
        <button className="bg-white text-blue-700 px-6 py-2 rounded shadow hover:bg-blue-100">
          Get Started
        </button>
      </Link>
    </div>
  );
}

export default Home;


