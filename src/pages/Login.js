import React, { useState } from 'react';
import './Login.css';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleEntrar = (evento) => {
    evento.preventDefault(); // do not reload

    //insertar aquí la comunicacion con backend
    
    console.log("logging-in with ", email, password);
  };

  return (
    // anadir una condicion, si el user ya este conectado
    // y acceder a esta pagina, exhibe un mensaje y no 
    // permite el login

    // permitir tambien que el usuario haga su registro
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;