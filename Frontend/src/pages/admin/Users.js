import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { FiSearch, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers({ page, limit: 10, search });
      setUsers(response.data.users);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await adminService.updateUser(editingUser._id, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role
      });
      toast.success('User updated successfully');
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(userId);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Users Management</h1>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <form onSubmit={handleSearch} className="admin-search-form">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{formatDate(user.createdAt)}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn edit"
                                onClick={() => handleEdit(user)}
                                title="Edit"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDelete(user._id)}
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
                        <td colSpan="5" className="no-data">No users found</td>
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

        {/* Edit User Modal */}
        {showModal && (
          <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>Edit User</h2>
                <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                  <FiX />
                </button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="admin-form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="admin-modal-actions">
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn admin-btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
