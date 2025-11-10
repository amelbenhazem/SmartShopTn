const jwt = require('../../src/utils/jwt');

describe('JWT Utils', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = jwt.generateToken(userId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = jwt.generateToken(userId);
      const decoded = jwt.verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(userId);
    });

    it('should return null for an invalid token', () => {
      const invalidToken = 'invalid.token.here';
      const decoded = jwt.verifyToken(invalidToken);
      
      expect(decoded).toBeNull();
    });
  });
});


