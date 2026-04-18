import React, { useEffect, useRef, useState } from 'react';
import './Dashboard.css';
import { fetchDashboardData } from '../services/dashboard.js';

function Dashboard() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {  
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError('');
        const dashboardData = await fetchDashboardData();
        setUsers(Array.isArray(dashboardData) ? dashboardData : []);
      } catch (err) {
        setUsers([]);
        setError('Unable to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRelation, setFilterRelation] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  // const scores = users.map(user => user.score);
  const scores = users
                      .map(user => user.maxScore)
                      .filter(score => typeof score === 'number' && !isNaN(score));
  const minScore = scores.length > 0 ? Math.min(...scores) : 0;
  const maxScore = scores.length > 0 ? Math.max(...scores) : 1000;
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
    setFilterScoreMin(minScore);
    setFilterScoreMax(maxScore);
  }, [minScore, maxScore]);

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

  const relations = [...new Set(users.map(user => user.relation).filter(Boolean))];
  const countries = [...new Set(users.map(user => user.country?.name).filter(Boolean))];

  const filteredUsers = users.filter(user => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const username = (user.username ?? '').toLowerCase();
    const email = (user.email ?? '').toLowerCase();
    const company = (user.company ?? '').toLowerCase();
    const countryName = user.country?.name ?? '';

    const matchesSearch = 
      username.includes(normalizedSearchTerm) || 
      email.includes(normalizedSearchTerm) ||
      company.includes(normalizedSearchTerm);
    
    const matchesRelation = filterRelation === '' || user.relation === filterRelation;
    const matchesCountry = filterCountry === '' || countryName === filterCountry;

    const userScore = user.maxScore ?? 0; 
    const matchesScoreRange = userScore >= filterScoreMin && userScore <= filterScoreMax;

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
          aValue = a.country?.name ?? '';
          bValue = b.country?.name ?? '';
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

  const dashboardStats = React.useMemo(() => {
    const totalUsers = users.length;

    const companyCounts = new Map();
    const countryCounts = new Map();
    const scoredUsers = [];

    users.forEach((user) => {
      const companyName = (user.company ?? '').trim();
      const countryName = (user.country?.name ?? '').trim();
      const score = Number(user.maxScore);

      if (companyName) {
        companyCounts.set(companyName, (companyCounts.get(companyName) ?? 0) + 1);
      }

      if (countryName) {
        countryCounts.set(countryName, (countryCounts.get(countryName) ?? 0) + 1);
      }

      if (Number.isFinite(score) && score > 0) {
        scoredUsers.push(score);
      }
    });

    const getTopEntry = (counts) => {
      let topName = 'N/A';
      let topCount = 0;

      counts.forEach((count, name) => {
        if (count > topCount) {
          topName = name;
          topCount = count;
        }
      });

      return { name: topName, count: topCount };
    };

    const getTopCountryEntry = () => {
      let topName = 'N/A';
      let topCount = 0;
      let topFlag = '';

      countryCounts.forEach((count, name) => {
        if (count > topCount) {
          topName = name;
          topCount = count;
        }
      });

      if (topCount > 0) {
        const topCountryUser = users.find((user) => (user.country?.name ?? '').trim() === topName);
        topFlag = topCountryUser?.country?.flag ?? '';
      }

      return { name: topName, count: topCount, flag: topFlag };
    };

    const topCompany = getTopEntry(companyCounts);
    const topCountry = getTopCountryEntry();
    const averageScore = scoredUsers.length > 0
      ? scoredUsers.reduce((sum, score) => sum + score, 0) / scoredUsers.length
      : null;

    return {
      totalUsers,
      topCompany,
      topCountry,
      averageScore,
      scoredUsersCount: scoredUsers.length,
    };
  }, [users]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Dashboard</h2>

        <div className="dashboard-stats" aria-label="Dashboard statistics">
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-label">Total users</span>
            <strong className="dashboard-stat-value">{dashboardStats.totalUsers}</strong>
          </article>

          <article className="dashboard-stat-card">
            <span className="dashboard-stat-label">Top Company</span>
            <strong className="dashboard-stat-value">{dashboardStats.topCompany.name}</strong>
            <span className="dashboard-stat-meta">{dashboardStats.topCompany.count} users</span>
          </article>

          <article className="dashboard-stat-card">
            <span className="dashboard-stat-label">Top Country</span>
            <strong className="dashboard-stat-value">
              <span className="dashboard-stat-country">
                {dashboardStats.topCountry.name}
                {dashboardStats.topCountry.flag ? (
                  <img
                    src={dashboardStats.topCountry.flag}
                    alt={dashboardStats.topCountry.name}
                    className="dashboard-stat-flag"
                  />
                ) : null}
              </span>
            </strong>
            <span className="dashboard-stat-meta">{dashboardStats.topCountry.count} users</span>
          </article>

          <article className="dashboard-stat-card dashboard-stat-card-accent">
            <span className="dashboard-stat-label">Average score</span>
            <strong className="dashboard-stat-value">
              {dashboardStats.averageScore !== null ? dashboardStats.averageScore.toFixed(1) : 'N/A'}
            </strong>
            <span className="dashboard-stat-meta">
              Among {dashboardStats.scoredUsersCount} users
            </span>
          </article>
        </div>

        {loading && <p>Loading dashboard data...</p>}
        {!loading && error && <p>{error}</p>}

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
              {!loading && !error && sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user.id} className="dashboard-row">
                    <td className="font-semibold">{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="country-info">
                        {user.country?.flag ? (
                          <img 
                            src={user.country.flag} 
                            alt={user.country?.name ?? 'Country'}
                            className="country-flag"
                          />
                        ) : null}
                        <span>{user.country?.name ?? 'N/A'}</span>
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
                    <td className="number-col font-mono">{user.gamesPlayed ?? 0}</td>
                    <td className="number-col font-mono text-blue font-bold">{user.maxScore ?? 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-message">
                    {loading ? 'Loading users...' : error ? 'Could not load users' : '0 users matching the filters'}
                  </td>
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