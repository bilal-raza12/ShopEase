import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaHeart, FaMapMarkerAlt, FaPhone, FaArrowRight } from 'react-icons/fa';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Decorative Elements */}
      <div className="footer-bg-elements">
        <div className="footer-blob footer-blob-1"></div>
        <div className="footer-blob footer-blob-2"></div>
      </div>

      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <Logo size={45} showText={true} className="footer-logo" />
          <p className="footer-tagline">
            Your one-stop destination for premium products. Discover quality, style, and unbeatable prices all in one place.
          </p>

          {/* Contact Info */}
          <div className="footer-contact">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Shopping Street, City, Country</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>support@shopease.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">
                <FaArrowRight className="link-arrow" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FaArrowRight className="link-arrow" />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <FaArrowRight className="link-arrow" />
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Link to="/orders">
                <FaArrowRight className="link-arrow" />
                <span>My Orders</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4 className="footer-title">Customer Service</h4>
          <ul className="footer-links">
            <li>
              <a href="#contact">
                <FaArrowRight className="link-arrow" />
                <span>Contact Us</span>
              </a>
            </li>
            <li>
              <a href="#faq">
                <FaArrowRight className="link-arrow" />
                <span>FAQ</span>
              </a>
            </li>
            <li>
              <a href="#shipping">
                <FaArrowRight className="link-arrow" />
                <span>Shipping Info</span>
              </a>
            </li>
            <li>
              <a href="#returns">
                <FaArrowRight className="link-arrow" />
                <span>Returns & Refunds</span>
              </a>
            </li>
            <li>
              <a href="#privacy">
                <FaArrowRight className="link-arrow" />
                <span>Privacy Policy</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div className="footer-section">
          <h4 className="footer-title">Stay Connected</h4>
          <p className="footer-social-text">Follow us on social media for updates, offers, and more!</p>

          <div className="social-icons">
            <a href="#facebook" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#twitter" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#instagram" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#email" className="social-icon" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>

          {/* Mini Newsletter */}
          <div className="footer-newsletter">
            <p>Subscribe for exclusive deals</p>
            <form className="newsletter-mini" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" required />
              <button type="submit">
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            &copy; {currentYear} ShopEase. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" /> for PDC Semester Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
