# Solution Rapide - Problème de Login

## 🔧 Étapes pour Résoudre le Problème

### 1. Vérifier que le Backend est Démarré

```bash
cd backend
npm run dev
```

Vous devriez voir:
```
✅ Connected to MongoDB
🚀 Server running on port 3000
```

### 2. Créer les Utilisateurs dans la Base de Données

```bash
cd backend
npm run seed:users
```

Cela créera:
- **Admin**: `admin@smarthop.tn` / `admin123`
- **Client**: `client@smarthop.tn` / `client123`

### 3. Redémarrer le Frontend

```bash
cd frontend
npm run dev
```

### 4. Tester le Login

1. Ouvrez http://localhost:5173/login
2. Ouvrez la console du navigateur (F12)
3. Utilisez ces credentials:
   - Email: `client@smarthop.tn`
   - Password: `client123`
4. Regardez les logs dans la console

## 📊 Ce que Vous Devriez Voir

### Dans la Console du Navigateur:

```
🌐 API URL: http://localhost:3000/api
🔐 Tentative de connexion avec: client@smarthop.tn
📡 Envoi de la requête de login à: http://localhost:3000/api/auth/login
📤 POST /auth/login {email: "client@smarthop.tn", password: "..."}
📥 Réponse 200 /auth/login {token: "...", user: {...}}
✅ Connexion réussie
```

### Dans le Terminal Backend:

```
POST /api/auth/login
```

## 🐛 Si Ça Ne Fonctionne Toujours Pas

1. **Vérifier l'URL de l'API:**
   - Ouvrez la console (F12)
   - Regardez le premier message: `🌐 API URL: ...`
   - Vérifiez que c'est `http://localhost:3000/api`

2. **Tester l'API directement:**
   - Ouvrez http://localhost:3000/health dans votre navigateur
   - Vous devriez voir: `{"status":"OK","message":"SmartShop TN API is running"}`

3. **Vérifier les logs détaillés:**
   - Regardez la console du navigateur pour les erreurs
   - Regardez le terminal backend pour les erreurs

4. **Vérifier MongoDB:**
   - Assurez-vous que MongoDB est démarré
   - Vérifiez les logs du backend pour les erreurs de connexion

## ✅ Checklist

- [ ] Backend démarré (port 3000)
- [ ] Frontend démarré (port 5173)
- [ ] MongoDB démarré et connecté
- [ ] Utilisateurs créés (`npm run seed:users`)
- [ ] Console du navigateur ouverte (F12)
- [ ] Onglet Network ouvert avec "Preserve log" coché

