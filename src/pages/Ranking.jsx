import React, {useEffect,useState} from 'react';
import './Ranking.css';
import { getRanking } from '../services/ranking.js';


function Ranking() {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {  
    const fetchRanking = async () => {
      const ranking = await getRanking();
      setTopPlayers(ranking);
    };

    fetchRanking();
  }, []);

  return (
    
     <div className="ranking-container">
      <div className="ranking-content">
        <h2>Ranking</h2>

        <div className="ranking-table-container">
          <table className="ranking-table">
            <thead>
              <tr>
                <th className="position-col">#</th>
                <th className="country-col"></th>
                <th className="player-col">Player Name</th>
                <th className="date-col">Date</th>
                <th className="score-col">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player) => (
                <tr key={player.id} className={`ranking-row ${player.position <= 3 ? 'podium' : ''}`}>
                  <td className="position-cell">
                    <div className="position-wrapper">
                      <span className="position-number">{player.position}</span>
                    </div>
                  </td>
                  <td className="country-cell">
                    <div className="country-info">
                      <img 
                        src={player.country.flag} 
                        alt={player.country.name}
                        className="country-flag"
                      />
                      <span className="country-name">{player.country.name}</span>
                    </div>
                  </td>
                  <td className="player-cell">
                    <span className="player-name">{player.playername}</span>
                  </td>
                  <td className="date-cell">
                    <span className="game-date">{player.date ? new Date(player.date).toLocaleDateString() : '----'}</span>
                  </td>
                  <td className="score-cell">
                    <span className="total-score">{player.date ? player.score : ''}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Ranking;
