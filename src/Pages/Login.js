import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import '../CSS/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        username,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/admin');
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.');
    }
  };
  
  return (
    <div className="login-container">
      <div className="logincard">
        <h2>Login</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="input-container">
          <FaUser className="icon" />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </div>
        <div className="input-container">
          <FaLock className="icon" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
