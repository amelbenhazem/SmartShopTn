const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/models/User');
const mongoose = require('mongoose');

describe('Auth Integration Tests', () => {
  beforeAll(async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthop-test';
    await mongoose.connect(MONGODB_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
    });

    it('should not register user with existing email', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await User.create(userData);

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('déjà utilisé');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' })
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should not login with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
        .expect(401);

      expect(response.body.message).toContain('incorrect');
    });
  });

  describe('GET /api/auth/me', () => {
    let token;

    beforeEach(async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      token = loginResponse.body.token;
    });

    it('should get current user with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should not get user without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.message).toContain('token');
    });
  });
});


