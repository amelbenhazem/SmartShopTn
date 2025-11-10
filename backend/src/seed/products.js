const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Huile d\'olive de Sfax',
    description: 'Huile d\'olive extra vierge de première qualité, produite dans la région de Sfax, réputée pour sa saveur fruitée et son arôme délicat.',
    price: 45.00,
    category: 'Épicerie',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    stock: 50,
    origin: 'Sfax, Tunisie',
  },
  {
    name: 'Dattes Deglet Nour de Tozeur',
    description: 'Dattes Deglet Nour premium, douces et charnues, cultivées dans les palmeraies de Tozeur. Un délice naturel riche en énergie.',
    price: 25.00,
    category: 'Épicerie',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4d6e3c4a?w=400',
    stock: 100,
    origin: 'Tozeur, Tunisie',
  },
  {
    name: 'Harissa du Cap Bon',
    description: 'Harissa traditionnelle piquante, préparée artisanalement avec des piments rouges du Cap Bon. Parfaite pour accompagner vos plats.',
    price: 12.00,
    category: 'Épicerie',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
    stock: 75,
    origin: 'Cap Bon, Tunisie',
  },
  {
    name: 'Fouta traditionnelle',
    description: 'Fouta en coton de qualité, tissée à la main selon les traditions tunisiennes. Disponible en plusieurs couleurs et motifs.',
    price: 35.00,
    category: 'Textiles',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
    stock: 30,
    origin: 'Kairouan, Tunisie',
  },
  {
    name: 'Blouza artisanale',
    description: 'Blouza traditionnelle tunisienne, brodée à la main avec des motifs authentiques. Robe élégante pour les occasions spéciales.',
    price: 120.00,
    category: 'Textiles',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    stock: 15,
    origin: 'Tunis, Tunisie',
  },
  {
    name: 'Savon noir de Nabeul',
    description: 'Savon noir traditionnel de Nabeul, à base d\'huile d\'olive et d\'argile. Excellent pour le soin de la peau et du corps.',
    price: 8.00,
    category: 'Beauté',
    image: 'https://images.unsplash.com/photo-1556228720-da9e0dc8267a?w=400',
    stock: 80,
    origin: 'Nabeul, Tunisie',
  },
  {
    name: 'Tapis berbère',
    description: 'Tapis berbère artisanal, tissé à la main avec des laines naturelles. Motifs traditionnels et couleurs vives.',
    price: 250.00,
    category: 'Artisanat',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
    stock: 10,
    origin: 'Gafsa, Tunisie',
  },
  {
    name: 'Poterie de Sejnane',
    description: 'Poteries traditionnelles de Sejnane, décorées à la main selon les techniques ancestrales. Pièces uniques et authentiques.',
    price: 40.00,
    category: 'Artisanat',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    stock: 25,
    origin: 'Sejnane, Tunisie',
  },
];

const seedProducts = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthop';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert products
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedProducts();
}

module.exports = { products, seedProducts };


