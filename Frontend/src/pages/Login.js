import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData);
      login(response.data);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-welcome">
            <h1>Welcome Back!</h1>
            <p>Sign in to continue shopping and track your orders</p>
            <div className="auth-features">
              <div className="feature-item">
                <span className="feature-icon">🛒</span>
                <span>Access your cart</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📦</span>
                <span>Track your orders</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💝</span>
                <span>Save your favorites</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <h2>Sign In</h2>
            <p className="auth-subtitle">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
