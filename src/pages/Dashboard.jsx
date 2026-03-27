import React, { useState } from 'react';
import './Dashboard.css';

// mock data
const mockUsers = [
  {
    id: 1,
    name: 'Juan Rulfo',
    email: 'juan@example.com',
    country: { code: 'mx', name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
    relation: 'Client',
    company: 'Letras Corp',
    state: 'Active',
    gamesPlayed: 10,
    maxScore: 20
  },
  {
    id: 2,
    name: 'Gabriel García Márquez',
    email: 'gabo@example.com',
    country: { code: 'co', name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
    relation: 'Not related',
    company: 'Macondo Inc',
    state: 'Active',
    gamesPlayed: 12,
    maxScore: 19
  },
  {
    id: 3,
    name: 'Yoshihiro Togashi',
    email: 'togashi@example.com',
    country: { code: 'jp', name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
    relation: 'Employee',
    company: 'Rockwell Automation',
    state: 'Not active ',
    gamesPlayed: 15,
    maxScore: 19
  },
  {
    id: 4,
    name: 'Friedrich Nietzsche',
    email: 'friedrich@example.com',
    country: { code: 'de', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
    relation: 'Client',
    company: 'Zarathustra LLC',
    state: 'Active',
    gamesPlayed: 20,
    maxScore: 18
  },
  {
    id: 5,
    name: 'Victor Hugo',
    email: 'victor@example.com',
    country: { code: 'fr', name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
    relation: 'Client',
    company: 'Miserables Co',
    state: 'Active',
    gamesPlayed: 7,
    maxScore: 17
  },
  {
    id: 6,
    name: 'Machado de Assis',
    email: 'machado@example.com',
    country: { code: 'br', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
    relation: 'Employee',
    company: 'Rockwell Automation',
    state: 'Active',
    gamesPlayed: 8,
    maxScore: 15
  },
  {
    id: 7,
    name: 'Pablo Neruda',
    email: 'pablo@example.com',
    country: { code: 'cl', name: 'Chile', flag: 'https://flagcdn.com/w40/cl.png' },
    relation: 'Not related',
    company: 'Il Postino',
    state: 'Not active ',
    gamesPlayed: 9,
    maxScore: 15
  },
  {
    id: 8,
    name: 'Dante Alighieri',
    email: 'dante@example.com',
    country: { code: 'it', name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
    relation: 'Client',
    company: 'Inferno Ltd',
    state: 'Active',
    gamesPlayed: 14,
    maxScore: 13
  },
  {
    id: 9,
    name: 'Sun Tzu',
    email: 'sun@example.com',
    country: { code: 'cn', name: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
    relation: 'Employee',
    company: 'Rockwell Automation',
    state: 'Active',
    gamesPlayed: 22,
    maxScore: 12
  },
  {
    id: 10,
    name: 'Virginia Woolf',
    email: 'virginia@example.com',
    country: { code: 'gb', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
    relation: 'Client',
    company: 'Bloomsbury Group',
    state: 'Not active ',
    gamesPlayed: 3,
    maxScore: 12
  }
];

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRelation, setFilterRelation] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  const relations = [...new Set(mockUsers.map(user => user.relation))];
  const countries = [...new Set(mockUsers.map(user => user.country.name))];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRelation = filterRelation === '' || user.relation === filterRelation;
    const matchesCountry = filterCountry === '' || user.country.name === filterCountry;

    return matchesSearch && matchesRelation && matchesCountry;
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
                    <td className="font-semibold">{user.name}</td>
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
                      <span className={`status-badge ${user.state === 'Active' ? 'status-active' : 'status-inactive'}`}>
                        {user.state}
                      </span>
                    </td>
                    <td>
                      <span className="relation-badge">{user.relation}</span>
                    </td>
                    <td>{user.company}</td>
                    <td className="number-col font-mono">{user.gamesPlayed}</td>
                    <td className="number-col font-mono text-blue font-bold">{user.maxScore}</td>
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
