import React, { useState } from 'react';
import './Login.css';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleEntrar = (evento) => {
    evento.preventDefault(); // do not reload
    
    console.log("logging-in with ", email, password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleEntrar}>
        <h2>Login to save your progress</h2>
        
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;