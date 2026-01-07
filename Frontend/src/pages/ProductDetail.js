import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { productService } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      // Use dummy product for demo
      setProduct(getDummyProduct());
    } finally {
      setLoading(false);
    }
  };

  const getDummyProduct = () => {
    const products = {
      '1': {
        _id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        originalPrice: 99.99,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
          'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600'
        ],
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        category: 'Electronics',
        rating: 4.5,
        numReviews: 128,
        stock: 50,
        discount: 20,
        description: 'Experience premium sound quality with our Wireless Bluetooth Headphones. Features include active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions. Perfect for music lovers and professionals alike.',
        features: [
          'Active Noise Cancellation',
          '30-Hour Battery Life',
          'Bluetooth 5.0',
          'Built-in Microphone',
          'Foldable Design'
        ]
      },
      '2': {
        _id: '2',
        name: 'Smart Watch Pro',
        price: 199.99,
        originalPrice: 249.99,
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'
        ],
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
        category: 'Electronics',
        rating: 4.8,
        numReviews: 256,
        stock: 30,
        discount: 20,
        description: 'Stay connected with the Smart Watch Pro. Track your fitness, receive notifications, and monitor your health with advanced sensors.',
        features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-Day Battery']
      }
    };
    return products[id] || products['1'];
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <Loading />;
  if (!product) return <div className="not-found">Product not found</div>;

  const images = product.images || [product.image];

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Products
      </button>

      <div className="product-detail-container">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={images[selectedImage]} alt={product.name} />
            {product.discount > 0 && (
              <span className="discount-badge">-{product.discount}%</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="thumbnail-list">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info-detail">
          <span className="product-category">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < Math.floor(product.rating) ? 'star filled' : 'star'}
              />
            ))}
            <span className="rating-text">
              {product.rating} ({product.numReviews} reviews)
            </span>
          </div>

          <div className="product-price-detail">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          {product.features && (
            <div className="product-features">
              <h3>Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="stock-status">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
                <FaPlus />
              </button>
            </div>

            <button
              className="add-to-cart-btn-detail"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <FaShoppingCart />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
