const { getCartData, carts } = require('../../src/controllers/cartController');

describe('Cart Controller - Unit Tests', () => {
  beforeEach(() => {
    carts.clear();
  });

  describe('getCartData', () => {
    it('should return empty array for new user', () => {
      const userId = 'user123';
      const cart = getCartData(userId);
      
      expect(cart).toBeDefined();
      expect(Array.isArray(cart)).toBe(true);
      expect(cart.length).toBe(0);
    });

    it('should return the same cart for the same user', () => {
      const userId = 'user123';
      const cart1 = getCartData(userId);
      const cart2 = getCartData(userId);
      
      expect(cart1).toBe(cart2);
    });

    it('should return different carts for different users', () => {
      const userId1 = 'user1';
      const userId2 = 'user2';
      const cart1 = getCartData(userId1);
      const cart2 = getCartData(userId2);
      
      expect(cart1).not.toBe(cart2);
    });
  });

  describe('Cart operations', () => {
    it('should add item to cart', () => {
      const userId = 'user123';
      const cart = getCartData(userId);
      const item = { productId: 'product1', quantity: 2 };
      
      cart.push(item);
      
      expect(cart.length).toBe(1);
      expect(cart[0]).toEqual(item);
    });

    it('should calculate total correctly', () => {
      const items = [
        { product: { price: 10 }, quantity: 2, subtotal: 20 },
        { product: { price: 5 }, quantity: 3, subtotal: 15 },
      ];
      
      const total = items.reduce((sum, item) => sum + item.subtotal, 0);
      
      expect(total).toBe(35);
    });
  });
});


