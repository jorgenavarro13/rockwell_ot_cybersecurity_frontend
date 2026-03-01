import React from 'react';
import './Ranking.css';

// mock:
const topPlayers = [
  {
    id: 1,
    position: 1,
    country: { code: 'mx', name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
    playerName: 'Juan Rulfo',
    date: '1917-05-16',
    totalScore: 20
  },
  {
    id: 2,
    position: 2,
    country: { code: 'co', name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
    playerName: 'Gabriel García Márquez',
    date: '1927-03-06',
    totalScore: 19
  },
  {
    id: 3,
    position: 3,
    country: { code: 'jp', name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
    playerName: 'Yoshihiro Togashi',
    date: '1966-04-27',
    totalScore: 19
  },
  {
    id: 4,
    position: 4,
    country: { code: 'de', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
    playerName: 'Friedrich Nietzsche',
    date: '1844-10-15',
    totalScore: 18
  },
  {
    id: 5,
    position: 5,
    country: { code: 'fr', name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
    playerName: 'Victor Hugo',
    date: '1802-02-26',
    totalScore: 17
  },
  {
    id: 6,
    position: 6,
    country: { code: 'br', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
    playerName: 'Machado de Assis',
    date: '1839-06-21',
    totalScore: 15
  },
  {
    id: 7,
    position: 7,
    country: { code: 'cl', name: 'Chile', flag: 'https://flagcdn.com/w40/cl.png' },
    playerName: 'Pablo Neruda',
    date: '1904-07-12',
    totalScore: 15
  },
  {
    id: 8,
    position: 8,
    country: { code: 'it', name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
    playerName: 'Dante Alighieri',
    date: '1265-09-14',
    totalScore: 13
  },
  {
    id: 9,
    position: 9,
    country: { code: 'cn', name: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
    playerName: 'Sun Tzu',
    date: '0544-02-26',
    totalScore: 12
  },
  {
    id: 10,
    position: 10,
    country: { code: 'gb', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
    playerName: 'Virginia Woolf',
    date: '1882-01-25',
    totalScore: 12
  }
];

function Ranking() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatScore = (score) => {
    return score.toLocaleString('pt-BR');
  };

  return (
    <div className="ranking-container">
      <div className="ranking-content">
        {/* estaba intentando hacer un header, pero no me parecia bonito */}
        {/* <header className="ranking-header">
          <h1>Ranking</h1>
          <p>Can you join the best players?</p>
        </header> */}
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
                    <span className="player-name">{player.playerName}</span>
                  </td>
                  <td className="date-cell">
                    <span className="game-date">{formatDate(player.date)}</span>
                  </td>
                  <td className="score-cell">
                    <span className="total-score">{formatScore(player.totalScore)}</span>
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
