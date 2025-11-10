# Tests pour l'Interface de Gestion des Produits Admin

Documentation complète des tests pour l'interface de gestion des produits admin.

## 📋 Vue d'ensemble

Tous les types de tests ont été implémentés pour l'interface de gestion des produits admin :
- ✅ Tests unitaires (Jest)
- ✅ Tests d'intégration (Supertest)
- ✅ Tests E2E (Playwright)
- ✅ Tests API (Postman)
- ✅ Tests de performance (JMeter)

## 🧪 1. Tests Unitaires (Jest)

### Localisation
- `frontend/src/tests/pages/AdminProducts.test.jsx`

### Scénarios testés

1. **Affichage de la liste des produits**
   - Vérifie que les produits sont affichés
   - Vérifie le bouton d'ajout

2. **Ouverture du formulaire**
   - Vérifie que le formulaire s'ouvre au clic
   - Vérifie les champs du formulaire

3. **Soumission du formulaire**
   - Vérifie la création d'un produit
   - Vérifie l'appel API

4. **Modification d'un produit**
   - Vérifie l'ouverture du formulaire d'édition
   - Vérifie le pré-remplissage des champs

5. **Suppression d'un produit**
   - Vérifie la confirmation
   - Vérifie l'appel API de suppression

6. **État vide**
   - Vérifie l'affichage quand aucun produit

### Exécution

```bash
cd frontend
npm test -- AdminProducts.test.jsx
```

## 🔗 2. Tests d'Intégration (Supertest)

### Localisation
- `backend/tests/integration/products.integration.test.js`

### Scénarios testés

1. **GET /api/products**
   - Récupération de tous les produits
   - Filtrage par catégorie
   - Recherche par nom

2. **POST /api/products**
   - Création de produit (admin)
   - Validation des champs requis
   - Validation de la catégorie
   - Refus pour les clients

3. **PUT /api/products/:id**
   - Modification de produit (admin)
   - Refus pour les clients
   - Gestion des produits inexistants

4. **DELETE /api/products/:id**
   - Suppression de produit (admin)
   - Refus pour les clients
   - Gestion des produits inexistants

### Exécution

```bash
cd backend
npm run test:integration
```

## 🎭 3. Tests E2E (Playwright)

### Localisation
- `frontend/tests/e2e/admin-products.spec.js`

### Scénarios testés

1. **Navigation**
   - Accès à la page de gestion des produits
   - Vérification de l'URL

2. **Affichage**
   - Liste des produits
   - Tableau visible

3. **Ajout de produit**
   - Ouverture du formulaire
   - Remplissage des champs
   - Soumission
   - Vérification de l'ajout

4. **Modification de produit**
   - Ouverture du formulaire d'édition
   - Modification des champs
   - Sauvegarde
   - Vérification de la modification

5. **Suppression de produit**
   - Confirmation
   - Suppression
   - Vérification de la suppression

6. **Annulation**
   - Annulation du formulaire
   - Fermeture du formulaire

7. **Validation**
   - Validation des champs requis

### Exécution

```bash
cd frontend
npm run test:e2e -- admin-products.spec.js
```

## 📮 4. Tests API (Postman)

### Localisation
- `postman/SmartShop-TN.postman_collection.json`

### Requêtes ajoutées

1. **Create Product (Admin)**
   - POST `/api/products`
   - Tests : Status 201, Produit créé
   - Sauvegarde du product_id

2. **Update Product (Admin)**
   - PUT `/api/products/:id`
   - Tests : Status 200, Produit modifié

3. **Delete Product (Admin)**
   - DELETE `/api/products/:id`
   - Tests : Status 200, Produit supprimé

4. **Get Products by Category**
   - GET `/api/products?category=Épicerie`
   - Tests : Status 200, Filtrage correct

5. **Search Products**
   - GET `/api/products?search=huile`
   - Tests : Status 200, Résultats retournés

### Exécution

```bash
# Installer Newman
npm install -g newman

# Exécuter la collection
newman run postman/SmartShop-TN.postman_collection.json \
  --environment postman/postman-environment.json \
  --folder "Products"
```

## ⚡ 5. Tests de Performance (JMeter)

### Localisation
- `jmeter/SmartShop-TN-Products-Tests.jmx`

### Scénarios de charge

1. **Load Test - GET Products**
   - 100 utilisateurs simultanés
   - 20 itérations par utilisateur
   - Ramp-up : 120 secondes
   - Assertion : Temps de réponse < 1000ms

2. **Stress Test - POST Products**
   - 20 utilisateurs simultanés
   - 5 itérations par utilisateur
   - Ramp-up : 30 secondes
   - Création de produits avec données dynamiques

### Exécution

1. Ouvrir JMeter
2. Charger `jmeter/SmartShop-TN-Products-Tests.jmx`
3. Configurer `admin_token` dans les variables
4. Exécuter les tests
5. Analyser les résultats

### Métriques surveillées

- Temps de réponse moyen
- Temps de réponse médian
- Taux d'erreur
- Débit (requêtes/seconde)
- Utilisation CPU/Mémoire

## 📊 Résultats Attendus

### Tests Unitaires
- ✅ 7 tests - 100% passés
- Couverture : > 80%

### Tests d'Intégration
- ✅ 10+ tests - 100% passés
- Tous les endpoints testés

### Tests E2E
- ✅ 8 tests - 100% passés
- Workflow complet validé

### Tests API (Postman)
- ✅ 5 requêtes - 100% passées
- Tous les scénarios CRUD testés

### Tests de Performance
- ✅ Temps de réponse < 1000ms
- ✅ Taux d'erreur < 1%
- ✅ Support de 100+ utilisateurs simultanés

## 🚀 Exécution Complète

### Tous les tests

```bash
# Backend
cd backend
npm test                    # Tests unitaires
npm run test:integration    # Tests d'intégration

# Frontend
cd frontend
npm test                    # Tests unitaires
npm run test:e2e            # Tests E2E

# API
newman run postman/SmartShop-TN.postman_collection.json

# Performance
# Ouvrir JMeter et exécuter les tests
```

## 📝 Checklist de Tests

### Tests Unitaires
- [ ] Affichage de la liste
- [ ] Ouverture du formulaire
- [ ] Soumission du formulaire
- [ ] Modification
- [ ] Suppression
- [ ] État vide
- [ ] Validation des champs

### Tests d'Intégration
- [ ] GET produits
- [ ] POST produit (admin)
- [ ] POST produit (client - refusé)
- [ ] PUT produit (admin)
- [ ] PUT produit (client - refusé)
- [ ] DELETE produit (admin)
- [ ] DELETE produit (client - refusé)
- [ ] Filtrage par catégorie
- [ ] Recherche

### Tests E2E
- [ ] Navigation
- [ ] Affichage
- [ ] Ajout
- [ ] Modification
- [ ] Suppression
- [ ] Annulation
- [ ] Validation

### Tests API
- [ ] Création
- [ ] Modification
- [ ] Suppression
- [ ] Filtrage
- [ ] Recherche

### Tests de Performance
- [ ] Load test GET
- [ ] Stress test POST
- [ ] Temps de réponse
- [ ] Taux d'erreur

## 🔍 Dépannage

### Tests unitaires échouent

```bash
# Vérifier les mocks
# Vérifier les imports
# Vérifier les dépendances
```

### Tests E2E échouent

```bash
# Vérifier que le serveur est démarré
# Vérifier les sélecteurs
# Vérifier les timeouts
```

### Tests de performance échouent

```bash
# Vérifier que le backend est démarré
# Vérifier le token admin
# Vérifier les ressources système
```

## 📚 Ressources

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Postman Documentation](https://learning.postman.com/)
- [JMeter Documentation](https://jmeter.apache.org/)

