/**
 * Script pour vérifier les utilisateurs dans la base de données
 * Usage: node scripts/check-users.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const checkUsers = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthop';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find({});
    
    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé dans la base de données!');
      console.log('💡 Exécutez: npm run seed:users\n');
    } else {
      console.log(`📋 ${users.length} utilisateur(s) trouvé(s):\n`);
      users.forEach((user) => {
        console.log(`  - ${user.email} (${user.role})`);
        console.log(`    Nom: ${user.name}`);
        console.log(`    ID: ${user._id}`);
        console.log('');
      });
    }

    // Vérifier les utilisateurs spécifiques
    const admin = await User.findOne({ email: 'admin@smarthop.tn' });
    const client = await User.findOne({ email: 'client@smarthop.tn' });

    console.log('🔍 Vérification des utilisateurs par défaut:');
    console.log(`  Admin: ${admin ? '✅ Trouvé' : '❌ Non trouvé'}`);
    console.log(`  Client: ${client ? '✅ Trouvé' : '❌ Non trouvé'}`);

    if (!admin || !client) {
      console.log('\n💡 Pour créer les utilisateurs, exécutez:');
      console.log('   cd backend');
      console.log('   npm run seed:users');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

checkUsers();

