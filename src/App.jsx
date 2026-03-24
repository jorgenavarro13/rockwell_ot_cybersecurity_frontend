import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  // mock:
  const [usuarioLogado] = useState(true);
  const [nomeUsuario] = useState('Chespirito');
  const [usuarioAdmin] = useState(true);

  return (
    <Router>
      {/* //nav bar (all pages) */}
      <Navbar
        isLoggedIn={usuarioLogado}
        userName={nomeUsuario}
        isAdmin={usuarioAdmin}
      />

      {/* // pages: */}
      <div className="paginas">
        <Routes>
          <Route 
            path="/" 
            element={<Home isLoggedIn={usuarioLogado} />} 
          />

          <Route 
            path="/login" 
            element={<Login />} 
          />

          <Route 
            path="/register" 
            element={<Register />} 
          />

          <Route 
            path="/game" 
            element={<Game />} 
          />

          <Route 
            path="/ranking" 
            element={<Ranking />} 
          />

          <Route
            path="/dashboard"
            element={usuarioLogado && usuarioAdmin ? <Dashboard /> : <Navigate to="/" replace />}
          />
          
        </Routes>

      </div>

      <Footer/>
    </Router>
  );
}

export default App;