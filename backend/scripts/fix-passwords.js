/**
 * Script pour re-hasher les mots de passe des utilisateurs existants
 * Usage: node scripts/fix-passwords.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

const fixPasswords = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smarthop';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find({}).select('+password');
    
    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé dans la base de données!');
      console.log('💡 Exécutez d\'abord: npm run seed:users\n');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`🔧 Correction de ${users.length} utilisateur(s)...\n`);

    for (const user of users) {
      // Vérifier si le mot de passe est déjà hashé (commence par $2a$ ou $2b$)
      const isHashed = user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'));
      
      if (isHashed) {
        console.log(`  ✅ ${user.email}: Mot de passe déjà hashé`);
      } else {
        console.log(`  🔧 ${user.email}: Re-hashage du mot de passe...`);
        
        // Définir le mot de passe en clair pour déclencher le hook pre('save')
        user.password = user.password; // Le hook va le hasher
        user.markModified('password'); // Forcer Mongoose à considérer le champ comme modifié
        await user.save();
        
        console.log(`  ✅ ${user.email}: Mot de passe hashé avec succès`);
      }
    }

    console.log(`\n✅ Correction terminée pour ${users.length} utilisateur(s)`);
    
    // Vérifier les utilisateurs par défaut
    console.log('\n🔍 Vérification des utilisateurs par défaut:');
    const admin = await User.findOne({ email: 'admin@smarthop.tn' }).select('+password');
    const client = await User.findOne({ email: 'client@smarthop.tn' }).select('+password');
    
    if (admin) {
      const adminPasswordHashed = admin.password.startsWith('$2a$') || admin.password.startsWith('$2b$');
      console.log(`  Admin: ${adminPasswordHashed ? '✅ Mot de passe hashé' : '❌ Mot de passe non hashé'}`);
    }
    
    if (client) {
      const clientPasswordHashed = client.password.startsWith('$2a$') || client.password.startsWith('$2b$');
      console.log(`  Client: ${clientPasswordHashed ? '✅ Mot de passe hashé' : '❌ Mot de passe non hashé'}`);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error);
    process.exit(1);
  }
};

fixPasswords();

