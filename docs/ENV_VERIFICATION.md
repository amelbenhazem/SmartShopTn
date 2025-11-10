# Vérification des Variables d'Environnement

Guide pour vérifier que les variables d'environnement sont correctement configurées.

## 🔍 Vérification Automatique

### Backend

Exécutez le script de vérification:

```bash
cd backend
npm run check:env
```

Ce script vérifie:
- ✅ `MONGODB_URI` - Connection string MongoDB
- ✅ `JWT_SECRET` - Secret pour JWT
- ℹ️  `NODE_ENV` - Environnement (development/production)
- ℹ️  `PORT` - Port du serveur
- ℹ️  `JWT_EXPIRE` - Durée d'expiration JWT

### Frontend

Exécutez le script de vérification:

```bash
cd frontend
npm run check:env
```

Ce script vérifie:
- ✅ `VITE_API_URL` - URL de l'API backend

## 📋 Vérification Manuelle

### Backend

Vérifiez que le fichier `backend/.env` contient:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

### Frontend

Vérifiez que le fichier `frontend/.env` contient:

```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

## ✅ Test de Connexion

### Backend

1. Démarrer le serveur:
   ```bash
   cd backend
   npm run dev
   ```

2. Vérifier les logs:
   - ✅ "Connected to MongoDB" - MongoDB connecté
   - ✅ "Server running on port 3000" - Serveur démarré
   - ⚠️  Avertissements si variables manquantes

3. Tester l'endpoint health:
   ```bash
   curl http://localhost:3000/health
   ```

### Frontend

1. Démarrer le serveur de développement:
   ```bash
   cd frontend
   npm run dev
   ```

2. Vérifier la console du navigateur:
   - 🌐 "API URL: http://localhost:3000/api" - URL chargée

3. Ouvrir les DevTools (F12) et vérifier:
   - Console: Pas d'erreurs de connexion
   - Network: Les requêtes API pointent vers la bonne URL

## 🐛 Dépannage

### Variables non chargées (Backend)

**Problème**: Les variables d'environnement ne sont pas chargées.

**Solutions**:
1. Vérifier que `backend/.env` existe
2. Vérifier que `require('dotenv').config()` est appelé au début de `server.js`
3. Redémarrer le serveur après modification de `.env`

### Variables non chargées (Frontend)

**Problème**: Les variables VITE_* ne sont pas accessibles.

**Solutions**:
1. Vérifier que les variables commencent par `VITE_`
2. Redémarrer le serveur de développement (Vite charge les variables au démarrage)
3. Vérifier que `frontend/.env` existe

### MongoDB ne se connecte pas

**Problème**: Erreur de connexion MongoDB.

**Solutions**:
1. Vérifier `MONGODB_URI` dans `backend/.env`
2. Vérifier que MongoDB est démarré
3. Tester la connection string:
   ```bash
   mongosh "mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin"
   ```

### API URL incorrecte (Frontend)

**Problème**: Le frontend ne peut pas se connecter au backend.

**Solutions**:
1. Vérifier `VITE_API_URL` dans `frontend/.env`
2. Vérifier que le backend est démarré
3. Vérifier que les ports correspondent (3000 pour backend, 5173 pour frontend)
4. Redémarrer le serveur frontend après modification

## 📝 Exemple de Sortie

### Backend - Succès

```
🔍 Vérification des variables d'environnement...

📋 Variables requises:
  ✅ MONGODB_URI: mongodb://***:***@localhost:27017/smarthop?authSource=admin
  ✅ JWT_SECRET: your-super... (45 caractères)

📋 Variables optionnelles:
  ℹ️  NODE_ENV: development
  ℹ️  PORT: 3000
  ℹ️  JWT_EXPIRE: 7d

✅ Toutes les variables requises sont définies!
```

### Frontend - Succès

```
🔍 Vérification des variables d'environnement (Frontend)...

📋 Variables trouvées dans .env:
  ✅ VITE_API_URL: http://localhost:3000/api
  ✅ VITE_NODE_ENV: development

📋 Variables requises:
  ✅ VITE_API_URL: http://localhost:3000/api

✅ Toutes les variables requises sont définies!
💡 Note: Les variables VITE_* sont chargées au build time par Vite
```

## 🔐 Sécurité

⚠️ **IMPORTANT**:
- Ne commitez jamais les fichiers `.env` dans Git
- Utilisez des secrets forts en production
- Changez `JWT_SECRET` en production
- Ne partagez pas vos fichiers `.env`

## 📚 Ressources

- [Guide de Configuration .env](./ENV_SETUP.md)
- [Documentation dotenv](https://www.npmjs.com/package/dotenv)
- [Documentation Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)


