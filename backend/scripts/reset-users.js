/**
 * Script pour supprimer et recréer les utilisateurs avec des mots de passe correctement hashés
 * Usage: node scripts/reset-users.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const users = [
  {
    name: 'Admin User',
    email: 'admin@smarthop.tn',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Test Client',
    email: 'client@smarthop.tn',
    password: 'client123',
    role: 'client',
  },
];

const resetUsers = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthop';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Supprimer tous les utilisateurs existants
    await User.deleteMany({});
    console.log('🗑️  Supprimé tous les utilisateurs existants\n');

    // Créer les utilisateurs un par un pour garantir le hashage
    console.log('🔧 Création des utilisateurs avec mots de passe hashés...\n');
    
    for (const userData of users) {
      // Créer une nouvelle instance pour déclencher le hook pre('save')
      const user = new User(userData);
      await user.save();
      
      // Vérifier que le mot de passe est bien hashé
      const savedUser = await User.findById(user._id).select('+password');
      const isHashed = savedUser.password.startsWith('$2a$') || savedUser.password.startsWith('$2b$');
      
      if (isHashed) {
        console.log(`  ✅ ${user.email} (${user.role}): Créé avec mot de passe hashé`);
      } else {
        console.log(`  ⚠️  ${user.email} (${user.role}): Créé mais mot de passe non hashé!`);
      }
    }
    
    console.log(`\n✅ ${users.length} utilisateur(s) créé(s) avec succès`);
    
    // Afficher un résumé
    console.log('\n📋 Utilisateurs disponibles:');
    console.log('  - admin@smarthop.tn / admin123 (admin)');
    console.log('  - client@smarthop.tn / client123 (client)');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error);
    process.exit(1);
  }
};

resetUsers();

