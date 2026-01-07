const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Seed products if database is empty
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const defaultProducts = [
        {
          name: 'Wireless Bluetooth Headphones',
          description: 'Experience premium sound quality with our Wireless Bluetooth Headphones. Features include active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions. Perfect for music lovers and professionals alike.',
          price: 79.99,
          originalPrice: 99.99,
          discount: 20,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'],
          stock: 50,
          rating: 4.5,
          numReviews: 128,
          features: ['Active Noise Cancellation', '30-Hour Battery Life', 'Bluetooth 5.0', 'Built-in Microphone', 'Foldable Design']
        },
        {
          name: 'Smart Watch Pro',
          description: 'Stay connected with the Smart Watch Pro. Track your fitness, receive notifications, and monitor your health with advanced sensors. Water-resistant design perfect for everyday use.',
          price: 199.99,
          originalPrice: 249.99,
          discount: 20,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
          images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
          stock: 30,
          rating: 4.8,
          numReviews: 256,
          features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-Day Battery']
        },
        {
          name: 'Premium Leather Bag',
          description: 'Elegant and durable genuine leather bag perfect for everyday use. Spacious compartments and premium finish make it ideal for work or travel.',
          price: 149.99,
          originalPrice: 149.99,
          discount: 0,
          category: 'Fashion',
          image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300',
          images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'],
          stock: 25,
          rating: 4.3,
          numReviews: 89,
          features: ['Genuine Leather', 'Multiple Compartments', 'Adjustable Strap']
        },
        {
          name: 'Running Shoes Elite',
          description: 'Professional running shoes with superior comfort and support. Breathable mesh upper and responsive cushioning for your best performance.',
          price: 129.99,
          originalPrice: 159.99,
          discount: 19,
          category: 'Sports',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
          images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
          stock: 45,
          rating: 4.7,
          numReviews: 312,
          features: ['Breathable Mesh', 'Responsive Cushioning', 'Durable Outsole']
        },
        {
          name: 'Organic Coffee Beans',
          description: 'Premium organic coffee beans sourced from sustainable farms. Rich, smooth flavor with notes of chocolate and caramel.',
          price: 24.99,
          originalPrice: 24.99,
          discount: 0,
          category: 'Food',
          image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300',
          images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600'],
          stock: 100,
          rating: 4.6,
          numReviews: 178,
          features: ['100% Organic', 'Fair Trade', 'Medium Roast']
        },
        {
          name: 'Minimalist Desk Lamp',
          description: 'Modern LED desk lamp with adjustable brightness levels. Perfect for home office or study. Touch control and USB charging port.',
          price: 49.99,
          originalPrice: 69.99,
          discount: 29,
          category: 'Home',
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300',
          images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600'],
          stock: 35,
          rating: 4.4,
          numReviews: 67,
          features: ['LED Technology', 'Touch Control', 'USB Charging Port', 'Adjustable Brightness']
        },
        {
          name: 'Portable Power Bank',
          description: '20000mAh power bank with fast charging capability. Charge multiple devices simultaneously. Compact and travel-friendly design.',
          price: 39.99,
          originalPrice: 39.99,
          discount: 0,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300',
          images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600'],
          stock: 80,
          rating: 4.2,
          numReviews: 203,
          features: ['20000mAh Capacity', 'Fast Charging', 'Dual USB Ports']
        },
        {
          name: 'Yoga Mat Premium',
          description: 'Extra thick yoga mat with non-slip surface. Eco-friendly materials and carrying strap included. Perfect for yoga, pilates, or home workouts.',
          price: 34.99,
          originalPrice: 44.99,
          discount: 22,
          category: 'Sports',
          image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300',
          images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600'],
          stock: 60,
          rating: 4.5,
          numReviews: 156,
          features: ['Extra Thick', 'Non-Slip Surface', 'Eco-Friendly', 'Carrying Strap']
        },
        {
          name: 'Vintage Sunglasses',
          description: 'Classic vintage-style sunglasses with UV protection. Lightweight frame and polarized lenses for superior eye protection.',
          price: 59.99,
          originalPrice: 59.99,
          discount: 0,
          category: 'Fashion',
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
          images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600'],
          stock: 40,
          rating: 4.1,
          numReviews: 94,
          features: ['UV Protection', 'Polarized Lenses', 'Lightweight Frame']
        },
        {
          name: 'Ceramic Plant Pot',
          description: 'Beautiful ceramic plant pot with drainage hole. Modern minimalist design perfect for indoor plants and home decor.',
          price: 29.99,
          originalPrice: 29.99,
          discount: 0,
          category: 'Home',
          image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300',
          images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600'],
          stock: 55,
          rating: 4.3,
          numReviews: 72,
          features: ['Drainage Hole', 'Handcrafted', 'Modern Design']
        },
        {
          name: 'Wireless Earbuds',
          description: 'True wireless earbuds with premium sound quality. Active noise cancellation and 24-hour battery life with charging case.',
          price: 89.99,
          originalPrice: 119.99,
          discount: 25,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300',
          images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600'],
          stock: 70,
          rating: 4.6,
          numReviews: 234,
          features: ['True Wireless', 'Active Noise Cancellation', '24-Hour Battery', 'Touch Controls']
        },
        {
          name: 'Fitness Tracker Band',
          description: 'Slim fitness tracker with heart rate monitoring. Track steps, sleep, and workouts. Water-resistant and week-long battery.',
          price: 49.99,
          originalPrice: 49.99,
          discount: 0,
          category: 'Sports',
          image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300',
          images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600'],
          stock: 85,
          rating: 4.4,
          numReviews: 189,
          features: ['Heart Rate Monitor', 'Sleep Tracking', 'Water Resistant', '7-Day Battery']
        }
      ];

      await Product.insertMany(defaultProducts);
      console.log('Default products seeded');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Call seed function on module load
seedProducts();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, sort, limit = 12, page = 1, search } = req.query;

    // Build query
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    let sortOption = {};
    if (sort === 'price-low') {
      sortOption.price = 1;
    } else if (sort === 'price-high') {
      sortOption.price = -1;
    } else if (sort === 'rating') {
      sortOption.rating = -1;
    } else {
      sortOption.createdAt = -1;
    }

    // Get total count
    const total = await Product.countDocuments(query);

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.json({
      products,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      total
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    }).limit(20);

    res.json(products);
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
