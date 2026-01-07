import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { authService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './AdminLogin.css';

const AdminLogin = () => {
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

      // Check if user is admin
      if (response.data.role !== 'admin') {
        toast.error('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }

      login(response.data);
      toast.success('Welcome to Admin Panel!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Admin login error:', error);
      const message = error.response?.data?.message || 'Invalid credentials';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-logo-icon">
            <FiShield />
          </div>
          <h1>Admin Panel</h1>
          <p>ShopEase Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-input-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Sign In to Admin'
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <a href="/" className="back-to-store">Back to Store</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
