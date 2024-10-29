import React, { useState } from 'react';
import axios from 'axios';
import './Login.js.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleRegister = () => {
    setIsRegister(!isRegister);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/api/register' : '/api/login';
    const data = isRegister
      ? { email, password, confirmPassword }
      : { email, password };

    try {
      const response = await axios.post(endpoint, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage(response.data.message);
      if (!isRegister) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {isRegister && (
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-button">
          {isRegister ? 'Register' : 'Login'}
        </button>
        <button type="button" className="toggle-button" onClick={toggleRegister}>
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
