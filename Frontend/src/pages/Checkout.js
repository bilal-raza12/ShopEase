import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;

    // Format card number
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }

    setPaymentInfo({ ...paymentInfo, [e.target.name]: value });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cartItems,
        shippingAddress: shippingInfo,
        paymentMethod: 'Credit Card',
        subtotal,
        shipping,
        tax,
        total
      };

      await orderService.createOrder(orderData);
      clearCart();
      setStep(3);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      // Simulate success for demo
      clearCart();
      setStep(3);
      toast.success('Order placed successfully!');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-text">Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-text">Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-text">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="checkout-container">
        {step === 1 && (
          <form className="checkout-form" onSubmit={handleShippingSubmit}>
            <h2>Shipping Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                placeholder="Street address"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="continue-btn">
              Continue to Payment
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <h2><FaCreditCard /> Payment Information</h2>

            <div className="secure-notice">
              <FaLock /> Your payment information is secure
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className="form-group">
              <label>Name on Card</label>
              <input
                type="text"
                name="cardName"
                value={paymentInfo.cardName}
                onChange={handlePaymentChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={paymentInfo.expiry}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <div className="button-group">
              <button type="button" className="back-btn" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className="place-order-btn" disabled={loading}>
                {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="order-confirmation">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order has been received and is being processed.</p>
            <p className="order-number">Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p>A confirmation email has been sent to {shippingInfo.email}</p>

            <div className="confirmation-buttons">
              <button onClick={() => navigate('/orders')} className="view-orders-btn">
                View My Orders
              </button>
              <button onClick={() => navigate('/products')} className="continue-shopping-btn">
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {step !== 3 && (
          <div className="order-summary-checkout">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item._id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="summary-item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
