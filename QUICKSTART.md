# Démarrage Rapide - SmartShop TN

Guide rapide pour démarrer avec SmartShop TN en 5 minutes.

## Installation Express

### 1. Prérequis

- Node.js (v18+)
- Docker et Docker Compose (optionnel mais recommandé)

### 2. Installation

```bash
# Cloner le projet
git clone <repository-url>
cd smarthop-tn

# Installer les dépendances
npm run install:all
```

### 3. Configuration

#### Backend

Créer `backend/.env`:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

#### Frontend

Créer `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Démarrer avec Docker

```bash
# Démarrer tous les services
docker-compose up -d

# Initialiser les données (attendre 30 secondes)
sleep 30
docker-compose exec backend npm run seed:all
```

### 5. Accéder à l'application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

### 6. Comptes de test

#### Admin
- Email: `admin@smarthop.tn`
- Password: `admin123`

#### Client
- Email: `client@smarthop.tn`
- Password: `client123`

## Démarrage Manuel (sans Docker)

### 1. Démarrer MongoDB

```bash
# Linux/macOS
mongod

# Windows: Démarrer le service MongoDB
```

### 2. Mettre à jour backend/.env

```env
MONGODB_URI=mongodb://localhost:27017/smarthop
```

### 3. Initialiser les données

```bash
cd backend
npm run seed:all
```

### 4. Démarrer le backend

```bash
cd backend
npm run dev
```

### 5. Démarrer le frontend

```bash
cd frontend
npm run dev
```

## Tests Rapides

### Tests Backend

```bash
cd backend
npm test
```

### Tests Frontend

```bash
cd frontend
npm test
```

### Tests E2E

```bash
cd frontend
npm run test:e2e
```

## Commandes Utiles

```bash
# Installer toutes les dépendances
npm run install:all

# Démarrer avec Docker
docker-compose up -d

# Arrêter Docker
docker-compose down

# Voir les logs
docker-compose logs -f

# Seed les données
cd backend && npm run seed:all

# Linter
cd backend && npm run lint
cd frontend && npm run lint
```

## Prochaines Étapes

1. Lire le [README](./README.md) pour plus d'informations
2. Consulter la [Documentation API](./docs/API.md)
3. Explorer le [Guide de Développement](./docs/DEVELOPMENT.md)
4. Consulter le [Guide de Tests](./docs/TESTING.md)

## Dépannage

### MongoDB ne démarre pas

```bash
# Vérifier que MongoDB est installé
mongod --version

# Vérifier les permissions
sudo chown -R mongodb:mongodb /var/lib/mongodb
```

### Port déjà utilisé

```bash
# Changer le port dans .env
PORT=3001  # Backend
# Ou changer dans vite.config.js pour le frontend
```

### Erreurs de dépendances

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

## Support

Pour plus d'aide, consulter:
- [Guide d'Installation](./docs/SETUP.md)
- [Guide de Développement](./docs/DEVELOPMENT.md)
- [Documentation](./docs/)

Ou ouvrir une issue sur GitHub.


