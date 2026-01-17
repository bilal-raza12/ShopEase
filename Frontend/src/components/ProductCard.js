import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaHeart, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    setTimeout(() => {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
      setIsAdding(false);
    }, 300);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.info(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`star ${i < Math.floor(product.rating || 0) ? 'star-filled' : ''}`}
      />
    ));
  };

  return (
    <div
      className="product-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link to={`/product/${product._id}`} className="product-link">
        {/* Image Section */}
        <div className="product-image-wrapper">
          <div className="product-image">
            <img src={product.image} alt={product.name} loading="lazy" />

            {/* Overlay gradient */}
            <div className="product-image-overlay"></div>
          </div>

          {/* Badges */}
          <div className="product-badges">
            {product.discount > 0 && (
              <span className="badge badge-discount">
                -{product.discount}%
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="badge badge-limited">
                Only {product.stock} left
              </span>
            )}
            {product.stock === 0 && (
              <span className="badge badge-sold-out">
                Sold Out
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="product-quick-actions">
            <button
              className={`quick-action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={handleWishlist}
              aria-label="Add to wishlist"
            >
              <FaHeart />
            </button>
            <Link
              to={`/product/${product._id}`}
              className="quick-action-btn view-btn"
              aria-label="Quick view"
            >
              <FaEye />
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>

          <div className="product-rating">
            <div className="stars">{renderStars()}</div>
            <span className="rating-text">
              {product.rating?.toFixed(1) || '0.0'} ({product.numReviews || 0})
            </span>
          </div>

          <div className="product-price-row">
            <div className="product-price">
              <span className="current-price">${product.price?.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding}
      >
        <span className="btn-content">
          <FaShoppingCart className="cart-icon" />
          <span className="btn-text">
            {product.stock === 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'}
          </span>
        </span>
        <span className="btn-bg"></span>
      </button>
    </div>
  );
};

export default ProductCard;
