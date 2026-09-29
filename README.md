# TP2 Cookie Clicker

Ariel YAPO et Ryan KADJIO

## Jouer en ligne

https://arielyapo.github.io/tp2-yapo-kadjio/

## Lancer le projet

```
npm install
npm run dev
```

## Fonctionnalités

- Clic sur le cookie pour gagner des cookies
- Upgrade qui augmente la production automatique (le prix augmente à chaque achat)
- Multiplicateur de cookies
- Statistiques avec les getters
- Connexion avec pseudo et mot de passe, sauvegarde et chargement de la partie
- Rôles Player et Admin (l'admin peut modifier les scores et reset le jeu)
- Classement des joueurs et défi contre un autre joueur

## Vuex

- `src/store/modules/cookies.js` : state, getters, mutations et actions du jeu
- `src/store/modules/users.js` : joueurs, connexion, sauvegarde, rôles et classement
