const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@smarthop.tn',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Test Client',
    email: 'client@smarthop.tn',
    password: 'client123',
    role: 'client',
  },
];

const seedUsers = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthop';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Create users one by one to ensure password hashing works
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created user: ${user.email} (${user.role})`);
    }
    
    console.log(`✅ Seeded ${users.length} users successfully`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedUsers();
}

module.exports = { users, seedUsers };


