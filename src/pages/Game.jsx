import React, { useState, useEffect } from 'react';
import './Game.css';
import GameIntro from '../components/GameIntro/GameIntro';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useAuth } from '../context/AuthContext';

function Game() {
  const { user } = useAuth(); // user?.username,
  const [introComplete, setIntroComplete] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);

  const BASE_URL = import.meta.env.VITE_GAME_URL;
  // AWS instace deploy 

  const { unityProvider, isLoaded, loadingProgression , sendMessage } = useUnityContext({
    loaderUrl:    `${BASE_URL}/CyberAttack.loader.js`,
    dataUrl:      `${BASE_URL}/CyberAttack.data`,
    frameworkUrl: `${BASE_URL}/CyberAttack.framework.js`,
    codeUrl:      `${BASE_URL}/CyberAttack.wasm`,
  });

    useEffect(() => {
    // Expón el callback ANTES de que Unity lo necesite
    window.onUnityUserIdReceived = (id) => {
      console.log("✅ Unity confirmó userId recibido:", id);
    };

    return () => {
      delete window.onUnityUserIdReceived;
    };
  }, []);

  useEffect(() => {
  if (isLoaded && user?.user_id) {
    // Dale un tick extra para que la escena esté lista
    const timer = setTimeout(() => {
      console.log("📤 Enviando userId:", parseInt(user.user_id));
      sendMessage("GameManager", "SetUserId", parseInt(user.user_id));
    }, 300);

    return () => clearTimeout(timer);
  }
  }, [isLoaded, user]);

  useEffect(() => {
    const checkOrientation = () => {
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
      {!isLandscape && (
        <div className="rotation-warning">
          <div className="rotation-content">
            <div className="rotation-icon">📱</div>
            <h2>Please, rotate your device</h2>
            <p>This game must be played in landscape mode</p>
            <div className="rotation-animation"><span>↻</span></div>
          </div>
        </div>
      )}

      <div className={`game-container ${!isLandscape ? 'hidden' : ''}`}>
        <div className="game-frame">

          {!introComplete && (
            <GameIntro onComplete={() => setIntroComplete(true)} />
          )}

          <div style={{ display: introComplete ? 'block' : 'none' }}>
            {!isLoaded && (
              <p>Loading... {Math.round(loadingProgression * 100)}%</p>
            )}
            <Unity
              unityProvider={unityProvider}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Game;