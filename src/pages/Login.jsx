import React, { useState } from 'react';
import './Login.css';
import { loginUser } from '../services/login.js';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const handleEntrar = async (evento) => {
    evento.preventDefault(); // do not reload
    console.log( `Email: ${email}, Password: ${password}`); // for debugging
    const res = await loginUser(email, password);
    
    if(res?.success){
      window.location.href = "/game";
    } else {
      setError('Invalid email or password. Please try again.');
    }

    evento.preventDefault();
  };

  return (
    // anadir una condicion, si el user ya este conectado
    // y acceder a esta pagina, exhibe un mensaje y no 
    // permite el login

    <div className="login-container">
      <form className="login-form" onSubmit={handleEntrar}>
        <h2>Login to play!</h2>
        
        <div className="input-group">
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insert your e-mail"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insert your password"
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit">Login</button>

        <div className="register-link">
          <a href="./register">Register (I'm a new user)</a>

        </div>
      </form>
    </div>
  );
}

export default Login;