# Architecture - SmartShop TN

## Vue d'ensemble

SmartShop TN est une application e-commerce construite avec une architecture modulaire en trois couches:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Base de données**: MongoDB

## Structure du Projet

```
smarthop-tn/
├── backend/              # API Node.js
│   ├── src/
│   │   ├── models/      # Modèles Mongoose
│   │   ├── routes/      # Routes API
│   │   ├── controllers/ # Contrôleurs
│   │   ├── middleware/  # Middleware (auth, validation)
│   │   └── utils/       # Utilitaires
│   └── tests/           # Tests backend
├── frontend/            # Application React
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── pages/       # Pages
│   │   ├── contexts/    # Contextes React
│   │   ├── services/    # Services API
│   │   └── tests/       # Tests frontend
│   └── tests/           # Tests E2E
├── postman/             # Collections Postman
├── jmeter/              # Tests JMeter
└── docs/                # Documentation
```

## Backend

### Technologies
- **Framework**: Express.js
- **Base de données**: MongoDB avec Mongoose
- **Authentification**: JWT (JSON Web Tokens)
- **Sécurité**: Helmet, bcrypt, express-rate-limit
- **Validation**: express-validator

### Architecture
- **Modèles**: Définissent la structure des données
- **Routes**: Définissent les endpoints API
- **Contrôleurs**: Contiennent la logique métier
- **Middleware**: Gèrent l'authentification et la validation
- **Utils**: Fonctions utilitaires (JWT, etc.)

### Endpoints API

#### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

#### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détails d'un produit
- `POST /api/products` - Créer un produit (admin)
- `PUT /api/products/:id` - Modifier un produit (admin)
- `DELETE /api/products/:id` - Supprimer un produit (admin)

#### Panier
- `GET /api/cart` - Obtenir le panier
- `POST /api/cart` - Ajouter au panier
- `PUT /api/cart/:productId` - Modifier la quantité
- `DELETE /api/cart/:productId` - Supprimer du panier
- `DELETE /api/cart` - Vider le panier

#### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders` - Liste des commandes
- `GET /api/orders/:id` - Détails d'une commande

#### Admin
- `GET /api/admin/dashboard` - Tableau de bord
- `GET /api/admin/orders` - Toutes les commandes
- `PUT /api/admin/orders/:id/status` - Mettre à jour le statut

## Frontend

### Technologies
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **State Management**: React Context API

### Architecture
- **Composants**: Composants réutilisables
- **Pages**: Pages de l'application
- **Contexts**: Gestion de l'état global (AuthContext)
- **Services**: Appels API
- **Utils**: Fonctions utilitaires

### Pages
- `/` - Page d'accueil
- `/products` - Catalogue produits
- `/products/:id` - Détails produit
- `/cart` - Panier
- `/orders` - Commandes
- `/login` - Connexion
- `/register` - Inscription
- `/admin` - Tableau de bord admin

## Base de Données

### Collections

#### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'client', 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

#### Products
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String (enum: 'Épicerie', 'Artisanat', 'Beauté', 'Textiles'),
  image: String,
  stock: Number,
  origin: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Orders
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: String (enum: 'pending', 'confirmed', 'delivered', 'cancelled'),
  shippingAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Sécurité

### Authentification
- JWT tokens avec expiration
- Hash des mots de passe avec bcrypt
- Protection des routes sensibles

### Sécurité HTTP
- Helmet pour les en-têtes de sécurité
- Rate limiting pour prévenir les abus
- CORS configuré
- Validation des données d'entrée

## Déploiement

### Docker
- **MongoDB**: Container MongoDB
- **Backend**: Container Node.js
- **Frontend**: Container Node.js avec Vite

### Variables d'Environnement

#### Backend
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://...
JWT_SECRET=...
JWT_EXPIRE=7d
```

#### Frontend
```
VITE_API_URL=http://localhost:3000/api
```

## Performance

### Optimisations
- Indexation MongoDB
- Cache des requêtes fréquentes
- Compression des réponses
- Lazy loading des composants

### Monitoring
- Logs des erreurs
- Métriques de performance
- Surveillance de la base de données

## Tests

### Types de Tests
1. **Unitaires**: Jest
2. **Intégration**: Supertest
3. **E2E**: Playwright
4. **API**: Postman
5. **Performance**: JMeter

### Couverture
- Objectif: > 80%
- Backend: > 85%
- Frontend: > 70%

## Scalabilité

### Horizontal Scaling
- Load balancing
- Multi-instances backend
- CDN pour les assets statiques

### Vertical Scaling
- Optimisation des requêtes
- Cache Redis
- Base de données répliquée

## Maintenance

### Logs
- Logs structurés
- Niveaux de log (info, warn, error)
- Rotation des logs

### Monitoring
- Health checks
- Métriques de performance
- Alertes automatiques

## Ressources

- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)


