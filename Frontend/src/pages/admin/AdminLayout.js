import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiHome, FiUsers, FiPackage, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import './Admin.css';

const AdminLayout = ({ children }) => {
  const { admin, adminLogout, isAdminAuthenticated } = useAdminAuth();
  const location = useLocation();

  // Redirect to admin login if not admin
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const menuItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { path: '/admin/products', icon: <FiPackage />, label: 'Products' },
    { path: '/admin/orders', icon: <FiShoppingCart />, label: 'Orders' },
  ];

  const handleLogout = () => {
    adminLogout();
    window.location.href = '/admin';
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>ShopEase Admin</h2>
        </div>
        <nav className="admin-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <span>{admin.name}</span>
            <small>{admin.email}</small>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
