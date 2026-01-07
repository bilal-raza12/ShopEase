import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api';
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign } from 'react-icons/fi';
import AdminLayout from './AdminLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    orderStats: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await adminService.getDashboard();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-page-title">Dashboard</h1>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-icon users">
              <FiUsers />
            </div>
            <div className="stat-info">
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon products">
              <FiPackage />
            </div>
            <div className="stat-info">
              <h3>Total Products</h3>
              <p>{stats.totalProducts}</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon orders">
              <FiShoppingCart />
            </div>
            <div className="stat-info">
              <h3>Total Orders</h3>
              <p>{stats.totalOrders}</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon revenue">
              <FiDollarSign />
            </div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p>{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Recent Orders</h2>
              <Link to="/admin/orders" className="view-all-link">View All</Link>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.length > 0 ? (
                    stats.recentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id.slice(-8)}</td>
                        <td>{order.user?.name || 'N/A'}</td>
                        <td>{formatCurrency(order.total)}</td>
                        <td>
                          <span
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data">No orders yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Order Statistics</h2>
            </div>
            <div className="order-stats-list">
              {stats.orderStats.length > 0 ? (
                stats.orderStats.map((stat) => (
                  <div key={stat._id} className="order-stat-item">
                    <div className="order-stat-info">
                      <span
                        className="status-dot"
                        style={{ backgroundColor: getStatusColor(stat._id) }}
                      ></span>
                      <span className="status-name">{stat._id}</span>
                    </div>
                    <div className="order-stat-values">
                      <span className="count">{stat.count} orders</span>
                      <span className="amount">{formatCurrency(stat.totalAmount)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No statistics available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
