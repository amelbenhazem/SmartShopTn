# Guide de Débogage - Problème de Login

## 🔍 Vérifications à Faire

### 1. Vérifier que le Backend est Démarré

```bash
cd backend
npm run dev
```

Vous devriez voir:
```
✅ Connected to MongoDB
🚀 Server running on port 3000
🌐 API available at http://localhost:3000/api
```

### 2. Tester l'Endpoint de Login Directement

Ouvrez votre navigateur ou utilisez curl:

```bash
# Avec curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"client@smarthop.tn","password":"client123"}'

# Ou avec PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"client@smarthop.tn","password":"client123"}'
```

### 3. Vérifier la Console du Navigateur

1. Ouvrez les DevTools (F12)
2. Allez dans l'onglet "Console"
3. Essayez de vous connecter
4. Regardez les messages de log:
   - `🔐 Tentative de connexion avec: ...`
   - `📡 Envoi de la requête de login à: ...`
   - `📥 Réponse reçue: ...` ou `❌ Erreur de connexion: ...`

### 4. Vérifier l'Onglet Network

1. Ouvrez les DevTools (F12)
2. Allez dans l'onglet "Network"
3. Cochez "Preserve log" pour garder les requêtes même après rechargement
4. Essayez de vous connecter
5. Cherchez la requête vers `/api/auth/login`
6. Vérifiez:
   - Le statut (200 = OK, 400/401 = Erreur, Failed = Pas de connexion)
   - La réponse dans l'onglet "Response"
   - Les en-têtes dans l'onglet "Headers"

### 5. Vérifier les Variables d'Environnement

```bash
# Frontend
cd frontend
npm run check:env

# Vérifier que VITE_API_URL est correct
```

### 6. Vérifier CORS

Si vous voyez une erreur CORS dans la console:
- Vérifiez que le backend autorise les requêtes depuis `http://localhost:5173`
- Vérifiez la configuration CORS dans `backend/src/server.js`

## 🐛 Problèmes Courants

### Problème: "Failed to fetch" ou "Network Error"

**Cause**: Le backend n'est pas démarré ou l'URL est incorrecte.

**Solution**:
1. Vérifier que le backend est démarré
2. Vérifier `VITE_API_URL` dans `frontend/.env`
3. Tester l'URL directement dans le navigateur: `http://localhost:3000/health`

### Problème: "401 Unauthorized"

**Cause**: Email ou mot de passe incorrect.

**Solution**:
1. Vérifier que vous utilisez les bons credentials:
   - Admin: `admin@smarthop.tn` / `admin123`
   - Client: `client@smarthop.tn` / `client123`
2. Vérifier que les utilisateurs existent dans la base de données:
   ```bash
   cd backend
   npm run seed:users
   ```

### Problème: "400 Bad Request"

**Cause**: Données invalides (email ou mot de passe manquant).

**Solution**:
1. Vérifier que tous les champs sont remplis
2. Vérifier le format de l'email
3. Vérifier les logs du backend pour plus de détails

### Problème: La Page se Recharge

**Cause**: Erreur non gérée qui cause un rechargement.

**Solution**:
1. Vérifier la console pour les erreurs
2. Vérifier que `e.preventDefault()` est bien appelé
3. Vérifier qu'il n'y a pas d'erreur JavaScript qui cause un crash

## 🔧 Commandes Utiles

### Vérifier les Logs Backend

```bash
cd backend
npm run dev
# Regardez les logs dans le terminal
```

### Vérifier les Logs Frontend

Ouvrez la console du navigateur (F12) et regardez l'onglet "Console".

### Tester l'API avec Postman

1. Ouvrez Postman
2. Créez une requête POST vers `http://localhost:3000/api/auth/login`
3. Body (raw JSON):
   ```json
   {
     "email": "client@smarthop.tn",
     "password": "client123"
   }
   ```
4. Envoyez la requête

## 📝 Logs à Surveiller

### Frontend (Console du Navigateur)

```
🌐 API URL: http://localhost:3000/api
🔐 Tentative de connexion avec: client@smarthop.tn
📡 Envoi de la requête de login à: http://localhost:3000/api/auth/login
📤 POST /auth/login {email: "...", password: "..."}
📥 Réponse 200 /auth/login {token: "...", user: {...}}
✅ Connexion réussie
```

### Backend (Terminal)

```
POST /api/auth/login
✅ Connected to MongoDB
```

## ✅ Checklist de Débogage

- [ ] Backend démarré et accessible
- [ ] MongoDB connecté
- [ ] Variables d'environnement correctes
- [ ] Console du navigateur ouverte
- [ ] Onglet Network ouvert avec "Preserve log"
- [ ] Utilisateurs seedés dans la base de données
- [ ] Pas d'erreurs CORS
- [ ] URL de l'API correcte

## 🆘 Si Rien ne Fonctionne

1. Redémarrer le backend
2. Redémarrer le frontend
3. Vider le cache du navigateur (Ctrl+Shift+Delete)
4. Vérifier les logs complets dans la console
5. Tester avec Postman pour isoler le problème

