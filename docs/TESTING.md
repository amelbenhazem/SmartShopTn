# Guide de Tests - SmartShop TN

Ce document décrit la stratégie de tests pour l'application SmartShop TN.

## Types de Tests

### 1. Tests Unitaires

#### Backend
- **Outils**: Jest
- **Localisation**: `backend/tests/unit/`
- **Exécution**: `cd backend && npm test`
- **Couverture**: Tests des utilitaires, modèles, et logique métier

#### Frontend
- **Outils**: Jest + React Testing Library
- **Localisation**: `frontend/src/tests/`
- **Exécution**: `cd frontend && npm test`
- **Couverture**: Tests des composants React

### 2. Tests d'Intégration

#### Backend
- **Outils**: Jest + Supertest
- **Localisation**: `backend/tests/integration/`
- **Exécution**: `cd backend && npm run test:integration`
- **Couverture**: Tests des endpoints API complets

### 3. Tests E2E (End-to-End)

#### Frontend
- **Outils**: Playwright
- **Localisation**: `frontend/tests/e2e/`
- **Exécution**: `cd frontend && npm run test:e2e`
- **Couverture**: Tests des workflows complets de l'application

### 4. Tests API

#### Postman/Newman
- **Collection**: `postman/SmartShop-TN.postman_collection.json`
- **Exécution**: `newman run postman/SmartShop-TN.postman_collection.json`
- **Couverture**: Tests de tous les endpoints API

### 5. Tests de Performance

#### JMeter
- **Fichier**: `jmeter/SmartShop-TN-Tests.jmx`
- **Exécution**: Ouvrir JMeter et exécuter le test plan
- **Scénarios**:
  - Load test: 50 utilisateurs simultanés sur `/api/products`
  - Stress test: 100 utilisateurs sur `/api/cart`

## Exécution des Tests

### Backend

```bash
# Tous les tests
cd backend && npm test

# Tests unitaires uniquement
cd backend && npm test -- --testPathPattern=unit

# Tests d'intégration uniquement
cd backend && npm run test:integration

# Avec couverture
cd backend && npm test -- --coverage
```

### Frontend

```bash
# Tests unitaires
cd frontend && npm test

# Tests E2E
cd frontend && npm run test:e2e

# Tests E2E avec UI
cd frontend && npm run test:e2e:ui
```

### API (Postman)

```bash
# Installer Newman
npm install -g newman

# Exécuter la collection
newman run postman/SmartShop-TN.postman_collection.json --environment postman/postman-environment.json
```

### Performance (JMeter)

1. Installer JMeter
2. Ouvrir `jmeter/SmartShop-TN-Tests.jmx`
3. Configurer les variables d'environnement
4. Exécuter les tests
5. Analyser les résultats

## Tests pour l'Interface Admin Produits

Une interface complète de gestion des produits a été créée pour les administrateurs avec tous les tests associés :

### Tests Implémentés

1. **Tests Unitaires** (`frontend/src/tests/pages/AdminProducts.test.jsx`)
   - Affichage de la liste
   - Ouverture du formulaire
   - Soumission (ajout/modification)
   - Suppression
   - Validation

2. **Tests d'Intégration** (`backend/tests/integration/products.integration.test.js`)
   - CRUD complet
   - Validation des permissions
   - Filtrage et recherche

3. **Tests E2E** (`frontend/tests/e2e/admin-products.spec.js`)
   - Workflow complet d'ajout/modification/suppression
   - Navigation et interface

4. **Tests API** (Postman)
   - 5 nouvelles requêtes avec tests automatiques
   - Création, modification, suppression, filtrage, recherche

5. **Tests de Performance** (`jmeter/SmartShop-TN-Products-Tests.jmx`)
   - Load test sur GET /api/products
   - Stress test sur POST /api/products

**Documentation complète:** [Tests Admin Produits](./TESTS_ADMIN_PRODUCTS.md)

## Scénarios de Test

### Authentification
- ✅ Inscription utilisateur
- ✅ Connexion utilisateur
- ✅ Récupération du profil utilisateur
- ✅ Protection des routes avec JWT

### Produits
- ✅ Liste des produits
- ✅ Détails d'un produit
- ✅ Filtrage par catégorie
- ✅ Recherche de produits
- ✅ CRUD produits (admin)

### Panier
- ✅ Ajout au panier
- ✅ Modification de quantité
- ✅ Suppression d'article
- ✅ Calcul du total
- ✅ Vidage du panier

### Commandes
- ✅ Création de commande
- ✅ Historique des commandes
- ✅ Détails d'une commande
- ✅ Mise à jour du stock

### Admin
- ✅ Tableau de bord
- ✅ Gestion des commandes
- ✅ Statistiques
- ✅ Accès restreint

## Couverture de Code

Objectif: **> 80%**

### Backend
- Modèles: 100%
- Contrôleurs: > 80%
- Middleware: 100%
- Utilitaires: 100%

### Frontend
- Composants: > 70%
- Pages: > 60%
- Services: 100%

## Rapport de Tests

Les rapports de tests sont générés dans:
- Backend: `backend/coverage/`
- Frontend: `frontend/coverage/`
- E2E: `frontend/playwright-report/`

## Bonnes Pratiques

1. **Nommage des tests**: Utiliser des noms descriptifs
2. **Isolation**: Chaque test doit être indépendant
3. **Setup/Teardown**: Nettoyer les données après chaque test
4. **Assertions**: Vérifier les comportements attendus
5. **Mocking**: Utiliser des mocks pour les dépendances externes

## CI/CD

Les tests doivent être exécutés automatiquement:
- À chaque commit
- Avant chaque déploiement
- Sur les pull requests

## Ressources

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Postman Documentation](https://learning.postman.com/)
- [JMeter Documentation](https://jmeter.apache.org/)


