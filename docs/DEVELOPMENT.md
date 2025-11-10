# Guide de Développement - SmartShop TN

Ce guide décrit comment configurer et développer l'application SmartShop TN.

## Prérequis

- Node.js (v18 ou supérieur)
- MongoDB (v7.0 ou supérieur) ou Docker
- npm ou yarn
- Git

## Installation

### 1. Cloner le projet

```bash
git clone <repository-url>
cd smarthop-tn
```

### 2. Installer les dépendances

```bash
# Installer toutes les dépendances
npm run install:all

# Ou manuellement
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configuration de l'environnement

#### Backend

Créer un fichier `backend/.env`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/smarthop?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

#### Frontend

Créer un fichier `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Initialiser la base de données

```bash
# Démarrer MongoDB (si local)
# Ou utiliser Docker Compose
docker-compose up -d mongodb

# Seed les données
cd backend
npm run seed:all
```

## Démarrage

### Développement local

#### Option 1: Docker Compose (recommandé)

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

#### Option 2: Manuel

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

### Accès à l'application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- MongoDB: mongodb://localhost:27017

## Structure du Code

### Backend

```
backend/
├── src/
│   ├── models/          # Modèles Mongoose
│   ├── routes/          # Routes API
│   ├── controllers/     # Contrôleurs
│   ├── middleware/      # Middleware
│   ├── utils/           # Utilitaires
│   └── seed/            # Scripts de seed
├── tests/               # Tests
│   ├── unit/            # Tests unitaires
│   └── integration/     # Tests d'intégration
└── package.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/      # Composants React
│   ├── pages/           # Pages
│   ├── contexts/        # Contextes React
│   ├── services/        # Services API
│   └── tests/           # Tests
├── tests/               # Tests E2E
│   └── e2e/             # Tests Playwright
└── package.json
```

## Développement

### Backend

#### Créer un nouveau endpoint

1. Créer le modèle (si nécessaire) dans `src/models/`
2. Créer le contrôleur dans `src/controllers/`
3. Créer la route dans `src/routes/`
4. Enregistrer la route dans `src/server.js`

#### Exemple:

```javascript
// src/controllers/exampleController.js
exports.getExample = async (req, res) => {
  res.json({ message: 'Example' });
};

// src/routes/example.js
const router = express.Router();
router.get('/', exampleController.getExample);
module.exports = router;

// src/server.js
app.use('/api/example', require('./routes/example'));
```

### Frontend

#### Créer un nouveau composant

1. Créer le composant dans `src/components/`
2. Importer et utiliser dans les pages

#### Exemple:

```javascript
// src/components/Example.jsx
const Example = () => {
  return <div>Example Component</div>;
};

export default Example;
```

## Tests

### Exécuter les tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test

# E2E
cd frontend && npm run test:e2e
```

### Écrire des tests

#### Test unitaire (Backend)

```javascript
// tests/unit/example.test.js
describe('Example', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

#### Test de composant (Frontend)

```javascript
// src/tests/components/Example.test.jsx
import { render, screen } from '@testing-library/react';
import Example from '../../components/Example';

describe('Example', () => {
  it('should render', () => {
    render(<Example />);
    expect(screen.getByText('Example Component')).toBeInTheDocument();
  });
});
```

## Linting et Formatage

### ESLint

```bash
# Backend
cd backend && npm run lint

# Frontend
cd frontend && npm run lint
```

### Prettier

```bash
# Backend
cd backend && npx prettier --write "src/**/*.js"

# Frontend
cd frontend && npm run format
```

## Débogage

### Backend

- Utiliser `console.log()` pour le débogage
- Utiliser les outils de débogage Node.js
- Vérifier les logs MongoDB

### Frontend

- Utiliser React DevTools
- Utiliser les outils de débogage du navigateur
- Vérifier la console du navigateur

## Bonnes Pratiques

### Code

1. **Nommage**: Utiliser des noms descriptifs
2. **Commentaires**: Commenter le code complexe
3. **DRY**: Ne pas répéter le code
4. **SOLID**: Suivre les principes SOLID
5. **Tests**: Écrire des tests pour chaque fonctionnalité

### Git

1. **Branches**: Utiliser des branches pour les fonctionnalités
2. **Commits**: Faire des commits réguliers et descriptifs
3. **Messages**: Utiliser des messages de commit clairs
4. **Pull Requests**: Créer des PR pour les changements

### Sécurité

1. **Secrets**: Ne jamais commiter les secrets
2. **Validation**: Valider toutes les entrées
3. **Authentification**: Utiliser JWT pour l'authentification
4. **Autorisation**: Vérifier les permissions

## Ressources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)

## Support

Pour toute question ou problème, ouvrir une issue sur le repository.


