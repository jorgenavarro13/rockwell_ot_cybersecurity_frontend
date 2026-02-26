import Login from './pages/Login';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // mock:
  const [usuarioLogado, setUsuarioLogado] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('nome');

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
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;