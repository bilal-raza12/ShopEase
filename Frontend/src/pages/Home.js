import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTruck, FaShieldAlt, FaHeadset, FaUndo, FaStar, FaPlay } from 'react-icons/fa';
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
    { name: 'Electronics', icon: '🎧', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', count: '500+ Products' },
    { name: 'Fashion', icon: '👗', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)', count: '300+ Products' },
    { name: 'Home', icon: '🏠', gradient: 'linear-gradient(135deg, #22d3ee, #2dd4bf)', count: '200+ Products' },
    { name: 'Sports', icon: '⚽', gradient: 'linear-gradient(135deg, #10b981, #34d399)', count: '150+ Products' }
  ];

  const features = [
    { icon: <FaTruck />, title: 'Free Shipping', desc: 'On orders over $50', color: '#6366f1' },
    { icon: <FaShieldAlt />, title: 'Secure Payment', desc: '100% secure checkout', color: '#10b981' },
    { icon: <FaHeadset />, title: '24/7 Support', desc: 'Dedicated support team', color: '#f59e0b' },
    { icon: <FaUndo />, title: 'Easy Returns', desc: '30-day return policy', color: '#ec4899' }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products' },
    { number: '99%', label: 'Satisfaction' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {/* Animated Background Elements */}
        <div className="hero-bg-elements">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
          <div className="hero-blob hero-blob-3"></div>
          <div className="hero-particles">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`particle particle-${i + 1}`}></span>
            ))}
          </div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaStar className="badge-icon" />
              <span>Trusted by 50,000+ Customers</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line">Discover Your</span>
              <span className="title-line title-gradient">Perfect Style</span>
            </h1>

            <p className="hero-subtitle">
              Explore our curated collection of premium products. From cutting-edge electronics to trendy fashion, find everything you need at unbeatable prices.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="btn-hero-primary">
                <span>Shop Now</span>
                <FaArrowRight className="btn-icon" />
              </Link>
              <button className="btn-hero-secondary">
                <FaPlay className="play-icon" />
                <span>Watch Video</span>
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-container">
              <div className="hero-image-glow"></div>
              <div className="hero-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"
                  alt="Shopping"
                  className="hero-image"
                />
              </div>

              {/* Floating Cards */}
              <div className="floating-card floating-card-1">
                <div className="floating-card-icon">🎁</div>
                <div className="floating-card-text">
                  <span className="card-title">Special Offer</span>
                  <span className="card-value">Up to 50% OFF</span>
                </div>
              </div>

              <div className="floating-card floating-card-2">
                <div className="floating-card-icon">⭐</div>
                <div className="floating-card-text">
                  <span className="card-title">Top Rated</span>
                  <span className="card-value">4.9/5 Stars</span>
                </div>
              </div>

              <div className="floating-card floating-card-3">
                <div className="floating-card-icon">🚀</div>
                <div className="floating-card-text">
                  <span className="card-title">Fast Delivery</span>
                  <span className="card-value">2-3 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ '--accent-color': feature.color }}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-header-text">
              <span className="section-label">Browse Categories</span>
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <Link to="/products" className="section-link">
              View All Categories
              <FaArrowRight />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                to={`/products?category=${category.name}`}
                key={index}
                className="category-card"
                style={{ '--card-gradient': category.gradient }}
              >
                <div className="category-bg"></div>
                <div className="category-content">
                  <span className="category-icon">{category.icon}</span>
                  <h3 className="category-name">{category.name}</h3>
                  <span className="category-count">{category.count}</span>
                </div>
                <div className="category-arrow">
                  <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="section-container">
          <div className="section-header">
            <div className="section-header-text">
              <span className="section-label">Handpicked For You</span>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/products" className="section-link">
              View All Products
              <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-bg-elements">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
        </div>
        <div className="cta-container">
          <div className="cta-content">
            <span className="cta-badge">Limited Time Offer</span>
            <h2 className="cta-title">Get 20% Off Your First Order</h2>
            <p className="cta-text">Sign up for our newsletter and receive exclusive deals, early access to new products, and more!</p>
            <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
              <div className="cta-input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="cta-input"
                />
                <button type="submit" className="cta-submit">
                  Subscribe
                  <FaArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
