import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import './Home.css'

const features = [
  {
    icon: '🧠',
    title: 'AI-Generated Curriculum',
    desc: 'Get personalized, day-by-day learning paths tailored to your goals. Our AI creates a structured curriculum that adapts to your pace.'
  },
  {
    icon: '📝',
    title: 'Smart Quizzes',
    desc: 'Test your knowledge with AI-generated quizzes. Get detailed analytics on your performance and identify weak areas to improve.'
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    desc: 'Visualize your learning journey with charts, XP tracking, leaderboards, and streak counters. Stay motivated every day.'
  },
  {
    icon: '🤖',
    title: 'Ask AI Tutor',
    desc: 'Stuck on a concept? Ask our AI tutor anything. Get instant, contextual explanations to keep your learning on track.'
  }
]

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your free account in seconds.' },
  { step: '02', title: 'Set Your Goal', desc: 'Tell us what you want to learn and how many days you have.' },
  { step: '03', title: 'Start Learning', desc: 'Follow your AI-generated curriculum, take quizzes, and track your progress.' }
]

const Home = () => {
  const nav = useNavigate()

  return (
    <div className="home-page">
      <Navbar landing={true} />

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <p className="home-overline">AI-Powered Learning Platform</p>
          <h1 className="home-hero-title">
            Achieve your career goals<br />with <span className="home-hero-highlight">NeuraLearn</span>
          </h1>
          <p className="home-hero-subtitle">
            Personalized curriculum, smart quizzes, real-time progress tracking, and an AI tutor — all in one platform designed to accelerate your learning.
          </p>
          <div className="home-hero-actions">
            <button className="home-cta-primary" onClick={() => nav('/login')}>
              Get Started — It's Free
            </button>
            <button className="home-cta-secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Learn More ↓
            </button>
          </div>
          <div className="home-hero-stats">
            <div className="home-stat">
              <span className="home-stat-value">500+</span>
              <span className="home-stat-label">Topics Available</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-value">AI</span>
              <span className="home-stat-label">Powered Learning</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-value">24/7</span>
              <span className="home-stat-label">AI Tutor Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-section" id="features">
        <div className="home-section-inner">
          <div className="home-section-header">
            <h2 className="home-section-title">Everything you need to learn smarter</h2>
            <p className="home-section-desc">NeuraLearn combines the power of AI with proven learning techniques to create a learning experience that's truly personalized.</p>
          </div>
          <div className="home-features-grid">
            {features.map((f, i) => (
              <div key={i} className="home-feature-card">
                <div className="home-feature-icon">{f.icon}</div>
                <h3 className="home-feature-title">{f.title}</h3>
                <p className="home-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="home-section home-how-section">
        <div className="home-section-inner">
          <div className="home-section-header">
            <h2 className="home-section-title">How it works</h2>
            <p className="home-section-desc">Get started in three simple steps.</p>
          </div>
          <div className="home-steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="home-step-card">
                <span className="home-step-number">{s.step}</span>
                <h3 className="home-step-title">{s.title}</h3>
                <p className="home-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-section home-cta-section">
        <div className="home-section-inner home-cta-inner">
          <h2 className="home-cta-title">Ready to start learning?</h2>
          <p className="home-cta-desc">Join NeuraLearn AI and get your personalized learning path today.</p>
          <button className="home-cta-primary" onClick={() => nav('/login')}>
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div>
            <span className="home-footer-logo">🧠 NeuraLearn AI</span>
            <p className="home-footer-copy">© 2026 NeuraLearn AI. All rights reserved.</p>
          </div>
          <div className="home-footer-right">
            <p>Contact: <a href="mailto:charanbandi18@gmail.com">charanbandi18@gmail.com</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
