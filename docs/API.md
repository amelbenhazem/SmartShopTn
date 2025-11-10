# Documentation API - SmartShop TN

Documentation complète de l'API REST de SmartShop TN.

## Base URL

```
http://localhost:3000/api
```

## Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification. Inclure le token dans l'en-tête `Authorization`:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentification

#### POST /api/auth/register

Inscription d'un nouvel utilisateur.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "client" // Optionnel, défaut: "client"
}
```

**Response (201):**
```json
{
  "message": "Inscription réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "client"
  }
}
```

#### POST /api/auth/login

Connexion d'un utilisateur.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "client"
  }
}
```

#### GET /api/auth/me

Récupérer les informations de l'utilisateur connecté.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "client"
  }
}
```

### Produits

#### GET /api/products

Récupérer la liste des produits.

**Query Parameters:**
- `category` (optionnel): Filtrer par catégorie (Épicerie, Artisanat, Beauté, Textiles)
- `search` (optionnel): Rechercher dans le nom et la description

**Example:**
```
GET /api/products?category=Épicerie&search=huile
```

**Response (200):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Huile d'olive de Sfax",
      "description": "Huile d'olive extra vierge",
      "price": 45.00,
      "category": "Épicerie",
      "image": "https://example.com/image.jpg",
      "stock": 50,
      "origin": "Sfax, Tunisie",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/products/:id

Récupérer les détails d'un produit.

**Response (200):**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Huile d'olive de Sfax",
    "description": "Huile d'olive extra vierge",
    "price": 45.00,
    "category": "Épicerie",
    "image": "https://example.com/image.jpg",
    "stock": 50,
    "origin": "Sfax, Tunisie"
  }
}
```

#### POST /api/products

Créer un nouveau produit (Admin uniquement).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Nouveau Produit",
  "description": "Description du produit",
  "price": 25.00,
  "category": "Épicerie",
  "stock": 50,
  "origin": "Tunis, Tunisie",
  "image": "https://example.com/image.jpg"
}
```

**Response (201):**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Nouveau Produit",
    "description": "Description du produit",
    "price": 25.00,
    "category": "Épicerie",
    "stock": 50,
    "origin": "Tunis, Tunisie"
  }
}
```

#### PUT /api/products/:id

Modifier un produit (Admin uniquement).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Produit Modifié",
  "price": 30.00
}
```

**Response (200):**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Produit Modifié",
    "price": 30.00
  }
}
```

#### DELETE /api/products/:id

Supprimer un produit (Admin uniquement).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Produit supprimé avec succès"
}
```

### Panier

#### GET /api/cart

Récupérer le panier de l'utilisateur.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "items": [
    {
      "product": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Huile d'olive de Sfax",
        "price": 45.00,
        "image": "https://example.com/image.jpg",
        "stock": 50
      },
      "quantity": 2,
      "subtotal": 90.00
    }
  ],
  "total": "90.00",
  "currency": "TND"
}
```

#### POST /api/cart

Ajouter un produit au panier.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

**Response (200):**
```json
{
  "message": "Produit ajouté au panier",
  "cart": [...]
}
```

#### PUT /api/cart/:productId

Modifier la quantité d'un article dans le panier.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "quantity": 5
}
```

**Response (200):**
```json
{
  "message": "Panier mis à jour",
  "cart": [...]
}
```

#### DELETE /api/cart/:productId

Supprimer un article du panier.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Article supprimé du panier",
  "cart": [...]
}
```

#### DELETE /api/cart

Vider le panier.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Panier vidé"
}
```

### Commandes

#### POST /api/orders

Créer une commande à partir du panier.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "shippingAddress": "Tunis, Tunisia"
}
```

**Response (201):**
```json
{
  "message": "Commande créée avec succès",
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "items": [
      {
        "product": {
          "_id": "507f1f77bcf86cd799439013",
          "name": "Huile d'olive de Sfax"
        },
        "quantity": 2,
        "price": 45.00
      }
    ],
    "total": 90.00,
    "status": "confirmed",
    "shippingAddress": "Tunis, Tunisia",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/orders

Récupérer les commandes de l'utilisateur.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "items": [...],
      "total": 90.00,
      "status": "confirmed",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/orders/:id

Récupérer les détails d'une commande.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "items": [...],
    "total": 90.00,
    "status": "confirmed",
    "shippingAddress": "Tunis, Tunisia"
  }
}
```

### Admin

#### GET /api/admin/dashboard

Récupérer les statistiques du tableau de bord (Admin uniquement).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "stats": {
    "totalProducts": 8,
    "totalOrders": 25,
    "totalUsers": 10,
    "revenue": "1250.00"
  },
  "recentOrders": [...]
}
```

#### GET /api/admin/orders

Récupérer toutes les commandes (Admin uniquement).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "items": [...],
      "total": 90.00,
      "status": "confirmed"
    }
  ]
}
```

#### PUT /api/admin/orders/:id/status

Mettre à jour le statut d'une commande (Admin uniquement).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "delivered"
}
```

**Response (200):**
```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "status": "delivered",
    ...
  }
}
```

## Codes de Statut HTTP

- `200` - Succès
- `201` - Créé avec succès
- `400` - Requête invalide
- `401` - Non autorisé
- `403` - Accès interdit
- `404` - Non trouvé
- `500` - Erreur serveur

## Gestion des Erreurs

Les erreurs sont retournées au format suivant:

```json
{
  "message": "Message d'erreur",
  "errors": [
    {
      "msg": "Validation error",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Rate Limiting

L'API applique un rate limiting de 100 requêtes par 15 minutes par adresse IP.

## Exemples d'Utilisation

### cURL

```bash
# Inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Liste des produits
curl http://localhost:3000/api/products

# Ajouter au panier
curl -X POST http://localhost:3000/api/cart \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"productId":"507f1f77bcf86cd799439011","quantity":2}'
```

### JavaScript (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Inscription
const register = async () => {
  const response = await api.post('/auth/register', {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  });
  return response.data;
};

// Connexion
const login = async () => {
  const response = await api.post('/auth/login', {
    email: 'john@example.com',
    password: 'password123',
  });
  const token = response.data.token;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return response.data;
};

// Liste des produits
const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};
```

## Support

Pour toute question sur l'API, consulter la documentation ou ouvrir une issue.


