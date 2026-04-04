import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import {malware,ransomware,ship, phishing, legacy} from '../assets/images.js';

const threats = [
  {
    icon: malware,
    title: 'Malware & Ransomware',
    description:
      'Attacks designed to halt industrial operations or demand ransom to resume critical services, causing massive financial and operational damage.',
  },
  {
    icon: phishing,
    title: 'Phishing & Social Engineering',
    description:
      'Employees remain the primary attack vector. Deceptive communications trick personnel into revealing credentials or executing malicious actions.',
  },
  {
    icon: ransomware,
    title: 'Insider Threats',
    description:
      'Personnel with legitimate access can cause intentional or accidental harm, making internal monitoring and access control essential.',
  },
  {
    icon: legacy,
    title: 'Legacy Systems',
    description:
      'Outdated hardware and software without modern security capabilities create exploitable vulnerabilities across the OT environment.',
  },
];

const stats = [
  { value: '68%', label: 'of OT organizations reported a security incident in the past year' },
  { value: '300%', label: 'increase in OT-targeted cyberattacks since 2020' },
  { value: '$4.5M', label: 'average cost of an industrial cybersecurity breach' },
  { value: '73%', label: 'of breaches exploited weak or stolen credentials' },
];

function Home({ isLoggedIn }) {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">OT Cybersecurity Awareness</div>
          <h1 className="hero-title">
            Defend the Grid.<br />Protect the Future.
          </h1>
          <p className="hero-subtitle">
            Industrial systems power our world — and they're under attack. Learn the essentials of
            Operational Technology security through an immersive game experience, developed in
            partnership with Rockwell Automation.
          </p>
          <div className="hero-actions">
            {isLoggedIn ? (
              <Link to="/game" className="btn-primary-gradient">
                <span className="btn-icon">🎮</span>
                Play Now
              </Link>
            ) : (
              <Link to="/register" className="btn-primary-gradient">
                <span className="btn-icon">🚀</span>
                Get Started
              </Link>
            )}
            <Link to="/ranking" className="btn-secondary-hero">
              View Rankings
            </Link>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="illustration-card">
            <div className="signal-ring ring-1" />
            <div className="signal-ring ring-2" />
            <div className="signal-ring ring-3" />
            <div className="illustration-icon"><img src={ship} alt="loading" /></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-inner">
          <span className="section-label">Our Mission</span>
          <h2 className="section-title">What is OT Security?</h2>
          <p className="section-body">
            <strong>Operational Technology (OT)</strong> refers to the hardware and software that
            monitors and controls physical processes in industries such as energy, manufacturing,
            transportation, and water treatment — including systems like PLCs, SCADA, and industrial
            sensors.
          </p>
          <p className="section-body">
            Unlike traditional IT security, OT security prioritizes <strong>availability and
            operational safety</strong> above all. A breach doesn't just expose data — it can shut
            down power grids, disrupt supply chains, or put lives at risk.
          </p>
          <p className="section-body">
            This platform was created to raise awareness about OT cybersecurity threats through an
            engaging, interactive experience. By playing our game, you'll understand real-world
            attack scenarios and the best practices that protect critical infrastructure.
          </p>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="threats-section">
        <div className="section-inner">
          <span className="section-label">Know Your Enemy</span>
          <h2 className="section-title">Top OT Security Threats</h2>
          <p className="section-body center">
            Understanding the threat landscape is the first step to building resilient industrial
            systems. These are the most critical risks facing OT environments today.
          </p>
          <div className="threats-grid">
            {threats.map((threat, i) => (
              <div className="threat-card" key={i}>
                <div className="threat-icon"><img src={threat.icon} alt="loading" /></div>
                <h3 className="threat-title">{threat.title}</h3>
                <p className="threat-description">{threat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cases-section">
        <div className="section-inner">
          <span className="section-label cases-label">Real-World Impact</span>
          <h2 className="section-title cases-title">When OT Security Fails</h2>
          <div className="cases-grid">
            <div className="case-card">
              <div className="case-year">2017</div>
              <h3 className="case-name">Triton / TRISIS Malware</h3>
              <p className="case-description">
                Attackers targeted Safety Instrumented Systems (SIS) in a petrochemical plant,
                attempting to disable safety controllers and potentially trigger a catastrophic
                physical incident. One of the most dangerous ICS attacks ever recorded.
              </p>
            </div>
            <div className="case-card">
              <div className="case-year">2021</div>
              <h3 className="case-name">Colonial Pipeline Ransomware</h3>
              <p className="case-description">
                A ransomware attack forced the shutdown of the largest fuel pipeline in the U.S.
                for days, causing fuel shortages across the East Coast and demonstrating how OT
                disruptions translate directly into societal impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to test your knowledge?</h2>
          <p className="cta-subtitle">
            Step into the role of an OT security engineer. Face real threats, make critical
            decisions, and protect industrial infrastructure — all inside our awareness game.
          </p>
          <div className="cta-actions">
            {isLoggedIn ? (
              <Link to="/game" className="btn-cta">
                Play the Game
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-cta">
                  Create Account &amp; Play
                </Link>
                <Link to="/login" className="btn-cta-outline">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
