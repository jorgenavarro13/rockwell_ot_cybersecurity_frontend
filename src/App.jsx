import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import {ProtectedRoute} from './ProtectedRoute.jsx';
import {AdminRoute} from './AdminRoute.jsx';

function App() {

  return (
    <AuthProvider>

      <Router>
        <Navbar/>

        {/* // pages: */}
        <div className="paginas">
          <Routes>
            <Route 
              path="/" element={<Home />} 
            />

            <Route 
              path="/login" element={ <Login />} 
            />

            <Route 
              path="/register" element={ <Register />} 
            />

            <Route 
              path="/game" element={ 
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              } 
            />


            <Route 
              path="/ranking" element={<Ranking />} 
            />

            <Route
              path="/dashboard" element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />

            <Route 
              path="*" element={<Navigate to="/" />} 
            />

          </Routes>

        </div>

        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;