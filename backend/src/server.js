// Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log des requêtes en développement
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'SmartShop TN API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthop';
const PORT = process.env.PORT || 3000;

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET is not set. Using default (not secure for production)');
}

if (!MONGODB_URI || MONGODB_URI === 'mongodb://localhost:27017/smarthop') {
  console.warn('⚠️  WARNING: MONGODB_URI is using default value. Make sure MongoDB is running locally.');
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('💡 Make sure MongoDB is running and MONGODB_URI is correct in .env file');
    process.exit(1);
  });

module.exports = app;

