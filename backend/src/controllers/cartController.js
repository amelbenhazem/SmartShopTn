const Product = require('../models/Product');

// In-memory cart storage (in production, use Redis or database)
const carts = new Map();

const getCart = (userId) => {
  if (!carts.has(userId)) {
    carts.set(userId, []);
  }
  return carts.get(userId);
};

// Export getCart for use in other controllers
exports.getCartData = getCart;
exports.carts = carts;

exports.getCart = async (req, res) => {
  try {
    const cart = getCart(req.user._id.toString());
    const cartItems = [];

    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (product) {
        cartItems.push({
          product: {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock,
          },
          quantity: item.quantity,
          subtotal: product.price * item.quantity,
        });
      }
    }

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({
      items: cartItems,
      total: total.toFixed(2),
      currency: 'TND',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'ProductId et quantité requis' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Stock insuffisant' });
    }

    const cart = getCart(req.user._id.toString());
    const existingItem = cart.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    res.json({ message: 'Produit ajouté au panier', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantité valide requise' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Stock insuffisant' });
    }

    const cart = getCart(req.user._id.toString());
    const item = cart.find((item) => item.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: 'Article non trouvé dans le panier' });
    }

    item.quantity = quantity;

    res.json({ message: 'Panier mis à jour', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = getCart(req.user._id.toString());

    const index = cart.findIndex((item) => item.productId.toString() === productId);

    if (index === -1) {
      return res.status(404).json({ message: 'Article non trouvé dans le panier' });
    }

    cart.splice(index, 1);

    res.json({ message: 'Article supprimé du panier', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    carts.set(req.user._id.toString(), []);
    res.json({ message: 'Panier vidé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

