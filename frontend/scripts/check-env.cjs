/**
 * Script de vérification des variables d'environnement (Frontend)
 * Note: Les variables VITE_* sont chargées au build time par Vite
 * Usage: node scripts/check-env.cjs
 */

const { readFileSync } = require('fs');
const { join } = require('path');

const envPath = join(__dirname, '..', '.env');

console.log('🔍 Vérification des variables d\'environnement (Frontend)...\n');

try {
  const envContent = readFileSync(envPath, 'utf-8');
  const envVars = {};

  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  console.log('📋 Variables trouvées dans .env:');
  Object.entries(envVars).forEach(([key, value]) => {
    if (key.startsWith('VITE_')) {
      console.log(`  ✅ ${key}: ${value}`);
    } else {
      console.log(`  ⚠️  ${key}: ${value} (doit commencer par VITE_)`);
    }
  });

  // Vérifier les variables requises
  const requiredVars = ['VITE_API_URL'];
  console.log('\n📋 Variables requises:');
  let hasErrors = false;

  requiredVars.forEach((key) => {
    if (envVars[key]) {
      console.log(`  ✅ ${key}: ${envVars[key]}`);
    } else {
      console.error(`  ❌ ${key}: NON DÉFINIE`);
      hasErrors = true;
    }
  });

  if (hasErrors) {
    console.error('\n❌ Certaines variables requises sont manquantes!');
    console.error('💡 Vérifiez votre fichier frontend/.env');
    process.exit(1);
  } else {
    console.log('\n✅ Toutes les variables requises sont définies!');
    console.log('💡 Note: Les variables VITE_* sont chargées au build time par Vite');
    process.exit(0);
  }
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error(`❌ Fichier .env non trouvé: ${envPath}`);
    console.error('💡 Créez le fichier frontend/.env avec les variables nécessaires');
  } else {
    console.error('❌ Erreur lors de la lecture du fichier .env:', error.message);
  }
  process.exit(1);
}


