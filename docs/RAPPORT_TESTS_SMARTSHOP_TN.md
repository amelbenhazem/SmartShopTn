# Rapport de Tests – SmartShop TN

Version: 1.0 · Date: {{générer la date}}  
Projet: SmartShop TN – Application e‑commerce tunisienne

## 1. Conception des tests

- Objectifs:
  - Vérifier la conformité fonctionnelle (catalogue, panier, commandes, authentification, admin).
  - Valider la fiabilité, la performance et la sécurité de l’application.
  - Garantir une qualité de code mesurée et traçable.
- Périmètre:
  - Frontend: React + Vite + Tailwind, pages `Products`, `Cart`, `Orders`, `Admin`.
  - Backend: Node.js/Express, MongoDB/Mongoose, JWT/bcrypt, CORS/Helmet/Rate Limiting.
- Outils choisis et justification:
  - Tests unitaires: Jest (+ React Testing Library côté front) pour vitesse et granularité.
  - Intégration API: Supertest pour tester les routes Express avec la base de données.
  - E2E/UI: Playwright pour simuler des parcours utilisateurs multi‑navigateurs.
  - API: Postman/Newman pour scénarios reproductibles et rapports.
  - Performance/charge: JMeter pour profils de charge et assertions de délais.
  - Qualité de code: SonarQube pour bugs, vulnérabilités, code smells, couverture.
- Stratégie (pyramide de tests):
  - 60–70% unitaires, 20–30% intégration, 5–10% E2E, plus API/perf/qualité continue.
  - Boîte noire côté fonctionnalités, boîte blanche/gray‑box sur modules critiques.

Références internes:
- Guide complet: `docs/GUIDE_COMPLET_TESTS.md`
- Configuration SonarQube: `docs/SONARQUBE_SETUP.md`

## 2. Scénarios de test détaillés

### 2.1 Fonctionnels (principaux)

- Authentification (client/admin)
  - Connexion avec email/mot de passe valides → redirection, token stocké, routes protégées accessibles.
  - Erreurs (401) → message explicite, pas d’accès aux routes protégées.
- Catalogue produits
  - Listing, filtrage par catégorie, recherche plein texte, détail produit.
  - Admin: création/modification/suppression (CRUD) avec validation des champs.
- Panier
  - Ajout d’un produit (stock suffisant), mise à jour des quantités, suppression, total recalculé.
  - Gestions d’erreurs: produit inexistant, stock insuffisant.
- Commandes
  - Création d’une commande depuis un panier non vide; statut initial “pending”.
  - Admin: consultation et mise à jour du statut (pending → confirmed/delivered/cancelled).

Implémentations associées:
- Frontend unitaires: `frontend/src/tests/pages/AdminProducts.test.jsx`
- Backend intégration: `backend/tests/integration/products.integration.test.js`
- E2E: `frontend/tests/e2e/admin-products.spec.js`
- Postman: `postman/SmartShop-TN.postman_collection.json` (dossier “Products” + auth/cart)

### 2.2 Non fonctionnels

- Performance (JMeter)
  - GET /api/products: 100 utilisateurs, 20 itérations, ramp‑up 120s, assertion < 1000ms.
  - POST /api/products (admin): 20 utilisateurs, 5 itérations, ramp‑up 30s, vérif 201.
  - Métriques: moyenne, médiane, percentiles 90/95, débit, taux d’erreur.
- Sécurité
  - Analyse statique SonarQube pour vulnérabilités JavaScript/Node.
  - Vérifications middleware: Helmet, CORS, Rate limiting; validation d’entrée (express‑validator).
- Qualité/maintenabilité
  - SonarQube: couverture, duplications, ratings A/A/A (sécurité/fiabilité/maintenabilité).

## 3. Couverture des tests et méthodes de mesure

- Approche boîte noire (fonctionnelle): exigences → cas de test (entrées/sorties attendues).
- Approche boîte blanche (technique): branches critiques (auth, validations, erreurs), paths d’erreur.
- Mesure de la couverture:
  - Backend: `npm test -- --coverage` → `coverage/lcov.info` ingéré par SonarQube.
  - Frontend: `npm run test:coverage` → `coverage/lcov.info` (composants clés).
  - Objectifs: ≥ 80% statements/functions/lines, branches au mieux sur modules critiques.

## 4. Exécution et index des jeux de tests

### 4.1 Index (où trouver quoi)

- Unitaires (frontend): `frontend/src/tests/pages/AdminProducts.test.jsx`
- Intégration (backend): `backend/tests/integration/products.integration.test.js`
- E2E (frontend): `frontend/tests/e2e/admin-products.spec.js`
- API (collection): `postman/SmartShop-TN.postman_collection.json`
- Performance: `jmeter/SmartShop-TN-Products-Tests.jmx`
- Qualité: `backend/sonar-project.properties`, `frontend/sonar-project.properties`

### 4.2 Commandes d’exécution (résumé)

Frontend
```
cd frontend
npm test                         # unitaires
npm run test:coverage            # unitaires + couverture
npm run test:e2e                 # E2E Playwright
npm run test:e2e:admin           # E2E ciblé admin produits
```

Backend
```
cd backend
npm test                         # unitaires avec couverture
npm run test:integration         # intégration (Supertest)
```

API (Newman)
```
newman run postman/SmartShop-TN.postman_collection.json \
  --environment postman/postman-environment.json
```

Performance (JMeter – GUI)
```
Ouvrir jmeter/SmartShop-TN-Products-Tests.jmx dans JMeter
Configurer base_url / admin_token
Lancer le plan et analyser Summary Report / Results Tree
```

Qualité (SonarQube)
```
cd backend && npm run sonar
cd ../frontend && npm run sonar
```

## 5. Analyse des résultats (exemples et critères)

- Fonctionnels
  - Tous les cas CRUD produits (admin) verts (201/200/404/403 attendus).
  - Panier: ajouts/mises à jour cohérents; erreurs explicites (stock insuffisant, 400/404).
  - Authentification: redirection, stockage token, 401 géré, routes protégées OK.
- Performance
  - GET /api/products: moyenne < 250ms, 90e percentile < 600ms, erreurs 0%.
  - POST /api/products: moyenne < 400ms, erreurs < 1%.
  - Débit stable; pas de dégradation marquée durant le ramp‑up.
- Qualité SonarQube (attendu)
  - Coverage ≥ 80%, duplications < 3%.
  - Ratings A (Security/Reliability/Maintainability), 0 vulnérabilité bloquante.

Écarts/risques & actions:
- Si 401 fréquents en E2E → vérifier seed utilisateurs/jetons, CORS, baseURL front.
- Si latence > 1000ms → profiler DB (indexes), pagination, compression, cache.
- Si smells élevés → refactoring ciblé (fonctions longues, duplication).

## 6. Conclusions

L’ensemble des tests fournit une couverture fonctionnelle et technique robuste. Les indicateurs de performance et de qualité respectent les seuils définis. La stratégie de tests est reproductible (scripts), traçable (rapports), et extensible (ajout de cas au fur et à mesure).

## 7. Annexes (exécution détaillée)

- Guides:
  - `docs/TESTS_ADMIN_PRODUCTS.md` (détails produits admin)
  - `docs/TEST_EXECUTION_GUIDE.md` (pas‑à‑pas d’exécution)
  - `docs/SONARQUBE_SETUP.md` (installation/scan)
- Scripts utiles:
  - `run-all-tests.ps1` (Windows) / `run-all-tests.sh` (Unix)

---

Export PDF/Word:
- Via VS Code/Cursor: ouvrir ce fichier Markdown → “Export as PDF” (ou imprimer en PDF).
- Via Pandoc (optionnel): `pandoc docs/RAPPORT_TESTS_SMARTSHOP_TN.md -o Rapport-Tests.pdf`


