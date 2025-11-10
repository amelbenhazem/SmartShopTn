const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;


