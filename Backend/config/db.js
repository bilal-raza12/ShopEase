const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create default admin user if not exists
    const User = require('../models/User');
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@shopease.com' });

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@shopease.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        role: 'admin'
      });
      console.log('Default admin user created');
    }

    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Don't exit in production - let the app start and retry
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
