import React, { useEffect, useRef, useState } from 'react';
import './Dashboard.css';
import { fetchDashboardData } from '../services/dashboard.js';

function Dashboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {  
    const fetchDashboard = async () => {
      const dashboardData = await fetchDashboardData();
      setUsers(dashboardData);
    };

    fetchDashboard();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRelation, setFilterRelation] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const scores = users.map(user => user.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const [filterScoreMin, setFilterScoreMin] = useState(minScore);
  const [filterScoreMax, setFilterScoreMax] = useState(maxScore);
  const [showScoreFilter, setShowScoreFilter] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const scoreFilterWrapperRef = useRef(null);
  const scoreRange = maxScore - minScore || 1;
  const minThumbPosition = ((filterScoreMin - minScore) / scoreRange) * 100;
  const maxThumbPosition = ((filterScoreMax - minScore) / scoreRange) * 100;
  const isScoreFilterModified = filterScoreMin !== minScore || filterScoreMax !== maxScore;

  useEffect(() => {
    if (!showScoreFilter) {
      return undefined;
    }

    const closeWhenOutside = (event) => {
      if (!scoreFilterWrapperRef.current?.contains(event.target)) {
        setShowScoreFilter(false);
      }
    };

    document.addEventListener('pointerdown', closeWhenOutside);
    document.addEventListener('focusin', closeWhenOutside);

    return () => {
      document.removeEventListener('pointerdown', closeWhenOutside);
      document.removeEventListener('focusin', closeWhenOutside);
    };
  }, [showScoreFilter]);

  const handleMinScoreChange = (value) => {
    const nextMin = Number(value);
    if (filterScoreMin === filterScoreMax && nextMin > filterScoreMin) {
      setFilterScoreMax(nextMin);
      return;
    }
    setFilterScoreMin(Math.min(nextMin, filterScoreMax));
  };

  const handleMaxScoreChange = (value) => {
    const nextMax = Number(value);
    if (filterScoreMin === filterScoreMax && nextMax < filterScoreMax) {
      setFilterScoreMin(nextMax);
      return;
    }
    setFilterScoreMax(Math.max(nextMax, filterScoreMin));
  };

  const resetScoreFilter = () => {
    setFilterScoreMin(minScore);
    setFilterScoreMax(maxScore);
  };

  const relations = [...new Set(users.map(user => user.relation))];
  const countries = [...new Set(users.map(user => user.country.name))];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRelation = filterRelation === '' || user.relation === filterRelation;
    const matchesCountry = filterCountry === '' || user.country.name === filterCountry;
    const matchesScoreRange = user.score >= filterScoreMin && user.score <= filterScoreMax;

    return matchesSearch && matchesRelation && matchesCountry && matchesScoreRange;
  });

  // sort:
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = 'none';
        key = null;
      }
    }
    setSortConfig({ key, direction });
  };

  // icon
  const getSortIndicator = (key) =>{
    if (sortConfig.key !== key || sortConfig.direction === 'none'){
      return <span className="sort-indicator">↕</span>;
    }
    return (
      <span className="sort-indicator active">
        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
      </span>
    );
  };

  const sortedUsers = React.useMemo(() =>{
    let sortableUsers = [...filteredUsers];
    if (sortConfig.key !== null && sortConfig.direction !== 'none'){
      sortableUsers.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'country'){
          aValue = a.country.name;
          bValue = b.country.name;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Dashboard</h2>

        <div className="dashboard-filters">
          <input 
            type="text" 
            placeholder="Search for user, e-mail, company" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input search-input"
          />
          
          <select 
            value={filterRelation} 
            onChange={(e) => setFilterRelation(e.target.value)}
            className="filter-input"
          >
            <option value="">All relations</option>
            {relations.map(rel => (
              <option key={rel} value={rel}>{rel}</option>
            ))}
          </select>

          <select 
            value={filterCountry} 
            onChange={(e) => setFilterCountry(e.target.value)}
            className="filter-input"
          >
            <option value="">All countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <div ref={scoreFilterWrapperRef} className="score-filter-wrapper">
            <button
              type="button"
              className={`filter-input score-filter-toggle ${isScoreFilterModified ? 'score-filter-toggle-active' : ''}`}
              onClick={() => setShowScoreFilter(!showScoreFilter)}
            >
              {isScoreFilterModified ? `Score range: ${filterScoreMin} - ${filterScoreMax}` : 'All scores'}
            </button>

            {showScoreFilter && (
              <div className="score-range-panel">
                <div className="score-range-header">
                  <span className="score-range-label">Range: <strong>{filterScoreMin}</strong> - <strong>{filterScoreMax}</strong></span>
                  <button
                    type="button"
                    className="score-reset-button"
                    onClick={resetScoreFilter}
                  >
                    Reset
                  </button>
                </div>

                <div
                  className="score-dual-slider"
                  style={{
                    '--min-percent': `${minThumbPosition}%`,
                    '--max-percent': `${maxThumbPosition}%`
                  }}
                >
                  <div className="score-slider-track" />
                  <div className="score-slider-selected" />
                  <input
                    id="min-score-slider"
                    type="range"
                    min={minScore}
                    max={maxScore}
                    value={filterScoreMin}
                    onChange={(e) => handleMinScoreChange(e.target.value)}
                    className="score-slider score-slider-min"
                  />
                  <input
                    id="max-score-slider"
                    type="range"
                    min={minScore}
                    max={maxScore}
                    value={filterScoreMax}
                    onChange={(e) => handleMaxScoreChange(e.target.value)}
                    className="score-slider score-slider-max"
                  />
                </div>

                <div className="score-range-limits">
                  <span>{minScore}</span>
                  <span>{maxScore}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort('name')}>Name {getSortIndicator('name')}</th>
                <th className="sortable" onClick={() => handleSort('email')}>E-mail {getSortIndicator('email')}</th>
                <th className="sortable" onClick={() => handleSort('country')}>Country {getSortIndicator('country')}</th>
                <th className="sortable" onClick={() => handleSort('state')}>State {getSortIndicator('state')}</th>
                <th className="sortable" onClick={() => handleSort('relation')}>Relation to Rockwell {getSortIndicator('relation')}</th>
                <th className="sortable" onClick={() => handleSort('company')}>Company {getSortIndicator('company')}</th>
                <th className="number-col sortable" onClick={() => handleSort('gamesPlayed')}>Games Played {getSortIndicator('gamesPlayed')}</th>
                <th className="number-col sortable" onClick={() => handleSort('maxScore')}>Max Score {getSortIndicator('maxScore')}</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user.id} className="dashboard-row">
                    <td className="font-semibold">{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="country-info">
                        <img 
                          src={user.country.flag} 
                          alt={user.country.name}
                          className="country-flag"
                        />
                        <span>{user.country.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${user.state == true ? 'status-active' : 'status-inactive'}`}>
                        {user.state == true ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <span className="relation-badge">{user.relation}</span>
                    </td>
                    <td>{user.company}</td>
                    <td className="number-col font-mono">{user.gamesplayed}</td>
                    <td className="number-col font-mono text-blue font-bold">{user.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-message">0 users matching the filters</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;