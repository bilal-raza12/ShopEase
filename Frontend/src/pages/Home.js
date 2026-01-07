import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTruck, FaShieldAlt, FaHeadset, FaUndo } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { productService } from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productService.getProducts({ limit: 8 });
      setFeaturedProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use dummy data for demo
      setFeaturedProducts(getDummyProducts());
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
    }
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', color: '#667eea' },
    { name: 'Fashion', icon: '👗', color: '#f093fb' },
    { name: 'Home', icon: '🏠', color: '#4facfe' },
    { name: 'Sports', icon: '⚽', color: '#43e97b' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>ShopEase</span></h1>
          <p>Discover amazing products at unbeatable prices. Shop the latest trends and enjoy fast, free shipping on orders over $50.</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">
              Shop Now <FaArrowRight />
            </Link>
            <Link to="/products" className="btn-secondary">
              View Deals
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600" alt="Shopping" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <FaTruck className="feature-icon" />
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature">
          <FaShieldAlt className="feature-icon" />
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="feature">
          <FaHeadset className="feature-icon" />
          <h3>24/7 Support</h3>
          <p>Dedicated support team</p>
        </div>
        <div className="feature">
          <FaUndo className="feature-icon" />
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              to={`/products?category=${category.name}`}
              key={index}
              className="category-card"
              style={{ borderColor: category.color }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">
            View All <FaArrowRight />
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get the latest updates on new products and upcoming sales</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
