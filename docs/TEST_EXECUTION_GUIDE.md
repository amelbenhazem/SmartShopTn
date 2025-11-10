# Guide d'Exécution des Tests - SmartShop TN

Guide complet pour exécuter tous les tests du projet.

## 🎯 Tests pour l'Interface Admin Produits

### 1. Tests Unitaires Frontend

```bash
cd frontend
npm test -- AdminProducts.test.jsx
```

**Résultats attendus:**
- 7 tests passés
- Couverture > 80%

### 2. Tests d'Intégration Backend

```bash
cd backend
npm run test:integration -- products.integration.test.js
```

**Résultats attendus:**
- 10+ tests passés
- Tous les endpoints CRUD testés

### 3. Tests E2E (Playwright)

```bash
cd frontend
npm run test:e2e -- admin-products.spec.js
```

**Prérequis:**
- Backend démarré
- Frontend démarré
- Utilisateurs seedés

**Résultats attendus:**
- 8 tests passés
- Workflow complet validé

### 4. Tests API (Postman)

```bash
# Installer Newman
npm install -g newman

# Exécuter les tests produits
newman run postman/SmartShop-TN.postman_collection.json \
  --environment postman/postman-environment.json \
  --folder "Products"
```

**Configuration:**
1. Importer la collection dans Postman
2. Configurer l'environnement avec `base_url` et `admin_token`
3. Exécuter la collection

**Résultats attendus:**
- 5 requêtes - 100% passées

### 5. Tests de Performance (JMeter)

**Configuration:**
1. Installer JMeter
2. Ouvrir `jmeter/SmartShop-TN-Products-Tests.jmx`
3. Configurer `admin_token` dans les variables
4. Exécuter les tests

**Scénarios:**
- Load Test: 100 utilisateurs sur GET /api/products
- Stress Test: 20 utilisateurs sur POST /api/products

**Résultats attendus:**
- Temps de réponse < 1000ms
- Taux d'erreur < 1%

## 📊 Rapport de Tests Complet

### Exécuter tous les tests

```bash
# Script pour exécuter tous les tests
./run-all-tests.sh
```

Ou manuellement:

```bash
# Backend
cd backend
npm test
npm run test:integration

# Frontend
cd frontend
npm test
npm run test:e2e

# API
newman run postman/SmartShop-TN.postman_collection.json
```

## 📈 Métriques de Qualité

### Couverture de Code
- Backend: > 85%
- Frontend: > 70%

### Taux de Réussite
- Tests unitaires: 100%
- Tests d'intégration: 100%
- Tests E2E: 100%
- Tests API: 100%

### Performance
- Temps de réponse moyen: < 200ms
- Support de charge: 100+ utilisateurs

## 🔍 Vérification des Tests

### Vérifier que tous les tests passent

```bash
# Backend
cd backend && npm test && npm run test:integration

# Frontend
cd frontend && npm test && npm run test:e2e
```

### Générer les rapports

```bash
# Backend coverage
cd backend && npm test -- --coverage

# Frontend coverage
cd frontend && npm test -- --coverage

# Playwright report
cd frontend && npm run test:e2e
# Ouvrir playwright-report/index.html
```

## 📝 Documentation des Tests

- [Tests Admin Produits](./TESTS_ADMIN_PRODUCTS.md) - Documentation complète
- [Guide de Tests](./TESTING.md) - Guide général
- [Rapport de Tests](./TEST_REPORT.md) - Rapport détaillé

