# Script PowerShell pour exécuter tous les tests - SmartShop TN

Write-Host "🧪 Exécution de tous les tests - SmartShop TN" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Tests Backend
Write-Host "📦 Tests Backend..." -ForegroundColor Yellow
Write-Host "-------------------" -ForegroundColor Yellow
Set-Location backend

Write-Host "  - Tests unitaires..." -NoNewline
$result = npm test -- --silent 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host " ✅" -ForegroundColor Green
} else {
    Write-Host " ❌" -ForegroundColor Red
}

Write-Host "  - Tests d'intégration..." -NoNewline
$result = npm run test:integration -- --silent 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host " ✅" -ForegroundColor Green
} else {
    Write-Host " ❌" -ForegroundColor Red
}

Set-Location ..

# Tests Frontend
Write-Host ""
Write-Host "⚛️  Tests Frontend..." -ForegroundColor Yellow
Write-Host "---------------------" -ForegroundColor Yellow
Set-Location frontend

Write-Host "  - Tests unitaires..." -NoNewline
$result = npm test -- --silent 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host " ✅" -ForegroundColor Green
} else {
    Write-Host " ❌" -ForegroundColor Red
}

Write-Host "  - Tests E2E..." -NoNewline
$result = npm run test:e2e -- --reporter=list 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host " ✅" -ForegroundColor Green
} else {
    Write-Host " ❌" -ForegroundColor Red
}

Set-Location ..

# Tests API (si Newman est installé)
Write-Host ""
Write-Host "📮 Tests API (Postman)..." -ForegroundColor Yellow
Write-Host "-------------------------" -ForegroundColor Yellow
if (Get-Command newman -ErrorAction SilentlyContinue) {
    $result = newman run postman/SmartShop-TN.postman_collection.json `
        --environment postman/postman-environment.json `
        --silent 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Tests API Postman" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Tests API Postman" -ForegroundColor Red
    }
} else {
    Write-Host "  ⚠️  Newman non installé. Installez avec: npm install -g newman" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "✅ Exécution des tests terminée!" -ForegroundColor Green
Write-Host ""
Write-Host "Pour plus de détails, exécutez les tests individuellement." -ForegroundColor Gray

