import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🛒</span>
          ShopEase
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <Link to="/orders" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                My Orders
              </Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {getCartCount() > 0 && (
              <span className="cart-count">{getCartCount()}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">
                <FaUser /> {user?.name}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <FaUser /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
