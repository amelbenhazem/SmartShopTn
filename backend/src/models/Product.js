const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom du produit est requis'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    price: {
      type: Number,
      required: [true, 'Le prix est requis'],
      min: [0, 'Le prix doit être positif'],
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      enum: ['Épicerie', 'Artisanat', 'Beauté', 'Textiles'],
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300',
    },
    stock: {
      type: Number,
      required: [true, 'Le stock est requis'],
      min: [0, 'Le stock doit être positif'],
      default: 0,
    },
    origin: {
      type: String,
      required: [true, "L'origine est requise"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);


