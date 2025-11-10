# Guide de Contribution - SmartShop TN

Merci de votre intérêt à contribuer à SmartShop TN!

## Comment Contribuer

### 1. Fork et Clone

```bash
# Fork le repository sur GitHub
# Puis cloner votre fork
git clone https://github.com/votre-username/smarthop-tn.git
cd smarthop-tn
```

### 2. Créer une Branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### 3. Faire les Modifications

- Écrire du code clair et bien documenté
- Suivre les conventions de code
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire

### 4. Tester

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
cd frontend && npm run test:e2e
```

### 5. Commit

```bash
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
```

### 6. Push et Pull Request

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

Puis créer une Pull Request sur GitHub.

## Conventions de Code

### Nommage

- **Variables**: camelCase
- **Fonctions**: camelCase
- **Classes**: PascalCase
- **Constantes**: UPPER_SNAKE_CASE
- **Fichiers**: kebab-case ou camelCase

### Commit Messages

Format: `type: description`

Types:
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage
- `refactor`: Refactorisation
- `test`: Tests
- `chore`: Tâches diverses

Exemples:
```
feat: ajouter fonctionnalité de recherche
fix: corriger bug dans le panier
docs: mettre à jour README
```

### Code Style

- Utiliser ESLint et Prettier
- Suivre les règles définies dans `.eslintrc.js`
- Formater le code avant de commit

```bash
# Backend
cd backend && npm run lint:fix

# Frontend
cd frontend && npm run lint:fix
cd frontend && npm run format
```

## Tests

### Ajouter des Tests

- Écrire des tests pour chaque nouvelle fonctionnalité
- Maintenir une couverture de code > 80%
- Tester les cas limites et les erreurs

### Exécuter les Tests

```bash
# Tous les tests
npm test

# Tests spécifiques
npm test -- --testNamePattern="nom du test"

# Avec couverture
npm test -- --coverage
```

## Documentation

### Mettre à Jour la Documentation

- Documenter les nouvelles fonctionnalités
- Mettre à jour les guides si nécessaire
- Ajouter des exemples d'utilisation

### Format de Documentation

- Utiliser Markdown
- Inclure des exemples de code
- Expliquer les décisions importantes

## Pull Requests

### Checklist

- [ ] Code testé et fonctionnel
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Code linté et formaté
- [ ] Pas de warnings ou d'erreurs
- [ ] Description claire de la PR

### Processus de Review

1. Un maintainer revoit la PR
2. Des commentaires peuvent être laissés
3. Des modifications peuvent être demandées
4. Une fois approuvée, la PR est mergée

## Questions?

Pour toute question, ouvrir une issue sur GitHub.

Merci de votre contribution!


