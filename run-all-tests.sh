#!/bin/bash

# Script pour exécuter tous les tests du projet SmartShop TN

echo "🧪 Exécution de tous les tests - SmartShop TN"
echo "=============================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Tests Backend
echo "📦 Tests Backend..."
echo "-------------------"
cd backend

echo "  - Tests unitaires..."
npm test -- --silent > /dev/null 2>&1
print_result $? "Tests unitaires backend"

echo "  - Tests d'intégration..."
npm run test:integration -- --silent > /dev/null 2>&1
print_result $? "Tests d'intégration backend"

cd ..

# Tests Frontend
echo ""
echo "⚛️  Tests Frontend..."
echo "---------------------"
cd frontend

echo "  - Tests unitaires..."
npm test -- --silent > /dev/null 2>&1
print_result $? "Tests unitaires frontend"

echo "  - Tests E2E..."
npm run test:e2e -- --reporter=list > /dev/null 2>&1
print_result $? "Tests E2E frontend"

cd ..

# Tests API (si Newman est installé)
echo ""
echo "📮 Tests API (Postman)..."
echo "-------------------------"
if command -v newman &> /dev/null; then
    newman run postman/SmartShop-TN.postman_collection.json \
        --environment postman/postman-environment.json \
        --silent > /dev/null 2>&1
    print_result $? "Tests API Postman"
else
    echo -e "${YELLOW}⚠️  Newman non installé. Installez avec: npm install -g newman${NC}"
fi

echo ""
echo "=============================================="
echo "✅ Exécution des tests terminée!"
echo ""
echo "Pour plus de détails, exécutez les tests individuellement."

