const request = require('supertest');
const app = require('../../src/server');
const Product = require('../../src/models/Product');
const User = require('../../src/models/User');
const Order = require('../../src/models/Order');
const mongoose = require('mongoose');
const { generateToken } = require('../../src/utils/jwt');
const { getCartData, carts } = require('../../src/controllers/cartController');

describe('Orders Integration Tests', () => {
  let token;
  let userId;
  let product;

  beforeAll(async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthop-test';
    await mongoose.connect(MONGODB_URI);
  });

  afterAll(async () => {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    carts.clear();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    carts.clear();

    // Create user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    userId = user._id.toString();
    token = generateToken(user._id);

    // Create product
    product = await Product.create({
      name: 'Test Product',
      description: 'Test',
      price: 10,
      category: 'Épicerie',
      stock: 100,
      origin: 'Tunis',
    });
  });

  describe('POST /api/orders', () => {
    it('should create order from cart', async () => {
      // Add item to cart
      const cart = getCartData(userId);
      cart.push({ productId: product._id, quantity: 2 });

      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(response.body.order).toBeDefined();
      expect(response.body.order.total).toBe(20);
      expect(response.body.order.items.length).toBe(1);
    });

    it('should not create order with empty cart', async () => {
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(response.body.message).toContain('vide');
    });

    it('should update product stock after order', async () => {
      const initialStock = product.stock;
      const quantity = 5;

      // Add item to cart
      const cart = getCartData(userId);
      cart.push({ productId: product._id, quantity });

      await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      // Check stock was updated
      const updatedProduct = await Product.findById(product._id);
      expect(updatedProduct.stock).toBe(initialStock - quantity);
    });
  });

  describe('GET /api/orders', () => {
    it('should get user orders', async () => {
      // Create order
      const cart = getCartData(userId);
      cart.push({ productId: product._id, quantity: 2 });

      await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.orders).toBeDefined();
      expect(response.body.orders.length).toBe(1);
    });
  });
});


