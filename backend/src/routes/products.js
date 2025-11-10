const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

// Validation rules
const productValidation = [
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('description').trim().notEmpty().withMessage('La description est requise'),
  body('price').isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
  body('category')
    .isIn(['Épicerie', 'Artisanat', 'Beauté', 'Textiles'])
    .withMessage('Catégorie invalide'),
  body('stock').isInt({ min: 0 }).withMessage('Le stock doit être un entier positif'),
  body('origin').trim().notEmpty().withMessage("L'origine est requise"),
];

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Admin routes
router.post('/', protect, admin, productValidation, createProduct);
router.put('/:id', protect, admin, productValidation, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;


