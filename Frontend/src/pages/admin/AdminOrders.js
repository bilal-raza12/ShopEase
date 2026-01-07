import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { FiSearch, FiEye, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [page, search, status]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.getOrders({ page, limit: 10, search, status });
      setOrders(response.data.orders);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchOrders();
  };

  const viewOrder = async (orderId) => {
    try {
      const response = await adminService.getOrder(orderId);
      setSelectedOrder(response.data);
      setShowModal(true);
    } catch (error) {
      toast.error('Failed to fetch order details');
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminService.updateOrder(orderId, { status: newStatus });
      toast.success('Order status updated');
      fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await adminService.deleteOrder(orderId);
        toast.success('Order deleted successfully');
        fetchOrders();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete order');
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      processing: '#17a2b8',
      shipped: '#6f42c1',
      delivered: '#28a745',
      cancelled: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Orders Management</h1>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <form onSubmit={handleSearch} className="admin-search-form">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by order ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                className="admin-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button type="submit" className="admin-btn admin-btn-primary">Search</button>
            </form>
          </div>

          {loading ? (
            <div className="admin-loading">Loading...</div>
          ) : (
            <>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td className="order-id">{order._id.slice(-8)}</td>
                          <td>
                            <div className="customer-info">
                              <span>{order.user?.name || 'N/A'}</span>
                              <small>{order.user?.email || ''}</small>
                            </div>
                          </td>
                          <td>{order.items?.length || 0} items</td>
                          <td>{formatCurrency(order.total)}</td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                              className="status-select"
                              style={{ borderColor: getStatusColor(order.status) }}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>{formatDate(order.createdAt)}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn view"
                                onClick={() => viewOrder(order._id)}
                                title="View Details"
                              >
                                <FiEye />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDelete(order._id)}
                                title="Delete"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-data">No orders found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="admin-pagination">
                  <button
                    className="pagination-btn"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="pagination-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="admin-modal large" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>Order Details</h2>
                <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                  <FiX />
                </button>
              </div>
              <div className="order-details">
                <div className="order-info-grid">
                  <div className="order-info-section">
                    <h3>Order Information</h3>
                    <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                    <p><strong>Status:</strong>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedOrder.status), marginLeft: '8px' }}
                      >
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                    <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
                  </div>
                  <div className="order-info-section">
                    <h3>Customer Information</h3>
                    <p><strong>Name:</strong> {selectedOrder.shippingAddress?.fullName}</p>
                    <p><strong>Email:</strong> {selectedOrder.shippingAddress?.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.shippingAddress?.phone || 'N/A'}</p>
                  </div>
                  <div className="order-info-section">
                    <h3>Shipping Address</h3>
                    <p>{selectedOrder.shippingAddress?.address}</p>
                    <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}</p>
                    <p>{selectedOrder.shippingAddress?.country}</p>
                  </div>
                </div>

                <div className="order-items-section">
                  <h3>Order Items</h3>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="item-info">
                              <img src={item.image} alt={item.name} className="item-thumbnail" />
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>{formatCurrency(selectedOrder.shipping)}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax:</span>
                    <span>{formatCurrency(selectedOrder.tax)}</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>

                <div className="admin-modal-actions">
                  <button className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
