import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

        <Routes>
          <Route 
            path="/register" 
            element={<Register />} 
          />
          
        </Routes>
      </div>

      <Footer/>
    </Router>
  );
}

export default App;