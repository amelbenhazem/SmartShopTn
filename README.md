# 🛍️ SmartShop TN - Application E-commerce Tunisienne

Application e-commerce complète pour les produits tunisiens avec infrastructure de tests complète.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Installation](#-installation)
- [Démarrage](#-démarrage)
- [Tests](#-tests)
- [Structure du projet](#-structure-du-projet)
- [Documentation](#-documentation)

## ✨ Fonctionnalités

### 👥 Authentification
- Connexion et inscription avec JWT
- Rôles : Client / Admin
- Protection des routes sensibles

### 🛒 Catalogue produits
- CRUD complet sur les produits tunisiens
- Catégories : Épicerie, Artisanat, Beauté, Textiles
- Gestion des stocks

### 🛍️ Panier
- Ajout / suppression / modification de quantité
- Calcul automatique en dinars tunisiens (TND)
- Validation des commandes

### 📦 Commandes
- Validation simulée (sans paiement réel)
- Historique des commandes
- Gestion automatique des stocks

### 📈 Tableau de bord admin
- Gestion des produits
- Suivi des commandes
- Statistiques de ventes

## 🛠️ Stack technique

| Côté | Technologie |
|------|-------------|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Base de données** | MongoDB (Mongoose) |
| **Authentification** | JWT + bcrypt |
| **Tests** | Jest, Supertest, Playwright, Postman, JMeter |
| **Qualité** | SonarQube, ESLint, Prettier |
| **Déploiement** | Docker Compose |

## 🚀 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- Docker et Docker Compose
- MongoDB (ou via Docker)

### Installation des dépendances

```bash
# Installer toutes les dépendances
npm run install:all

# Ou manuellement
cd backend && npm install
cd ../frontend && npm install
```

## 🏃 Démarrage

### Avec Docker (recommandé)

```bash
# Démarrer tous les services
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

### Sans Docker

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend : http://localhost:3000
- MongoDB : mongodb://localhost:27017

## 🧪 Tests

### Tests unitaires

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

### Tests d'intégration

```bash
cd backend && npm run test:integration
```

### Tests E2E (Playwright)

```bash
cd frontend && npm run test:e2e
```

### Tests API (Postman)

```bash
# Exporter la collection Postman et exécuter avec Newman
newman run postman/SmartShop-TN.postman_collection.json
```

### Tests de performance (JMeter)

```bash
# Ouvrir JMeter et charger le fichier jmeter/SmartShop-TN-Tests.jmx
# Exécuter les tests de charge
```

### Analyse de qualité (SonarQube)

```bash
# Démarrer SonarQube (via Docker)
docker-compose -f docker-compose.sonar.yml up -d

# Analyser le code
sonar-scanner
```

## 📁 Structure du projet

```
smarthop-tn/
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── models/         # Modèles Mongoose
│   │   ├── routes/         # Routes API
│   │   ├── middleware/     # Middleware (auth, validation)
│   │   ├── controllers/    # Contrôleurs
│   │   └── utils/          # Utilitaires
│   ├── tests/              # Tests backend
│   └── package.json
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── pages/          # Pages
│   │   ├── hooks/          # Hooks personnalisés
│   │   ├── services/       # Services API
│   │   └── utils/          # Utilitaires
│   ├── tests/              # Tests frontend
│   └── package.json
├── docker-compose.yml      # Configuration Docker
├── postman/                # Collections Postman
├── jmeter/                 # Tests JMeter
└── docs/                   # Documentation
```

## 📚 Documentation

### Guides
- [Démarrage Rapide](./QUICKSTART.md) - Guide rapide pour commencer
- [Guide d'Installation](./docs/SETUP.md) - Installation détaillée
- [Guide de Développement](./docs/DEVELOPMENT.md) - Développement
- [Guide de Tests](./docs/TESTING.md) - Stratégie de tests
- [Architecture](./docs/ARCHITECTURE.md) - Architecture technique
- [Documentation API](./docs/API.md) - Documentation complète de l'API
- [Rapport de Tests](./docs/TEST_REPORT.md) - Rapport détaillé des tests
- [Configuration des Variables d'Environnement](./docs/ENV_SETUP.md) - Guide .env

### Autres
- [Résumé du Projet](./PROJECT_SUMMARY.md) - Vue d'ensemble complète
- [Guide de Contribution](./CONTRIBUTING.md) - Comment contribuer
- [Dépannage](./TROUBLESHOOTING.md) - Guide de dépannage
- [Licence](./LICENSE) - Licence MIT

## 👥 Auteurs

Projet développé dans le cadre d'un projet de Test et Qualité logicielle.

## 📄 Licence

MIT

