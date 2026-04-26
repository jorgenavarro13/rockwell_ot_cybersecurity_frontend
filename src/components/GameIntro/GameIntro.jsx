import React, { useState } from 'react';
import './GameIntro.css';
import { ship, malware, ransomware, backup, firewall, upgrade } from '../../assets/images';

const cards = [
  {
    id: 'powerups',
    title: 'POWERUPS',
    subtitle: 'Recover health and boost your stats',
    headerImage: backup,
    headerImageAlt: 'Your ship',
    items: [
      {
        tag: 'BACK UP',
        description:
          'Restores 1 unit of your ship’s health. In real OT environments, regular backups are crucial for recovery after an attack — they can be the difference between a minor setback and a catastrophic failure.',
        
      }
    ],
  },
  {
    id: 'powerups',
    title: 'POWERUPS',
    subtitle: 'Recover health and boost your stats',
    headerImage: upgrade,
    headerImageAlt: 'Your ship',
    items: [
      {
        tag: 'UPDATE',
        description:
          "Updates your ship speed and fire rate. Just like keeping OT systems updated with the latest patches and firmware is essential to defend against evolving cyber threats. If you get hit by ransomware bullets, your speed will drop, simulating the slowdown caused by an attack. Grab an update to recover and keep moving.",
      }
    ],
  },
  {
    id: 'powerups',
    title: 'POWERUPS',
    subtitle: 'Recover health and boost your stats',
    headerImage: firewall,
    headerImageAlt: 'Your ship',
    items: [
      {
        tag: 'FIREWALL',
        description:
          'Actives a last line of defense. In the real world, a strong firewall can protect OT networks from unauthorized access and attacks. Use this power-up strategically to survive intense enemy waves.',
      },
    ],
  },
  {
    id: 'enemies',
    title: 'ENEMIES',
    subtitle: 'Know your threats',
    headerImage: malware,
    headerImageAlt: 'Malware enemy',
    items: [
      {
        tag: 'MALWARE',
        description:
          'Malicious software designed to disrupt, damage, or gain unauthorized access to industrial control systems. Eliminate it before it reaches you.',
      },
    ],
  },
  {
    id: 'enemies',
    title: 'ENEMIES',
    subtitle: 'Know your threats',
    headerImage: ransomware,
    headerImageAlt: 'Ransomware enemy',
    items: [
      {
        tag: 'RANSOMWARE',
        description:
          'Encrypts critical operational data and demands payment for its release. A single hit can shut down entire facilities. Do not let it through.',
      },
    ],
  },
  {
    id: 'howto',
    title: 'HOW TO PLAY',
    subtitle: 'Survive and defend the grid',
    headerImage: ship,
    headerImageAlt: 'Your ship',
    items: [
      {
        tag: 'DODGE',
        description: 'Avoid enemy fire — taking a hit ends the game.',
      },
      {
        tag: 'SHOOT',
        description: 'Fire at enemies to destroy them and score points.',
      },
      {
        tag: 'COLLIDE',
        description:
          'You can also destroy enemies by flying directly into them. Use it wisely.',
      },
    ],
  },
];

function GameIntro({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = (index) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  };

  const handleNext = () => {
    if (current < cards.length - 1) {
      goTo(current + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (current > 0) goTo(current - 1);
  };

  const card = cards[current];
  const isLast = current === cards.length - 1;

  return (
    <div className="gi-overlay">
      <div className="gi-stars" />

      <div className="gi-wrapper">
        <div className="gi-header">
          <span className="gi-header-bracket">[</span>
          <span className="gi-header-text">CYBER-ATTACK </span>
          <span className="gi-header-bracket">]</span>
        </div>

        <div className="gi-card" key={animKey}>
          <div className="gi-card-title-row">
            <span className="gi-card-num">0{current + 1} / 0{cards.length}</span>
            <div>
              <h2 className="gi-card-title">{card.title}</h2>
              <p className="gi-card-subtitle">{card.subtitle}</p> 
            </div>
            {card.headerImage && (
                <img
                  className="gi-header-img"
                  src={card.headerImage}
                  alt={card.headerImageAlt}
                />
            )}
          </div>

          <div className="gi-items">
            {card.items.map((item) => (
              <div className="gi-item" key={item.tag}>
                <div className="gi-item-header">
                  <span className="gi-item-tag">[ {item.tag} ]</span>
                  {item.image && (
                    <img
                      className="gi-item-img"
                      src={item.image}
                      alt={item.imageAlt}
                    />
                  )}
                </div>
                <p className="gi-item-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="gi-footer">
          <div className="gi-progress">
            {cards.map((_, i) => (
              <span
                key={i}
                className={`gi-dot ${i === current ? 'gi-dot--active' : i < current ? 'gi-dot--done' : ''}`}
              />
            ))}
          </div>

          <div className="gi-nav">
            <button
              className="gi-btn gi-btn--back"
              onClick={handleBack}
              disabled={current === 0}
            >
              &lt; BACK
            </button>
            <button className="gi-btn gi-btn--next" onClick={handleNext}>
              {isLast ? 'START GAME' : 'NEXT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameIntro;
