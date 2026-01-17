import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartCount = getCartCount();

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <Logo size={42} showText={true} className="navbar-logo-component" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`menu-toggle-icon ${isMenuOpen ? 'active' : ''}`}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}
            >
              <span className="nav-link-text">Home</span>
              <span className="nav-link-indicator"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/products"
              className={`nav-link ${location.pathname === '/products' ? 'nav-link-active' : ''}`}
            >
              <span className="nav-link-text">Products</span>
              <span className="nav-link-indicator"></span>
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <Link
                to="/orders"
                className={`nav-link ${location.pathname === '/orders' ? 'nav-link-active' : ''}`}
              >
                <span className="nav-link-text">My Orders</span>
                <span className="nav-link-indicator"></span>
              </Link>
            </li>
          )}
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Cart */}
          <Link to="/cart" className="cart-button">
            <span className="cart-icon-wrapper">
              <FaShoppingCart className="cart-icon" />
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </span>
            <span className="cart-label">Cart</span>
          </Link>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="user-menu-container">
              <button
                className="user-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <FaChevronDown className={`user-chevron ${isUserMenuOpen ? 'rotated' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <span className="user-dropdown-name">{user?.name}</span>
                    <span className="user-dropdown-email">{user?.email}</span>
                  </div>
                  <div className="user-dropdown-divider"></div>
                  <Link to="/orders" className="user-dropdown-item">
                    <span>My Orders</span>
                  </Link>
                  <button onClick={handleLogout} className="user-dropdown-item user-dropdown-logout">
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              <FaUser className="login-icon" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="nav-overlay" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Navbar;
