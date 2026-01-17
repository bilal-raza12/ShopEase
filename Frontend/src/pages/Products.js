import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaTh, FaList, FaTimes, FaSlidersH } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { productService } from '../services/api';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    { name: 'All', icon: '🛍️' },
    { name: 'Electronics', icon: '🎧' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Home', icon: '🏠' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Food', icon: '🍕' }
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        sort: sortBy
      });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(getDummyProducts());
    } finally {
      setLoading(false);
    }
  };

  const getDummyProducts = () => [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      category: 'Electronics',
      rating: 4.5,
      numReviews: 128,
      stock: 50,
      discount: 20
    },
    {
      _id: '2',
      name: 'Smart Watch Pro',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      category: 'Electronics',
      rating: 4.8,
      numReviews: 256,
      stock: 30,
      discount: 20
    },
    {
      _id: '3',
      name: 'Premium Leather Bag',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300',
      category: 'Fashion',
      rating: 4.3,
      numReviews: 89,
      stock: 25,
      discount: 0
    },
    {
      _id: '4',
      name: 'Running Shoes Elite',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
      category: 'Sports',
      rating: 4.7,
      numReviews: 312,
      stock: 45,
      discount: 19
    },
    {
      _id: '5',
      name: 'Organic Coffee Beans',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300',
      category: 'Food',
      rating: 4.6,
      numReviews: 178,
      stock: 100,
      discount: 0
    },
    {
      _id: '6',
      name: 'Minimalist Desk Lamp',
      price: 49.99,
      originalPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300',
      category: 'Home',
      rating: 4.4,
      numReviews: 67,
      stock: 35,
      discount: 29
    },
    {
      _id: '7',
      name: 'Portable Power Bank',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300',
      category: 'Electronics',
      rating: 4.2,
      numReviews: 203,
      stock: 80,
      discount: 0
    },
    {
      _id: '8',
      name: 'Yoga Mat Premium',
      price: 34.99,
      originalPrice: 44.99,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300',
      category: 'Sports',
      rating: 4.5,
      numReviews: 156,
      stock: 60,
      discount: 22
    },
    {
      _id: '9',
      name: 'Vintage Sunglasses',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
      category: 'Fashion',
      rating: 4.1,
      numReviews: 94,
      stock: 40,
      discount: 0
    },
    {
      _id: '10',
      name: 'Ceramic Plant Pot',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300',
      category: 'Home',
      rating: 4.3,
      numReviews: 72,
      stock: 55,
      discount: 0
    },
    {
      _id: '11',
      name: 'Wireless Earbuds',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300',
      category: 'Electronics',
      rating: 4.6,
      numReviews: 234,
      stock: 70,
      discount: 25
    },
    {
      _id: '12',
      name: 'Fitness Tracker Band',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300',
      category: 'Sports',
      rating: 4.4,
      numReviews: 189,
      stock: 85,
      discount: 0
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange({ min: 0, max: 1000 });
    setSortBy('newest');
  };

  const activeFiltersCount = [
    searchTerm !== '',
    selectedCategory !== 'All',
    priceRange.min !== 0 || priceRange.max !== 1000,
    sortBy !== 'newest'
  ].filter(Boolean).length;

  return (
    <div className="products-page">
      {/* Hero Header */}
      <section className="products-hero">
        <div className="products-hero-bg">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
        </div>
        <div className="products-hero-content">
          <span className="products-hero-badge">Explore Our Collection</span>
          <h1 className="products-hero-title">
            Discover <span className="text-gradient">Amazing</span> Products
          </h1>
          <p className="products-hero-subtitle">
            Browse through our curated selection of premium products
          </p>

          {/* Search Bar */}
          <div className="hero-search-container">
            <div className="hero-search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="search-clear" onClick={() => setSearchTerm('')}>
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="products-main">
        {/* Mobile Filter Toggle */}
        <button
          className="mobile-filter-toggle"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <FaSlidersH />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="filter-count">{activeFiltersCount}</span>
          )}
        </button>

        <div className="products-container">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showMobileFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>
                <FaFilter />
                <span>Filters</span>
              </h3>
              {activeFiltersCount > 0 && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All
                </button>
              )}
              <button
                className="close-filters-btn"
                onClick={() => setShowMobileFilters(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4>Categories</h4>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.name}
                    className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-slider-container">
                <div className="price-inputs">
                  <div className="price-input-group">
                    <span className="price-label">Min</span>
                    <div className="price-input-wrapper">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="price-separator">
                    <span></span>
                  </div>
                  <div className="price-input-group">
                    <span className="price-label">Max</span>
                    <div className="price-input-wrapper">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div className="filter-section">
              <h4>Sort By</h4>
              <div className="sort-options">
                {[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Top Rated' }
                ].map(option => (
                  <button
                    key={option.value}
                    className={`sort-btn ${sortBy === option.value ? 'active' : ''}`}
                    onClick={() => setSortBy(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="products-content">
            {/* Results Bar */}
            <div className="results-bar">
              <div className="results-info">
                <span className="results-count">{filteredProducts.length}</span>
                <span className="results-text">products found</span>
                {selectedCategory !== 'All' && (
                  <span className="results-category">in {selectedCategory}</span>
                )}
              </div>
              <div className="view-options">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <FaTh />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <FaList />
                </button>
              </div>
            </div>

            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="active-filters">
                {searchTerm && (
                  <span className="filter-tag">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')}><FaTimes /></button>
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="filter-tag">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}><FaTimes /></button>
                  </span>
                )}
                {(priceRange.min !== 0 || priceRange.max !== 1000) && (
                  <span className="filter-tag">
                    ${priceRange.min} - ${priceRange.max}
                    <button onClick={() => setPriceRange({ min: 0, max: 1000 })}><FaTimes /></button>
                  </span>
                )}
              </div>
            )}

            {/* Products */}
            {loading ? (
              <Loading />
            ) : filteredProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
                <button className="reset-filters-btn" onClick={clearFilters}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="filter-overlay" onClick={() => setShowMobileFilters(false)}></div>
      )}
    </div>
  );
};

export default Products;
