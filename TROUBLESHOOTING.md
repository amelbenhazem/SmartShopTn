# Guide de Dépannage - SmartShop TN

Guide pour résoudre les problèmes courants rencontrés lors du développement.

## Erreurs Courantes

### 1. Erreur Vite: `crypto$2.getRandomValues is not a function`

**Problème**: Cette erreur se produit généralement avec des versions incompatibles de Node.js ou Vite.

**Solutions**:

#### Solution 1: Vérifier la version de Node.js

```bash
node --version
```

Assurez-vous d'avoir Node.js v18 ou supérieur.

#### Solution 2: Réinstaller les dépendances

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### Solution 3: Mettre à jour Vite

```bash
cd frontend
npm install vite@latest @vitejs/plugin-react@latest
```

#### Solution 4: Utiliser une version spécifique de Node.js

Si vous utilisez `nvm`:

```bash
nvm install 18
nvm use 18
```

#### Solution 5: Vérifier la configuration Vite

Assurez-vous que `vite.config.js` contient:

```javascript
define: {
  global: 'globalThis',
},
```

### 2. Erreur MongoDB: Connection refused

**Problème**: MongoDB n'est pas démarré ou la connection string est incorrecte.

**Solutions**:

#### Solution 1: Vérifier que MongoDB est démarré

```bash
# Docker
docker-compose ps

# Local
mongod --version
```

#### Solution 2: Vérifier la connection string

Dans `backend/.env`, vérifiez:

```env
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
```

Pour MongoDB local (sans auth):

```env
MONGODB_URI=mongodb://localhost:27017/smarthop
```

#### Solution 3: Démarrer MongoDB

```bash
# Docker
docker-compose up -d mongodb

# Local Linux/macOS
mongod

# Local Windows
# Démarrer le service MongoDB depuis les services Windows
```

### 3. Erreur: Port déjà utilisé

**Problème**: Le port est déjà utilisé par un autre processus.

**Solutions**:

#### Solution 1: Trouver et arrêter le processus

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:3000 | xargs kill -9
```

#### Solution 2: Changer le port

Dans `backend/.env`:

```env
PORT=3001
```

Dans `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Erreur: Module not found

**Problème**: Les dépendances ne sont pas installées ou il y a un problème avec node_modules.

**Solutions**:

#### Solution 1: Réinstaller les dépendances

```bash
rm -rf node_modules package-lock.json
npm install
```

#### Solution 2: Vérifier les versions

Assurez-vous d'utiliser les bonnes versions de Node.js et npm.

#### Solution 3: Nettoyer le cache npm

```bash
npm cache clean --force
npm install
```

### 5. Erreur: CORS

**Problème**: Les requêtes du frontend sont bloquées par CORS.

**Solutions**:

#### Solution 1: Vérifier la configuration CORS

Dans `backend/src/server.js`, vérifiez:

```javascript
app.use(cors());
```

#### Solution 2: Configurer CORS spécifiquement

```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

### 6. Erreur: JWT token invalid

**Problème**: Le token JWT est invalide ou expiré.

**Solutions**:

#### Solution 1: Vérifier le secret JWT

Dans `backend/.env`:

```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

#### Solution 2: Vérifier l'expiration

Le token peut avoir expiré. Déconnectez-vous et reconnectez-vous.

#### Solution 3: Vérifier le format du token

Le token doit être dans le format: `Bearer <token>`

### 7. Erreur: Tests ne passent pas

**Problème**: Les tests échouent.

**Solutions**:

#### Solution 1: Vérifier la base de données de test

Assurez-vous d'utiliser une base de données de test séparée:

```env
MONGODB_URI=mongodb://localhost:27017/smarthop-test
```

#### Solution 2: Nettoyer les données de test

```bash
cd backend
npm run test -- --clearCache
```

#### Solution 3: Vérifier les mocks

Assurez-vous que les mocks sont correctement configurés.

### 8. Erreur: Tailwind CSS ne fonctionne pas

**Problème**: Les styles Tailwind ne sont pas appliqués.

**Solutions**:

#### Solution 1: Vérifier la configuration Tailwind

Dans `tailwind.config.js`, vérifiez:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

#### Solution 2: Vérifier l'import CSS

Dans `src/index.css`, assurez-vous d'avoir:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Solution 3: Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

### 9. Erreur: Playwright ne fonctionne pas

**Problème**: Les tests E2E échouent.

**Solutions**:

#### Solution 1: Installer les navigateurs

```bash
cd frontend
npx playwright install
```

#### Solution 2: Vérifier la configuration

Dans `playwright.config.js`, vérifiez la configuration.

#### Solution 3: Vérifier que le serveur est démarré

Assurez-vous que le serveur de développement est démarré avant d'exécuter les tests.

### 10. Erreur: Docker ne démarre pas

**Problème**: Les containers Docker ne démarrent pas.

**Solutions**:

#### Solution 1: Vérifier Docker

```bash
docker --version
docker-compose --version
```

#### Solution 2: Vérifier les logs

```bash
docker-compose logs
```

#### Solution 3: Reconstruire les images

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Commandes Utiles

### Nettoyer et réinstaller

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Vérifier les versions

```bash
node --version
npm --version
docker --version
```

### Réinitialiser la base de données

```bash
# Docker
docker-compose down -v
docker-compose up -d
docker-compose exec backend npm run seed:all

# Local
# Supprimer la base de données MongoDB
# Puis réexécuter les scripts de seed
```

## Support

Si le problème persiste:

1. Vérifier les logs détaillés
2. Consulter la documentation
3. Vérifier les issues GitHub
4. Ouvrir une nouvelle issue avec:
   - Description du problème
   - Messages d'erreur complets
   - Steps to reproduce
   - Versions de Node.js, npm, etc.

## Ressources

- [Documentation Node.js](https://nodejs.org/docs/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation MongoDB](https://www.mongodb.com/docs/)
- [Documentation Docker](https://docs.docker.com/)


