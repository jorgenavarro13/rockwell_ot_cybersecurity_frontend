import React, { useState, useEffect } from 'react';
import './Game.css';

function Game() {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
        // to see if its horizontal:
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscapeMode);
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return (
    <div className="game-page">
      {/* rotation warning for portrait mode */}
      {!isLandscape && (
        <div className="rotation-warning">
          <div className="rotation-content">
            <div className="rotation-icon">📱</div>
            <h2>Please, rotate your device</h2>
            <p>This game must be played in landscape mode</p>
            <div className="rotation-animation">
              <span>↻</span>
            </div>
          </div>
        </div>
      )}

      <div className={`game-container ${!isLandscape ? 'hidden' : ''}`}>
        <div className="game-frame">
          <div className="unity-placeholder">
            <h2>Unity Game Loading...</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
