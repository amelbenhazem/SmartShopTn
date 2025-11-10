const Order = require('../models/Order');
const Product = require('../models/Product');
const { getCartData, carts } = require('./cartController');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    
    // Get cart directly
    const cart = getCartData(userId);
    
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide' });
    }

    const orderItems = [];
    let total = 0;

    // Process each cart item
    for (const item of cart) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Produit ${item.productId} non trouvé` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuffisant pour ${product.name}`,
        });
      }

      // Update stock
      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      total += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      total,
      status: 'confirmed',
      shippingAddress: req.body.shippingAddress || 'Tunis, Tunisia',
    });

    // Clear cart
    carts.set(userId, []);

    res.status(201).json({
      message: 'Commande créée avec succès',
      order: await Order.findById(order._id).populate('items.product'),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Check if user owns the order or is admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

