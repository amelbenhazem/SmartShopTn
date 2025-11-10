/**
 * Script de vérification des variables d'environnement
 * Usage: node scripts/check-env.js
 */

const path = require('path');
const fs = require('fs');

// Déterminer le chemin du fichier .env (dans le répertoire parent du script, donc backend/)
const envPath = path.join(__dirname, '..', '.env');

console.log(`📁 Recherche du fichier .env dans: ${envPath}\n`);

// Vérifier si le fichier .env existe
if (!fs.existsSync(envPath)) {
  console.error(`❌ Fichier .env non trouvé: ${envPath}`);
  console.error('💡 Créez le fichier backend/.env avec le contenu suivant:');
  console.error(`
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production-123456789
JWT_EXPIRE=7d
  `);
  process.exit(1);
}

// Charger les variables d'environnement
require('dotenv').config({ path: envPath });

const requiredVars = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

const optionalVars = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '3000',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
};

console.log('🔍 Vérification des variables d\'environnement...\n');

let hasErrors = false;

// Vérifier les variables requises
console.log('📋 Variables requises:');
Object.entries(requiredVars).forEach(([key, value]) => {
  if (!value) {
    console.error(`  ❌ ${key}: NON DÉFINIE`);
    hasErrors = true;
  } else {
    // Masquer les valeurs sensibles
    if (key === 'JWT_SECRET') {
      console.log(`  ✅ ${key}: ${value.substring(0, 10)}... (${value.length} caractères)`);
    } else if (key === 'MONGODB_URI') {
      // Masquer le mot de passe dans l'URI
      const masked = value.replace(/:\/\/[^:]+:[^@]+@/, '://***:***@');
      console.log(`  ✅ ${key}: ${masked}`);
    } else {
      console.log(`  ✅ ${key}: ${value}`);
    }
  }
});

// Afficher les variables optionnelles
console.log('\n📋 Variables optionnelles:');
Object.entries(optionalVars).forEach(([key, value]) => {
  console.log(`  ℹ️  ${key}: ${value}`);
});

if (hasErrors) {
  console.error('\n❌ Certaines variables requises sont manquantes!');
  console.error('💡 Vérifiez votre fichier backend/.env');
  process.exit(1);
} else {
  console.log('\n✅ Toutes les variables requises sont définies!');
  process.exit(0);
}

