# Guide d'Installation - SmartShop TN

Guide complet pour installer et configurer SmartShop TN.

## Prérequis

### Logiciels requis

- **Node.js**: v18 ou supérieur
- **MongoDB**: v7.0 ou supérieur (ou Docker)
- **npm**: v9 ou supérieur
- **Git**: Dernière version

### Vérification

```bash
node --version  # Doit être >= 18
npm --version   # Doit être >= 9
mongod --version # Doit être >= 7.0 (si MongoDB local)
docker --version # Si utilisation de Docker
```

## Installation

### Option 1: Installation avec Docker (Recommandé)

#### 1. Cloner le repository

```bash
git clone <repository-url>
cd smarthop-tn
```

#### 2. Configurer les variables d'environnement

Créer `backend/.env`:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/smarthop?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

Créer `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

#### 3. Démarrer avec Docker Compose

```bash
docker-compose up -d
```

#### 4. Initialiser les données

```bash
# Attendre que les services soient prêts (30 secondes)
sleep 30

# Seed les données
docker-compose exec backend npm run seed:all
```

#### 5. Accéder à l'application

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- MongoDB: mongodb://localhost:27017

### Option 2: Installation manuelle

#### 1. Cloner le repository

```bash
git clone <repository-url>
cd smarthop-tn
```

#### 2. Installer MongoDB

##### Option A: MongoDB local

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Windows
# Télécharger depuis https://www.mongodb.com/try/download/community
```

##### Option B: MongoDB Atlas (Cloud)

1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster
3. Obtenir la connection string

#### 3. Configurer les variables d'environnement

Créer `backend/.env`:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/smarthop
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

Créer `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

#### 4. Installer les dépendances

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

#### 5. Démarrer MongoDB

```bash
# Linux/macOS
mongod

# Windows
# Démarrer MongoDB depuis les services Windows
```

#### 6. Initialiser les données

```bash
cd backend
npm run seed:all
```

#### 7. Démarrer les services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### 8. Accéder à l'application

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Configuration SonarQube (Optionnel)

### 1. Démarrer SonarQube

```bash
docker-compose -f docker-compose.sonar.yml up -d
```

### 2. Accéder à SonarQube

- URL: http://localhost:9000
- Login: admin
- Password: admin (changer au premier login)

### 3. Analyser le code

```bash
# Installer SonarScanner
# Puis exécuter
sonar-scanner
```

## Comptes par défaut

### Admin
- Email: `admin@smarthop.tn`
- Password: `admin123`

### Client
- Email: `client@smarthop.tn`
- Password: `client123`

## Dépannage

### Problèmes courants

#### 1. Erreur de connexion MongoDB

**Solution:**
- Vérifier que MongoDB est démarré
- Vérifier la connection string dans `.env`
- Vérifier les permissions MongoDB

#### 2. Port déjà utilisé

**Solution:**
- Changer le port dans `.env`
- Arrêter le processus utilisant le port

#### 3. Erreur d'installation des dépendances

**Solution:**
- Supprimer `node_modules` et `package-lock.json`
- Réinstaller avec `npm install`

#### 4. Erreur CORS

**Solution:**
- Vérifier que le backend autorise les requêtes du frontend
- Vérifier la configuration CORS dans `backend/src/server.js`

### Logs

#### Backend
```bash
# Docker
docker-compose logs -f backend

# Local
# Les logs s'affichent dans la console
```

#### Frontend
```bash
# Docker
docker-compose logs -f frontend

# Local
# Les logs s'affichent dans la console
```

#### MongoDB
```bash
# Docker
docker-compose logs -f mongodb

# Local
# Vérifier les logs MongoDB
```

## Vérification de l'installation

### 1. Vérifier le backend

```bash
curl http://localhost:3000/health
```

Réponse attendue:
```json
{
  "status": "OK",
  "message": "SmartShop TN API is running"
}
```

### 2. Vérifier le frontend

Ouvrir http://localhost:5173 dans un navigateur.

### 3. Vérifier MongoDB

```bash
# Docker
docker-compose exec mongodb mongosh -u admin -p admin123 --authenticationDatabase admin

# Local
mongosh
```

### 4. Vérifier les endpoints API

```bash
# Liste des produits
curl http://localhost:3000/api/products

# Health check
curl http://localhost:3000/health
```

## Prochaines étapes

1. Lire le [Guide de Développement](./DEVELOPMENT.md)
2. Lire le [Guide de Tests](./TESTING.md)
3. Explorer l'[Architecture](./ARCHITECTURE.md)

## Support

Pour toute question ou problème:
1. Vérifier la section Dépannage
2. Consulter la documentation
3. Ouvrir une issue sur le repository


