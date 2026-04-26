import React, { useEffect, useState, useMemo } from 'react';
import './User.css';
import { useAuth } from '../context/AuthContext.jsx';
import { getUserProfile, getUserGameHistory } from '../services/user.js';
// , getUserGameHistory 
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

function User() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);

      const fetchProfile = async () => {
        console.log("📥 Fetching profile for userId:", user.user_id);
        const res = await getUserProfile(user.user_id);
        setProfile(res);
      }
    
      await fetchProfile();
      
       const historyRes = async () => {
         const history = await getUserGameHistory(user.user_id);
         setGameHistory(history);
       };

      await historyRes();
      setLoading(false);
    };

    load();
  }, [user]);

  // games played from user info
  const gamesPlayed = profile?.gamesplayed ?? 0;

  const maxScore = useMemo(
    () => (gameHistory.length > 0 ? Math.max(...gameHistory.map((g) => g.score)) : 0),
    [gameHistory]
  );

  const chartData = useMemo(
    () =>
      gameHistory.map((entry, index) => ({
        game: index + 1,
        date: entry.date
          ? new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : `Game ${index + 1}`,
        score: entry.score,
      })),
    [gameHistory]
  );

  if (!user) return null;

  return (
    <div className="user-container">
      <div className="user-content">
        <h2 className="user-title">My Profile</h2>

        {loading ? (
          <p className="user-loading">Loading profile...</p>
        ) : (
          <>
            {/* Profile Card */}
            <section className="user-profile-card">
              <div className="user-avatar" aria-hidden="true">
                {profile.name?.charAt(0).toUpperCase()}
              </div>

              <div className="user-profile-info">
                <h3 className="user-profile-name">
                  {profile?.name ?? user.name}
                </h3>
                <p className="user-profile-username">@{profile?.name}</p>
                <p className="user-profile-email">{user.email}</p>

                {profile?.country && (
                  <div className="user-profile-country">
                    {profile.country.flag && (
                      <img
                        src={profile.country.flag}
                        alt={profile.country.name}
                        className="user-profile-flag"
                      />
                    )}
                    <span>{profile.country.name}</span>
                  </div>
                )}

                <div className="user-profile-meta-grid">
                  <span className="user-meta-label">Company</span>
                  <span className="user-meta-value">
                    {profile?.company || 'N/A'}
                  </span>

                  <span className="user-meta-label">Status</span>
                  <span className="user-meta-value">
                    { profile?.is_active == null ? (
                      'N/A'
                    ) : (
                      <span className={`status-badge ${profile.is_active ? 'status-active' : 'status-inactive'}`}>
                        {profile.is_active ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  </span>

                  <span className="user-meta-label">Rockwell Related</span>
                  <span className="user-meta-value">
                    {profile?.type_of_user || 'N/A'}
                  </span>
                </div>
              </div>
            </section>

            {/* Stat Cards */}
            <div className="user-stats">
              <article className="user-stat-card">
                <span className="dashboard-stat-label">Games Played</span>
                <strong className="dashboard-stat-value">{gamesPlayed}</strong>
              </article>

              <article className="user-stat-card">
                <span className="dashboard-stat-label">Best Score</span>
                <strong className="dashboard-stat-value text-blue">
                  {gamesPlayed > 0 ? maxScore : 'N/A'}
                </strong>
              </article>

              <article className="user-stat-card">
                <span className="dashboard-stat-label">Account Type</span>
                <strong className="dashboard-stat-value">
                  {user.isAdmin ? 'Admin' : 'Player'}
                </strong>
              </article>

              <article className="user-stat-card dashboard-stat-card-accent">
                <span className="dashboard-stat-label">Country</span>
                <strong className="dashboard-stat-value">
                  <span className="dashboard-stat-country">
                    {profile?.country?.name ?? 'N/A'}
                    {profile?.country?.flag && (
                      <img
                        src={profile.country.flag}
                        alt={profile.country.name}
                        className="dashboard-stat-flag"
                      />
                    )}
                  </span>
                </strong>
              </article>
            </div>

            {/* Score History Chart */}
            <section className="user-chart-section">
              <div className="user-chart-header">
                <h3 className="user-chart-title">Score History</h3>
                <span className="user-chart-subtitle">
                  Your score across {gamesPlayed} game session{gamesPlayed !== 1 ? 's' : ''}
                </span>
              </div>

              {chartData.length === 0 ? (
                <p className="user-chart-empty">
                  No game sessions yet. Play a game to see your history here.
                </p>
              ) : (
                <div className="user-chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: '#6c757d' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e9ecef' }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: '#6c757d' }}
                        tickLine={false}
                        axisLine={false}
                        width={45}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid #e9ecef',
                          fontSize: '0.9rem',
                        }}
                        labelFormatter={(label) => `Date: ${label}`}
                        formatter={(value) => [value, 'Score']}
                      />
                      {maxScore > 0 && (
                        <ReferenceLine
                          y={maxScore}
                          stroke="#0066cc"
                          strokeDasharray="4 4"
                          label={{ value: 'Best', position: 'insideTopRight', fontSize: 11, fill: '#0066cc' }}
                        />
                      )}
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#0066cc"
                        strokeWidth={2.5}
                        dot={{ fill: '#0066cc', r: 5, strokeWidth: 0 }}
                        activeDot={{ r: 7, fill: '#0066cc' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </section>

            {/* Game Sessions Table */}
            <section className="user-history-section">
              <h3 className="user-chart-title" style={{ marginBottom: '1rem' }}>Game Sessions</h3>

              {gameHistory.length === 0 ? (
                <p className="empty-message">No sessions recorded yet.</p>
              ) : (
                <div className="dashboard-table-container">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th className="number-col">#</th>
                        <th>Date</th>
                        <th className="number-col">Score</th>
                        <th className="number-col">Global Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...gameHistory].reverse().map((session, i) => (
                        <tr key={session.id}>
                          <td className="number-col">{gameHistory.length - i}</td>
                          <td>
                            {session.date
                              ? new Date(session.date).toLocaleDateString()
                              : '—'}
                          </td>
                          <td className="number-col font-mono text-blue font-bold">
                            {session.score}
                          </td>
                          <td className="number-col">#{session.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default User;
