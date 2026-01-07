import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRemove = (productId, productName) => {
    removeFromCart(productId);
    toast.info(`${productName} removed from cart`);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.warning('Please login to proceed to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <FaShoppingBag className="empty-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet</p>
        <Link to="/products" className="continue-shopping-btn">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span>{cartItems.length} items</span>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="item-details">
                <Link to={`/product/${item._id}`} className="item-name">
                  {item.name}
                </Link>
                <span className="item-category">{item.category}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>

              <div className="item-quantity">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <FaPlus />
                </button>
              </div>

              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(item._id, item.name)}
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <div className="cart-actions">
            <Link to="/products" className="continue-link">
              <FaArrowLeft /> Continue Shopping
            </Link>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          {shipping === 0 && (
            <div className="free-shipping-notice">
              You qualify for free shipping!
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          <div className="payment-methods">
            <p>We Accept:</p>
            <div className="payment-icons">
              <span>💳 Visa</span>
              <span>💳 Mastercard</span>
              <span>💳 PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
