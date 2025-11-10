const request = require('supertest');
const app = require('../../src/server');
const Product = require('../../src/models/Product');
const User = require('../../src/models/User');
const mongoose = require('mongoose');
const { generateToken } = require('../../src/utils/jwt');

describe('Products Integration Tests', () => {
  let adminToken;
  let clientToken;

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

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin',
    });
    adminToken = generateToken(admin._id);

    // Create client user
    const client = await User.create({
      name: 'Client',
      email: 'client@test.com',
      password: 'client123',
      role: 'client',
    });
    clientToken = generateToken(client._id);
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      await Product.create({
        name: 'Test Product',
        description: 'Test',
        price: 10,
        category: 'Épicerie',
        stock: 100,
        origin: 'Tunis',
      });

      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.products).toBeDefined();
      expect(response.body.products.length).toBe(1);
    });

    it('should filter products by category', async () => {
      await Product.create([
        {
          name: 'Product 1',
          description: 'Test',
          price: 10,
          category: 'Épicerie',
          stock: 100,
          origin: 'Tunis',
        },
        {
          name: 'Product 2',
          description: 'Test',
          price: 20,
          category: 'Artisanat',
          stock: 50,
          origin: 'Sfax',
        },
      ]);

      const response = await request(app)
        .get('/api/products?category=Épicerie')
        .expect(200);

      expect(response.body.products.length).toBe(1);
      expect(response.body.products[0].category).toBe('Épicerie');
    });
  });

  describe('POST /api/products', () => {
    it('should create product as admin', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 15,
        category: 'Épicerie',
        stock: 50,
        origin: 'Tunis',
        image: 'https://example.com/image.jpg',
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData)
        .expect(201);

      expect(response.body.product.name).toBe(productData.name);
      expect(response.body.product.price).toBe(productData.price);
      expect(response.body.product.category).toBe(productData.category);
    });

    it('should validate required fields when creating product', async () => {
      const invalidProductData = {
        name: 'Test',
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidProductData)
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });

    it('should validate category enum', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test',
        price: 10,
        category: 'InvalidCategory',
        stock: 50,
        origin: 'Tunis',
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData)
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });

    it('should not create product as client', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 15,
        category: 'Épicerie',
        stock: 50,
        origin: 'Tunis',
      };

      await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(productData)
        .expect(403);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product as admin', async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test',
        price: 10,
        category: 'Épicerie',
        stock: 100,
        origin: 'Tunis',
      });

      const updateData = {
        name: 'Updated Product',
        price: 20,
        stock: 75,
      };

      const response = await request(app)
        .put(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.product.name).toBe('Updated Product');
      expect(response.body.product.price).toBe(20);
      expect(response.body.product.stock).toBe(75);
    });

    it('should not update product as client', async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test',
        price: 10,
        category: 'Épicerie',
        stock: 100,
        origin: 'Tunis',
      });

      await request(app)
        .put(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send({ name: 'Updated Product' })
        .expect(403);
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      await request(app)
        .put(`/api/products/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Updated Product' })
        .expect(404);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product as admin', async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test',
        price: 10,
        category: 'Épicerie',
        stock: 100,
        origin: 'Tunis',
      });

      await request(app)
        .delete(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).toBeNull();
    });

    it('should not delete product as client', async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test',
        price: 10,
        category: 'Épicerie',
        stock: 100,
        origin: 'Tunis',
      });

      await request(app)
        .delete(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(403);
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      await request(app)
        .delete(`/api/products/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('GET /api/products - Filtering', () => {
    beforeEach(async () => {
      await Product.create([
        {
          name: 'Product 1',
          description: 'Test',
          price: 10,
          category: 'Épicerie',
          stock: 100,
          origin: 'Tunis',
        },
        {
          name: 'Product 2',
          description: 'Test',
          price: 20,
          category: 'Artisanat',
          stock: 50,
          origin: 'Sfax',
        },
        {
          name: 'Product 3',
          description: 'Test',
          price: 30,
          category: 'Épicerie',
          stock: 75,
          origin: 'Tunis',
        },
      ]);
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products?category=Épicerie')
        .expect(200);

      expect(response.body.products.length).toBe(2);
      response.body.products.forEach((product) => {
        expect(product.category).toBe('Épicerie');
      });
    });

    it('should search products by name', async () => {
      const response = await request(app)
        .get('/api/products?search=Product 1')
        .expect(200);

      expect(response.body.products.length).toBe(1);
      expect(response.body.products[0].name).toBe('Product 1');
    });
  });
});


