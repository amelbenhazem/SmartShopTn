# Configuration des Variables d'Environnement

Guide pour configurer les variables d'environnement pour SmartShop TN.

## 📋 Fichiers .env

### Backend (`backend/.env`)

```env
# Environment: Development
NODE_ENV=development

# Server Port
PORT=3000

# MongoDB Connection String
# Pour Docker: utiliser mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
# Pour MongoDB local (sans auth): utiliser mongodb://localhost:27017/smarthop
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

### Frontend (`frontend/.env`)

```env
# API URL
# URL de l'API backend
VITE_API_URL=http://localhost:3000/api

# Environment
VITE_NODE_ENV=development
```

## 🔧 Configuration selon le Mode de Déploiement

### 1. Développement Local avec Docker

#### Backend `.env`

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

### 2. Développement Local sans Docker (MongoDB Local)

#### Backend `.env`

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/smarthop
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

### 3. Développement avec MongoDB Atlas (Cloud)

#### Backend `.env`

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarthop?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

### 4. Production

#### Backend `.env`

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://admin:secure-password@mongodb:27017/smarthop?authSource=admin
JWT_SECRET=your-very-secure-jwt-secret-key-change-this-in-production
JWT_EXPIRE=24h
```

#### Frontend `.env`

```env
VITE_API_URL=https://api.smarthop.tn/api
VITE_NODE_ENV=production
```

## 🔐 Sécurité

### JWT_SECRET

⚠️ **IMPORTANT**: Changez le `JWT_SECRET` en production avec une clé sécurisée et aléatoire.

**Génération d'une clé sécurisée:**

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL
openssl rand -hex 64
```

### MongoDB URI

⚠️ **IMPORTANT**: 
- Ne commitez jamais les fichiers `.env` dans Git
- Utilisez des mots de passe forts en production
- Utilisez MongoDB Atlas avec des credentials sécurisés en production

## 📝 Variables Disponibles

### Backend

| Variable | Description | Valeur par défaut | Requis |
|----------|-------------|-------------------|--------|
| `NODE_ENV` | Environnement (development/production) | `development` | Non |
| `PORT` | Port du serveur | `3000` | Non |
| `MONGODB_URI` | Connection string MongoDB | - | **Oui** |
| `JWT_SECRET` | Secret pour signer les JWT | - | **Oui** |
| `JWT_EXPIRE` | Durée d'expiration des JWT | `7d` | Non |

### Frontend

| Variable | Description | Valeur par défaut | Requis |
|----------|-------------|-------------------|--------|
| `VITE_API_URL` | URL de l'API backend | `http://localhost:3000/api` | **Oui** |
| `VITE_NODE_ENV` | Environnement | `development` | Non |

**Note**: Les variables frontend doivent commencer par `VITE_` pour être accessibles dans le code.

## 🚀 Installation

### Création des fichiers .env

#### Option 1: Copier depuis .env.example

```bash
# Backend
cd backend
cp .env.example .env

# Frontend
cd frontend
cp .env.example .env
```

#### Option 2: Créer manuellement

```bash
# Backend
cd backend
touch .env
# Puis éditer le fichier avec les valeurs appropriées

# Frontend
cd frontend
touch .env
# Puis éditer le fichier avec les valeurs appropriées
```

## ✅ Vérification

### Backend

```bash
cd backend
node -e "require('dotenv').config(); console.log('MONGODB_URI:', process.env.MONGODB_URI); console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Défini' : 'Non défini');"
```

### Frontend

Les variables d'environnement sont accessibles via `import.meta.env`:

```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

## 🔍 Dépannage

### Les variables ne sont pas chargées

1. Vérifier que le fichier `.env` existe
2. Vérifier que le fichier `.env` est dans le bon répertoire
3. Vérifier la syntaxe du fichier `.env` (pas d'espaces autour de `=`)
4. Redémarrer le serveur après modification

### MongoDB ne se connecte pas

1. Vérifier que MongoDB est démarré
2. Vérifier la connection string
3. Vérifier les credentials (username/password)
4. Vérifier que le port est correct (27017)

### JWT ne fonctionne pas

1. Vérifier que `JWT_SECRET` est défini
2. Vérifier que `JWT_SECRET` est assez long et sécurisé
3. Vérifier que `JWT_EXPIRE` est au bon format (ex: `7d`, `24h`)

## 📚 Ressources

- [Documentation dotenv](https://www.npmjs.com/package/dotenv)
- [Documentation Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Documentation MongoDB Connection String](https://www.mongodb.com/docs/manual/reference/connection-string/)


