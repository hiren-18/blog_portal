// Login.js
import React, { useState } from 'react';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {


        const response = await fetch('/api/v1/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({ username, password }),
          });
    
          if (!response.ok) {
            throw new Error(`Login failed with status: ${response.status}`);
          }
    

          const data = await response.json();
          console.log(data);
          const { accessToken } = data;
          console.log(accessToken);
        //   localStorage.setItem('accessToken', accessToken);
          onLogin(username,accessToken);
        //   console.error('Login failed: Invalid credentials');
      
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };


  
  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
