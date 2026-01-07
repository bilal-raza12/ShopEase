import React, { useState, useEffect } from 'react';
import { adminService, productService } from '../../services/api';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '',
    category: 'Electronics',
    image: '',
    stock: '',
    features: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, search, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getProducts({ page, limit: 10, search, category });
      setProducts(response.data.products);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: '0',
      category: 'Electronics',
      image: '',
      stock: '',
      features: ''
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || product.price.toString(),
      discount: product.discount?.toString() || '0',
      category: product.category,
      image: product.image,
      stock: product.stock?.toString() || '0',
      features: product.features?.join(', ') || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice) || parseFloat(formData.price),
      discount: parseInt(formData.discount) || 0,
      category: formData.category,
      image: formData.image,
      stock: parseInt(formData.stock) || 0,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    try {
      if (editingProduct) {
        await adminService.updateProduct(editingProduct._id, productData);
        toast.success('Product updated successfully');
      } else {
        await adminService.createProduct(productData);
        toast.success('Product created successfully');
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminService.deleteProduct(productId);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Products Management</h1>
          <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
            <FiPlus /> Add Product
          </button>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <form onSubmit={handleSearch} className="admin-search-form">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                className="admin-select"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
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
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product-thumbnail"
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>{formatCurrency(product.price)}</td>
                          <td>
                            <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                              {product.stock > 0 ? product.stock : 'Out of Stock'}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn edit"
                                onClick={() => openEditModal(product)}
                                title="Edit"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDelete(product._id)}
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
                        <td colSpan="6" className="no-data">No products found</td>
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

        {/* Product Modal */}
        {showModal && (
          <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="admin-modal large" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                  <FiX />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home">Home</option>
                      <option value="Sports">Sports</option>
                      <option value="Food">Food</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Original Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Discount (%)</label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group full-width">
                    <label>Image URL *</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group full-width">
                    <label>Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="admin-form-group full-width">
                    <label>Features (comma separated)</label>
                    <input
                      type="text"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  </div>
                </div>
                <div className="admin-modal-actions">
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn admin-btn-primary">
                    {editingProduct ? 'Save Changes' : 'Create Product'}
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

export default AdminProducts;
