const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Electronics', 'Fashion', 'Home', 'Sports', 'Food', 'Other']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  features: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
