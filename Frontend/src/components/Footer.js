import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">🛒 ShopEase</h3>
          <p>Your one-stop destination for all your shopping needs. Quality products at affordable prices.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="#facebook"><FaFacebook /></a>
            <a href="#twitter"><FaTwitter /></a>
            <a href="#instagram"><FaInstagram /></a>
            <a href="#email"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 ShopEase. All rights reserved. | Semester Project</p>
      </div>
    </footer>
  );
};

export default Footer;
