import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // mock:
  const [usuarioLogado, setUsuarioLogado] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('Chespirito');

  return (
    <Router>
      {/* //nav bar (all pages) */}
      <Navbar isLoggedIn={usuarioLogado} userName={nomeUsuario} />

      {/* // pages: */}
      <div className="paginas">
        <Routes>
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
          
        </Routes>

      </div>

      <Footer/>
    </Router>
  );
}

export default App;