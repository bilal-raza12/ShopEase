const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');

// ==================== DASHBOARD ====================

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      recentOrders,
      orderStats
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email'),
      Order.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$total' }
          }
        }
      ])
    ]);

    // Calculate total revenue
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders,
      orderStats
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== USER MANAGEMENT ====================

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({
      users,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/users/:id
// @desc    Get user by ID
// @access  Private/Admin
router.get('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's orders count
    const ordersCount = await Order.countDocuments({ user: user._id });

    res.json({ ...user.toObject(), ordersCount });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/users/:id', protect, admin, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email.toLowerCase();
    }

    if (name) user.name = name;
    if (role && ['user', 'admin'].includes(role)) user.role = role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting own account
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== PRODUCT MANAGEMENT ====================

// @route   GET /api/admin/products
// @desc    Get all products (admin view)
// @access  Private/Admin
router.get('/products', protect, admin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({
      products,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/products
// @desc    Create a product
// @access  Private/Admin
router.post('/products', protect, admin, async (req, res) => {
  try {
    const {
      name, description, price, originalPrice, discount,
      category, image, images, stock, features
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = new Product({
      name,
      description,
      price,
      originalPrice: originalPrice || price,
      discount: discount || 0,
      category,
      image,
      images: images || [image],
      stock: stock || 0,
      features: features || []
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/products/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const {
      name, description, price, originalPrice, discount,
      category, image, images, stock, rating, numReviews, features
    } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
    product.discount = discount !== undefined ? discount : product.discount;
    product.category = category || product.category;
    product.image = image || product.image;
    product.images = images || product.images;
    product.stock = stock !== undefined ? stock : product.stock;
    product.rating = rating !== undefined ? rating : product.rating;
    product.numReviews = numReviews !== undefined ? numReviews : product.numReviews;
    product.features = features || product.features;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/products/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== ORDER MANAGEMENT ====================

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { _id: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({
      orders,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/orders/:id
// @desc    Get order by ID
// @access  Private/Admin
router.get('/orders/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/orders/:id
// @desc    Update order status
// @access  Private/Admin
router.put('/orders/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { status, isPaid, isDelivered } = req.body;

    if (status) {
      order.status = status;

      // Auto-update delivery status
      if (status === 'delivered') {
        order.isDelivered = true;
        order.deliveredAt = new Date();
      }
    }

    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      if (isPaid) {
        order.paidAt = new Date();
      }
    }

    if (isDelivered !== undefined) {
      order.isDelivered = isDelivered;
      if (isDelivered) {
        order.deliveredAt = new Date();
        order.status = 'delivered';
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/orders/:id
// @desc    Delete order
// @access  Private/Admin
router.delete('/orders/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
