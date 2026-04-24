import React, { useState } from 'react';
import './GameIntro.css';
import { ship, malware, ransomware } from '../../assets/images';

const cards = [
  {
    id: 'powerups',
    title: 'POWERUPS',
    subtitle: 'Collect these to gain an edge',
    headerImage: ship,
    headerImageAlt: 'Your ship',
    items: [
      {
        tag: 'SHIELD',
        description:
          'Deploys a barrier at the bottom of the screen. Any enemy that touches it is destroyed — protecting you instead of triggering game over.',
      },
      {
        tag: 'SPEED BOOST',
        description:
          "Increases your ship's movement speed, letting you dodge enemy fire and reposition faster.",
      },
      {
        tag: 'RAPID FIRE',
        description:
          'Boosts your fire rate beyond the default, letting you unleash a faster stream of shots.',
      },
    ],
  },
  {
    id: 'enemies',
    title: 'ENEMIES',
    subtitle: 'Know your threats',
    items: [
      {
        tag: 'MALWARE',
        image: malware,
        imageAlt: 'Malware enemy',
        description:
          'Malicious software designed to disrupt, damage, or gain unauthorized access to industrial control systems. Eliminate it before it reaches you.',
      },
      {
        tag: 'RANSOMWARE',
        image: ransomware,
        imageAlt: 'Ransomware enemy',
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
            <h2 className="gi-card-title">{card.title}</h2>
            {card.headerImage && (
              <img
                className="gi-header-img"
                src={card.headerImage}
                alt={card.headerImageAlt}
              />
            )}
          </div>
          <p className="gi-card-subtitle">{card.subtitle}</p>

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
