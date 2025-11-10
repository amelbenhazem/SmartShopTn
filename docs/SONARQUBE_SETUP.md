# Guide d'Installation et Configuration SonarQube

Guide complet pour installer, configurer et utiliser SonarQube avec SmartShop TN.

## 🎯 Qu'est-ce que SonarQube ?

SonarQube est une plateforme open-source d'analyse de qualité de code qui détecte :
- 🐛 **Bugs** : Erreurs dans le code
- 🔒 **Vulnérabilités** : Failles de sécurité
- 💡 **Code Smells** : Problèmes de qualité/maintenabilité
- 📊 **Duplications** : Code dupliqué
- 📈 **Couverture** : Pourcentage de code testé

## 🚀 Installation

### Option 1 : SonarCloud (Recommandé - Gratuit pour projets open source)

1. **Créer un compte** :
   - Aller sur https://sonarcloud.io
   - Se connecter avec GitHub/GitLab/Bitbucket

2. **Créer un projet** :
   - Cliquer sur "Create Project"
   - Sélectionner votre repository
   - Choisir "Analyze a new project"

3. **Obtenir le token** :
   - Settings → Security → Generate Token
   - Copier le token (il ne sera affiché qu'une fois)

### Option 2 : SonarQube Server (Local)

#### Windows

```powershell
# Télécharger depuis https://www.sonarqube.org/downloads/
# Extraire dans C:\sonarqube

# Démarrer SonarQube
cd C:\sonarqube\bin\windows-x86-64
StartSonar.bat

# Accéder à l'interface
# http://localhost:9000
# Login: admin / Password: admin (changer au premier login)
```

#### Linux/Mac

```bash
# Télécharger
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-9.9.0.65466.zip
unzip sonarqube-9.9.0.65466.zip

# Démarrer
cd sonarqube/bin/linux-x86-64
./sonar.sh start

# Vérifier le statut
./sonar.sh status

# Accéder à l'interface
# http://localhost:9000
```

#### Docker (Recommandé)

```bash
# Démarrer SonarQube avec Docker
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  -v sonarqube_data:/opt/sonarqube/data \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  sonarqube:latest

# Accéder à l'interface
# http://localhost:9000
```

## 🔧 Installation du Scanner

### Windows

```powershell
# Avec Chocolatey
choco install sonar-scanner

# Ou télécharger depuis
# https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/
```

### Linux/Mac

```bash
# Avec Homebrew (Mac)
brew install sonar-scanner

# Ou télécharger manuellement
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip
unzip sonar-scanner-cli-4.8.0.2856-linux.zip
export PATH=$PATH:$(pwd)/sonar-scanner-4.8.0.2856-linux/bin
```

### Vérifier l'installation

```bash
sonar-scanner --version
```

## ⚙️ Configuration du Projet

### Backend

Le fichier `backend/sonar-project.properties` est déjà configuré :

```properties
sonar.projectKey=smarthop-backend
sonar.projectName=SmartShop TN Backend
sonar.sources=src
sonar.tests=tests
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

### Frontend

Le fichier `frontend/sonar-project.properties` est déjà configuré :

```properties
sonar.projectKey=smarthop-frontend
sonar.projectName=SmartShop TN Frontend
sonar.sources=src
sonar.tests=src/tests
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

## 🔑 Configuration du Token

### SonarCloud

```bash
# Créer un token sur SonarCloud
# Settings → Security → Generate Token

# Configurer le token
export SONAR_TOKEN=your_token_here

# Ou ajouter dans sonar-project.properties
# sonar.login=your_token_here
# sonar.organization=your_org
```

### SonarQube Local

```bash
# Le token par défaut est "admin"
# Mais il faut le changer après le premier login

# Créer un token
# User → My Account → Security → Generate Token

export SONAR_TOKEN=your_token_here
```

## 🚀 Exécution

### Backend

```bash
cd backend

# 1. Générer la couverture de code
npm test -- --coverage

# 2. Exécuter SonarQube
sonar-scanner \
  -Dsonar.login=$SONAR_TOKEN \
  -Dsonar.organization=your_org  # Pour SonarCloud uniquement

# Ou avec le script npm
npm run sonar
```

### Frontend

```bash
cd frontend

# 1. Générer la couverture de code
npm run test:coverage

# 2. Exécuter SonarQube
sonar-scanner \
  -Dsonar.login=$SONAR_TOKEN \
  -Dsonar.organization=your_org  # Pour SonarCloud uniquement

# Ou avec le script npm
npm run sonar
```

## 📊 Résultats

### Dashboard SonarQube

Après l'analyse, accéder au dashboard :
- **SonarCloud** : https://sonarcloud.io/project/overview?id=smarthop-backend
- **SonarQube Local** : http://localhost:9000/dashboard?id=smarthop-backend

### Métriques Affichées

1. **Bugs** : Nombre de bugs détectés
2. **Vulnérabilités** : Problèmes de sécurité
3. **Code Smells** : Problèmes de qualité
4. **Coverage** : Pourcentage de code testé
5. **Duplications** : Code dupliqué
6. **Maintainability Rating** : Note de maintenabilité (A-E)
7. **Reliability Rating** : Note de fiabilité (A-E)
8. **Security Rating** : Note de sécurité (A-E)

### Objectifs de Qualité

- ✅ **Coverage** : > 80%
- ✅ **Duplications** : < 3%
- ✅ **Maintainability Rating** : A
- ✅ **Reliability Rating** : A
- ✅ **Security Rating** : A
- ✅ **Bugs** : 0
- ✅ **Vulnérabilités** : 0

## 🔍 Types de Problèmes

### Bugs

Erreurs qui causeront un comportement incorrect :

```javascript
// Exemple de bug détecté
function divide(a, b) {
  return a / b;  // ❌ Division par zéro non gérée
}
```

### Vulnérabilités

Failles de sécurité :

```javascript
// Exemple de vulnérabilité
const query = `SELECT * FROM users WHERE id = ${userId}`;  // ❌ SQL Injection
```

### Code Smells

Problèmes de qualité/maintenabilité :

```javascript
// Exemple de code smell
function doEverything() {  // ❌ Fonction trop longue/complexe
  // 500 lignes de code...
}
```

## 🔄 Intégration CI/CD

### GitHub Actions

Créer `.github/workflows/sonar.yml` :

```yaml
name: SonarQube Analysis

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  sonar-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd backend && npm install
      
      - name: Run tests with coverage
        run: cd backend && npm test -- --coverage
      
      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}

  sonar-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd frontend && npm install
      
      - name: Run tests with coverage
        run: cd frontend && npm run test:coverage
      
      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

### Configuration des Secrets GitHub

1. Aller dans Settings → Secrets → Actions
2. Ajouter `SONAR_TOKEN` : Token SonarQube
3. Ajouter `SONAR_HOST_URL` : https://sonarcloud.io (ou votre serveur)

## 🆘 Dépannage

### Erreur : "Unable to connect to SonarQube server"

```bash
# Vérifier que SonarQube est démarré
# Vérifier l'URL dans sonar-project.properties
# Vérifier le token
```

### Erreur : "Coverage report not found"

```bash
# Vérifier que les tests ont généré coverage/lcov.info
# Vérifier le chemin dans sonar-project.properties
npm test -- --coverage
ls coverage/lcov.info
```

### Erreur : "Project key already exists"

```bash
# Changer le projectKey dans sonar-project.properties
# Ou supprimer le projet existant sur SonarQube
```

## 📚 Ressources

- [Documentation SonarQube](https://docs.sonarqube.org/)
- [Documentation SonarCloud](https://docs.sonarcloud.io/)
- [Règles JavaScript](https://rules.sonarsource.com/javascript)

## ✅ Checklist

- [ ] SonarQube installé et démarré
- [ ] Scanner installé
- [ ] Token créé et configuré
- [ ] Fichiers sonar-project.properties configurés
- [ ] Tests avec couverture exécutés
- [ ] Analyse SonarQube réussie
- [ ] Dashboard accessible
- [ ] Qualité A atteinte

