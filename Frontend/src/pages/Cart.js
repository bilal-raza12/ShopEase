import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShoppingBag,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaTag,
  FaCreditCard,
  FaLock
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);

  const handleRemove = async (productId, productName) => {
    setRemovingItem(productId);
    setTimeout(() => {
      removeFromCart(productId);
      toast.info(`${productName} removed from cart`);
      setRemovingItem(null);
    }, 300);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.warning('Please login to proceed to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
      toast.success('Promo code applied! 10% off');
    } else {
      toast.error('Invalid promo code');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="empty-animation">
            <div className="empty-cart-icon">
              <FaShoppingBag />
              <div className="empty-cart-circles">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet. Start exploring our amazing products!</p>
          <Link to="/products" className="continue-shopping-btn">
            <FaArrowLeft />
            <span>Continue Shopping</span>
          </Link>

          <div className="empty-suggestions">
            <h4>You might like</h4>
            <div className="suggestion-tags">
              <Link to="/products?category=Electronics">Electronics</Link>
              <Link to="/products?category=Fashion">Fashion</Link>
              <Link to="/products?category=Home">Home</Link>
              <Link to="/products?category=Sports">Sports</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + shipping + tax;
  const savedAmount = cartItems.reduce((acc, item) => {
    const saved = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
    return acc + saved;
  }, 0);

  return (
    <div className="cart-page">
      {/* Hero Header */}
      <section className="cart-hero">
        <div className="cart-hero-bg">
          <div className="cart-blob cart-blob-1"></div>
          <div className="cart-blob cart-blob-2"></div>
        </div>
        <div className="cart-hero-content">
          <span className="cart-hero-badge">
            <FaShoppingBag /> Shopping Cart
          </span>
          <h1>Your <span className="text-gradient">Cart</span></h1>
          <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </section>

      {/* Cart Content */}
      <div className="cart-main">
        <div className="cart-container">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Cart Items</h2>
              <button className="clear-cart-btn" onClick={clearCart}>
                <FaTrash />
                <span>Clear All</span>
              </button>
            </div>

            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div
                  key={item._id}
                  className={`cart-item ${removingItem === item._id ? 'removing' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                    {item.discount > 0 && (
                      <span className="item-discount-badge">-{item.discount}%</span>
                    )}
                  </div>

                  <div className="item-details">
                    <Link to={`/product/${item._id}`} className="item-name">
                      {item.name}
                    </Link>
                    <span className="item-category">{item.category}</span>
                    <div className="item-price-row">
                      <span className="item-price">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="item-original-price">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="item-total">
                    <span className="total-label">Total</span>
                    <span className="total-value">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item._id, item.name)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <Link to="/products" className="continue-link">
                <FaArrowLeft />
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <FaShieldAlt />
                <span>Secure Checkout</span>
              </div>
              <div className="trust-badge">
                <FaTruck />
                <span>Free Shipping $50+</span>
              </div>
              <div className="trust-badge">
                <FaUndo />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>

              {/* Promo Code */}
              <div className="promo-section">
                <div className="promo-input-wrapper">
                  <FaTag className="promo-icon" />
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  <button
                    className="apply-promo-btn"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <span className="promo-success">Promo code "SAVE10" applied!</span>
                )}
              </div>

              <div className="summary-divider"></div>

              {/* Summary Rows */}
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Promo Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                {savedAmount > 0 && (
                  <div className="summary-row savings">
                    <span>You Saved</span>
                    <span>-${savedAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'free-shipping' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="free-shipping-notice">
                  <FaTruck />
                  <span>You qualify for free shipping!</span>
                </div>
              )}

              {shipping > 0 && (
                <div className="shipping-progress">
                  <p>Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                <FaLock />
                <span>Proceed to Checkout</span>
              </button>

              <div className="payment-methods">
                <p>We Accept:</p>
                <div className="payment-icons">
                  <div className="payment-icon visa">
                    <FaCreditCard />
                    <span>Visa</span>
                  </div>
                  <div className="payment-icon mastercard">
                    <FaCreditCard />
                    <span>Mastercard</span>
                  </div>
                  <div className="payment-icon paypal">
                    <FaCreditCard />
                    <span>PayPal</span>
                  </div>
                </div>
              </div>

              <div className="secure-checkout">
                <FaLock />
                <span>Secure 256-bit SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
