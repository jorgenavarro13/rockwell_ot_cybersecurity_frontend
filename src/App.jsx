import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import checkSession from './services/session.js';

function App() {
  // mock:
  const [usuarioLogado,setLoggin] = useState(false);
  const [nomeUsuario,setUsername] = useState('');
  const [usuarioAdmin,setPermissions] = useState(false);

  useEffect(() => { // Use effect se ejecuta al montar el componente, 
  // ideal para llamadas a APIs o tareas de inicialización
    const fetchSession = async () => {
      const data = await checkSession();
      console.log(data);

      if( data?.activeSession){
        setLoggin(true);
      }

      if( data?.data?.username){
        setUsername(data.data.username)
      }
      
      if( data?.isAdmin){ // hay que cambiar este valor hardcodeado, tiene  que regresar un booleano el backend
        setPermissions(true);
      }
    };
    
    fetchSession();

  }, []);


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
            element={usuarioLogado ? <Navigate to="/" replace /> : <Login />} 
          />

          <Route 
            path="/register" 
            element={usuarioLogado ? <Navigate to="/" replace /> : <Register />} 
          />

          <Route 
            path="/game" 
            element={usuarioLogado ? <Game /> : <Navigate to="/login" replace />} 
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