# Configuration MongoDB - SmartShop TN

Guide pour configurer MongoDB pour SmartShop TN.

## 🔧 Options de Configuration

### Option 1: MongoDB avec Docker (Recommandé)

#### Démarrer MongoDB avec Docker

```bash
# Démarrer uniquement MongoDB
docker-compose up -d mongodb

# Vérifier que MongoDB est démarré
docker ps
```

#### Configuration .env pour Docker

Dans `backend/.env`:

```env
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
```

### Option 2: MongoDB Local (Sans Authentification)

#### Installation MongoDB Local

**Windows:**
1. Télécharger depuis [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Installer MongoDB
3. Démarrer le service MongoDB

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

#### Configuration .env pour MongoDB Local

Dans `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/smarthop
```

### Option 3: MongoDB Atlas (Cloud)

#### Créer un Cluster MongoDB Atlas

1. Aller sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un compte gratuit
3. Créer un cluster
4. Obtenir la connection string

#### Configuration .env pour MongoDB Atlas

Dans `backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarthop?retryWrites=true&w=majority
```

## 🐛 Résolution des Problèmes d'Authentification

### Problème: "Authentication failed"

#### Solution 1: Utiliser MongoDB sans authentification (Développement local)

Modifiez `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/smarthop
```

#### Solution 2: Créer l'utilisateur admin dans MongoDB

Si vous utilisez Docker avec authentification:

```bash
# Se connecter à MongoDB
docker exec -it smarthop-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin

# Créer la base de données et l'utilisateur
use smarthop
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [{ role: "readWrite", db: "smarthop" }]
})
```

#### Solution 3: Réinitialiser MongoDB Docker

```bash
# Arrêter et supprimer le container
docker-compose down -v

# Redémarrer
docker-compose up -d mongodb

# Attendre quelques secondes que MongoDB démarre
sleep 10

# Vérifier les logs
docker-compose logs mongodb
```

### Problème: "Connection refused"

#### Vérifier que MongoDB est démarré

```bash
# Docker
docker ps | grep mongodb

# Local
# Windows: Vérifier les services Windows
# Linux: sudo systemctl status mongodb
# macOS: brew services list
```

#### Vérifier le port

MongoDB utilise le port 27017 par défaut. Vérifiez qu'il n'est pas utilisé:

```bash
# Windows
netstat -ano | findstr :27017

# Linux/macOS
sudo lsof -i :27017
```

### Problème: "Database not found"

MongoDB crée automatiquement la base de données lors de la première connexion. Pas besoin de la créer manuellement.

## ✅ Vérification

### Tester la connexion MongoDB

#### Avec Docker

```bash
docker exec -it smarthop-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

#### Avec MongoDB Local

```bash
mongosh
```

#### Tester depuis Node.js

```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(err => { console.error('❌ Error:', err.message); process.exit(1); });"
```

## 🔄 Changer de Configuration

### Passer de Docker à MongoDB Local

1. Modifier `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/smarthop
   ```

2. Démarrer MongoDB local

3. Redémarrer le backend

### Passer de MongoDB Local à Docker

1. Modifier `backend/.env`:
   ```env
   MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
   ```

2. Démarrer MongoDB Docker:
   ```bash
   docker-compose up -d mongodb
   ```

3. Redémarrer le backend

## 📝 Exemples de Configuration

### Développement Local (Sans Auth)

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/smarthop
JWT_SECRET=dev-secret-key
JWT_EXPIRE=7d
```

### Développement avec Docker

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
JWT_SECRET=dev-secret-key
JWT_EXPIRE=7d
```

### Production

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/smarthop?retryWrites=true&w=majority
JWT_SECRET=very-secure-secret-key-change-this
JWT_EXPIRE=24h
```

## 🚀 Démarrage Rapide

### Option Simple (Sans Authentification)

1. Modifier `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/smarthop
   ```

2. Démarrer MongoDB local

3. Démarrer le backend:
   ```bash
   cd backend
   npm run dev
   ```

## 📚 Ressources

- [Documentation MongoDB](https://www.mongodb.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Docker MongoDB](https://hub.docker.com/_/mongo)


