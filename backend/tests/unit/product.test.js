const Product = require('../../src/models/Product');

describe('Product Model', () => {
  it('should create a product with valid data', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10.00,
      category: 'Épicerie',
      stock: 100,
      origin: 'Tunis, Tunisia',
    };

    const product = new Product(productData);
    const validationError = product.validateSync();

    expect(validationError).toBeUndefined();
    expect(product.name).toBe(productData.name);
    expect(product.price).toBe(productData.price);
  });

  it('should require name field', async () => {
    const product = new Product({
      description: 'Test',
      price: 10,
      category: 'Épicerie',
    });

    const validationError = product.validateSync();
    expect(validationError.errors.name).toBeDefined();
  });

  it('should require price field', async () => {
    const product = new Product({
      name: 'Test Product',
      description: 'Test',
      category: 'Épicerie',
    });

    const validationError = product.validateSync();
    expect(validationError.errors.price).toBeDefined();
  });

  it('should validate category enum', async () => {
    const product = new Product({
      name: 'Test Product',
      description: 'Test',
      price: 10,
      category: 'Invalid Category',
    });

    const validationError = product.validateSync();
    expect(validationError.errors.category).toBeDefined();
  });
});


