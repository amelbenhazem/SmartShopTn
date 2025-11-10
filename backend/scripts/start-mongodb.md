# Guide de Démarrage MongoDB

## Option 1: MongoDB Local (Sans Authentification) - RECOMMANDÉ pour le développement

### Windows

1. **Télécharger et installer MongoDB:**
   - Aller sur: https://www.mongodb.com/try/download/community
   - Télécharger la version Windows
   - Installer avec les options par défaut

2. **Démarrer MongoDB:**
   - Ouvrir "Services" Windows (Win + R, puis `services.msc`)
   - Chercher "MongoDB" et démarrer le service
   - OU utiliser la ligne de commande:
     ```powershell
     net start MongoDB
     ```

3. **Vérifier que MongoDB est démarré:**
   ```powershell
   mongosh
   ```
   Si ça fonctionne, vous êtes connecté!

4. **Configuration .env:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/smarthop
   ```

### Linux

```bash
# Installer MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Démarrer MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Vérifier
mongosh
```

### macOS

```bash
# Installer avec Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Démarrer MongoDB
brew services start mongodb-community

# Vérifier
mongosh
```

## Option 2: MongoDB avec Docker

Si vous avez Docker installé:

```bash
# Démarrer MongoDB
docker-compose up -d mongodb

# Configuration .env
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
```

## Option 3: MongoDB Atlas (Cloud - Gratuit)

1. Créer un compte sur https://www.mongodb.com/cloud/atlas
2. Créer un cluster gratuit
3. Obtenir la connection string
4. Configuration .env:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarthop
   ```

## Vérification

```bash
# Tester la connexion
mongosh

# Ou depuis Node.js
cd backend
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/smarthop').then(() => console.log('✅ Connected!')).catch(err => console.error('❌', err.message));"
```


