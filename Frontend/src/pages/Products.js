import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
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

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Food'];

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

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover our amazing collection of products</p>
      </div>

      <div className="products-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3><FaFilter /> Filters</h3>
          </div>

          <div className="filter-section">
            <h4>Search</h4>
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-section">
            <h4>Categories</h4>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="filter-section">
            <h4>Sort By</h4>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="products-content">
          <div className="results-info">
            <span>{filteredProducts.length} products found</span>
          </div>

          {loading ? (
            <Loading />
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
