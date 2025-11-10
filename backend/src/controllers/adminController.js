const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $in: ['confirmed', 'delivered'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        revenue: revenue.toFixed(2),
      },
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


