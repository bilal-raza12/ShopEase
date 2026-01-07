import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.discount > 0 && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>

          <div className="product-rating">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < Math.floor(product.rating) ? 'star filled' : 'star'}
              />
            ))}
            <span className="rating-count">({product.numReviews})</span>
          </div>

          <div className="product-price">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        <FaShoppingCart />
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
