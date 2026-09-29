function lireJoueurs() {
  return JSON.parse(localStorage.getItem('joueurs')) || []
}

function enregistrerJoueurs(joueurs) {
  localStorage.setItem('joueurs', JSON.stringify(joueurs))
}

function nouvellePartie() {
  return {
    cookies: 0,
    autoProduction: 0,
    multiplier: 1,
    prixUpgrade: 10,
    prixMultiplier: 100,
    totalClics: 0,
    totalCookies: 0
  }
}

export default {
  namespaced: true,

  // Challenge : système d'utilisateurs
  state: {
    joueurs: lireJoueurs(),
    joueurConnecte: null
  },

  getters: {
    // Challenge : leaderboard
    classement: state => [...state.joueurs].sort((a, b) => b.partie.cookies - a.partie.cookies),
    // Challenge : rôles Player / Admin
    estAdmin: state => state.joueurConnecte !== null && state.joueurConnecte.role === 'Admin'
  },

  mutations: {
    ajouterJoueur(state, joueur) {
      state.joueurs.push(joueur)
      enregistrerJoueurs(state.joueurs)
    },
    connecter(state, joueur) {
      state.joueurConnecte = joueur
    },
    deconnecter(state) {
      state.joueurConnecte = null
    },
    sauvegarderPartie(state, { nom, partie }) {
      const joueur = state.joueurs.find(j => j.nom === nom)
      joueur.partie = { ...partie }
      enregistrerJoueurs(state.joueurs)
    },
    modifierScore(state, { nom, cookies }) {
      const joueur = state.joueurs.find(j => j.nom === nom)
      joueur.partie.cookies = cookies
      enregistrerJoueurs(state.joueurs)
    },
    resetTousLesScores(state) {
      state.joueurs.forEach(j => {
        j.partie = nouvellePartie()
      })
      enregistrerJoueurs(state.joueurs)
    }
  },

  actions: {
    // Challenge : authentification simple + chargement de la partie
    connexion({ state, commit, dispatch }, { nom, motDePasse, role }) {
      let joueur = state.joueurs.find(j => j.nom === nom)

      if (!joueur) {
        joueur = { nom, motDePasse, role, partie: nouvellePartie() }
        commit('ajouterJoueur', joueur)
      } else if (joueur.motDePasse !== motDePasse) {
        return false
      }

      commit('connecter', joueur)
      commit('cookies/chargerPartie', joueur.partie, { root: true })
      dispatch('cookies/lancerProduction', null, { root: true })
      return true
    },

    // Challenge : sauvegarde de la partie
    sauvegarder({ state, rootState, commit }) {
      if (!state.joueurConnecte) return
      commit('sauvegarderPartie', {
        nom: state.joueurConnecte.nom,
        partie: rootState.cookies
      })
    },

    deconnexion({ commit, dispatch }) {
      dispatch('sauvegarder')
      dispatch('cookies/arreterProduction', null, { root: true })
      commit('cookies/resetPartie', null, { root: true })
      commit('deconnecter')
    },

    // Challenge : l'admin modifie les scores
    modifierScore({ state, rootState, commit }, { nom, cookies }) {
      commit('modifierScore', { nom, cookies })
      if (state.joueurConnecte.nom === nom) {
        commit('cookies/chargerPartie', { ...rootState.cookies, cookies }, { root: true })
      }
    },

    // Challenge : l'admin reset le jeu
    resetJeu({ commit }) {
      commit('resetTousLesScores')
      commit('cookies/resetPartie', null, { root: true })
    }
  }
}
