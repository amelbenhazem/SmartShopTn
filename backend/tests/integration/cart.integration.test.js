const request = require('supertest');
const app = require('../../src/server');
const Product = require('../../src/models/Product');
const User = require('../../src/models/User');
const mongoose = require('mongoose');
const { generateToken } = require('../../src/utils/jwt');

describe('Cart Integration Tests', () => {
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
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
    await User.deleteMany({});

    // Create user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    userId = user._id;
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

  describe('POST /api/cart', () => {
    it('should add product to cart', async () => {
      const response = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: product._id, quantity: 2 })
        .expect(200);

      expect(response.body.message).toContain('ajouté');
    });

    it('should not add product without authentication', async () => {
      await request(app)
        .post('/api/cart')
        .send({ productId: product._id, quantity: 2 })
        .expect(401);
    });
  });

  describe('GET /api/cart', () => {
    it('should get cart items', async () => {
      // Add item to cart first
      await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: product._id, quantity: 2 });

      const response = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.items).toBeDefined();
      expect(response.body.total).toBeDefined();
      expect(response.body.items.length).toBe(1);
    });
  });

  describe('PUT /api/cart/:productId', () => {
    it('should update cart item quantity', async () => {
      // Add item to cart first
      await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: product._id, quantity: 2 });

      const response = await request(app)
        .put(`/api/cart/${product._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ quantity: 5 })
        .expect(200);

      expect(response.body.message).toContain('mis à jour');
    });
  });

  describe('DELETE /api/cart/:productId', () => {
    it('should remove item from cart', async () => {
      // Add item to cart first
      await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: product._id, quantity: 2 });

      const response = await request(app)
        .delete(`/api/cart/${product._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.message).toContain('supprimé');
    });
  });
});


