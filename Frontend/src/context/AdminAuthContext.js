import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in (from localStorage)
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch (e) {
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
      }
    }
    setLoading(false);
  }, []);

  const adminLogin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('adminUser', JSON.stringify(adminData));
    localStorage.setItem('adminToken', adminData.token);
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
  };

  const value = {
    admin,
    adminLogin,
    adminLogout,
    loading,
    isAdminAuthenticated: !!admin && admin.role === 'admin'
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};
