import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../Components/Navbar/Navbar';

const avatars = [
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Christopher",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Jameson",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Jessica",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/bottts/svg?seed=neura1"
];

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(avatars[0]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const backend = import.meta.env.VITE_BACKEND_URL;
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignup && (!name || !avatar))) {
      setError('Please fill in all required fields.');
      return;
    }

    const endpoint = isSignup ? 'signup' : 'login';
    const payload = isSignup ? { name, email, password, avatar } : { email, password };

    try {
      const resp = await axios.post(`${backend}api/user/${endpoint}`, payload);
      if (resp.data.success) {
        toast.success(resp.data.message);
        if (!isSignup) {
          localStorage.setItem('token', resp.data.token);
          localStorage.setItem('user', JSON.stringify(resp.data.user));
          if (onLogin) onLogin(resp.data.token);
          nav('/dashboard');
        } else {
          setIsSignup(false);
        }
      } else {
        toast.error(resp.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <Navbar minimal={true} />
      <div className="login-bg">
        <div className="login-card">
          <div className="login-logo-text">
            <span role="img" aria-label="logo" className="logo-emoji">🧠</span>
            <span className="logo-name">NeuraLearn AI</span>
          </div>

          <h2 className="login-title">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="login-subtitle">
            {isSignup ? 'Sign up for NeuraLearn AI' : 'Sign in to NeuraLearn AI'}
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="login-field">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  autoComplete="name"
                />
              </div>
            )}

            <div className="login-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete={isSignup ? 'username' : 'email'}
              />
            </div>

            <div className="login-field">
              <label>Password</label>
              <div className="password-field-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={isSignup ? 'Create a password' : '••••••••'}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {isSignup && (
              <div className="login-field">
                <label>Choose an Avatar</label>
                <div className="avatar-picker">
                  {avatars.map((url, idx) => (
                    <img
                      key={url}
                      src={url}
                      alt={`avatar-${idx + 1}`}
                      className={`avatar-option${avatar === url ? ' selected' : ''}`}
                      onClick={() => setAvatar(url)}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-btn">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="login-link"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
