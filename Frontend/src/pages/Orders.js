import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaCheck, FaEye } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { orderService } from '../services/api';
import './Orders.css';

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Demo data
      setOrders(getDemoOrders());
    } finally {
      setLoading(false);
    }
  };

  const getDemoOrders = () => [
    {
      _id: 'ORD001',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'delivered',
      total: 159.97,
      items: [
        {
          _id: '1',
          name: 'Wireless Bluetooth Headphones',
          price: 79.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'
        },
        {
          _id: '4',
          name: 'Running Shoes Elite',
          price: 79.98,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'
        }
      ],
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    {
      _id: 'ORD002',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'shipped',
      total: 199.99,
      items: [
        {
          _id: '2',
          name: 'Smart Watch Pro',
          price: 199.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'
        }
      ],
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    {
      _id: 'ORD003',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'processing',
      total: 74.98,
      items: [
        {
          _id: '6',
          name: 'Minimalist Desk Lamp',
          price: 49.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100'
        },
        {
          _id: '5',
          name: 'Organic Coffee Beans',
          price: 24.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100'
        }
      ],
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <FaBox />;
      case 'shipped':
        return <FaTruck />;
      case 'delivered':
        return <FaCheck />;
      default:
        return <FaBox />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      <div className="orders-container">
        {orders.length === 0 ? (
          <div className="no-orders">
            <FaBox className="no-orders-icon" />
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping!</p>
            <Link to="/products" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-id">Order #{order._id}</span>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.slice(0, 2).map(item => (
                    <div key={item._id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="more-items">+{order.items.length - 2} more items</p>
                  )}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">${order.total.toFixed(2)}</span>
                  </div>
                  <button
                    className="view-details-btn"
                    onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                  >
                    <FaEye /> {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {selectedOrder === order._id && (
                  <div className="order-details">
                    <div className="details-section">
                      <h4>Shipping Address</h4>
                      <p>{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                        {order.shippingAddress.zipCode}
                      </p>
                    </div>

                    <div className="details-section">
                      <h4>Order Timeline</h4>
                      <div className="timeline">
                        <div className="timeline-item active">
                          <span className="timeline-dot"></span>
                          <span>Order Placed</span>
                        </div>
                        <div className={`timeline-item ${order.status !== 'processing' ? 'active' : ''}`}>
                          <span className="timeline-dot"></span>
                          <span>Shipped</span>
                        </div>
                        <div className={`timeline-item ${order.status === 'delivered' ? 'active' : ''}`}>
                          <span className="timeline-dot"></span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
