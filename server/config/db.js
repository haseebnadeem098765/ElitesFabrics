const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/elites-fabrics';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Ensure default admin exists
    const adminExists = await Admin.findOne();
    if (!adminExists) {
      const adminUser = process.env.ADMIN_USER || 'ElitesFabric';
      const adminPass = process.env.ADMIN_PASS || 'ElitesFabrics0909123';
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPass, salt);
      await new Admin({ username: adminUser, password: hashedPassword }).save();
      console.log(`Default Admin created -> Username: ${adminUser}, Password: [PROTECTED]`);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
