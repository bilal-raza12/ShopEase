const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, shipping, tax, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address ||
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      return res.status(400).json({ message: 'Please provide complete shipping address' });
    }

    const order = new Order({
      user: req.user._id,
      items: items.map(item => ({
        product: item._id || item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      })),
      shippingAddress: {
        fullName: shippingAddress.fullName,
        email: shippingAddress.email || req.user.email,
        phone: shippingAddress.phone || '',
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country || 'United States'
      },
      paymentMethod: paymentMethod || 'Credit Card',
      subtotal,
      shipping,
      tax,
      total,
      status: 'processing',
      isPaid: true,
      paidAt: new Date()
    });

    const createdOrder = await order.save();

    // Clear user's cart after successful order
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders
// @desc    Get logged in user orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user or user is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (order.status === 'delivered') {
      return res.status(400).json({ message: 'Cannot cancel a delivered order' });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    order.status = 'cancelled';
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
