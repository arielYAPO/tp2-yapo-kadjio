let timer = null

export default {
  namespaced: true,

  // Exercice 1 / TP : state avec cookies et autoProduction
  state: {
    cookies: 0,
    autoProduction: 0,
    multiplier: 1,
    prixUpgrade: 10,
    prixMultiplier: 100,
    totalClics: 0,
    totalCookies: 0
  },

  // Exercice 2 / TP : getters pour les statistiques
  getters: {
    doubleCookies: state => state.cookies * 2,
    cookiesParSeconde: state => state.autoProduction * state.multiplier,
    cookiesParClic: state => state.multiplier,
    peutAcheterUpgrade: state => state.cookies >= state.prixUpgrade,
    peutAcheterMultiplier: state => state.cookies >= state.prixMultiplier
  },

  // Exercice 3 / TP : mutations pour ajouter des cookies et acheter des upgrades
  mutations: {
    ajouterCookie(state) {
      state.cookies += state.multiplier
      state.totalCookies += state.multiplier
      state.totalClics++
    },
    produire(state) {
      const gain = state.autoProduction * state.multiplier
      state.cookies += gain
      state.totalCookies += gain
    },
    acheterUpgrade(state) {
      if (state.cookies >= state.prixUpgrade) {
        state.cookies -= state.prixUpgrade
        state.autoProduction++
        state.prixUpgrade = Math.round(state.prixUpgrade * 1.5)
      }
    },

    // Challenge : multiplicateur de cookies
    acheterMultiplier(state) {
      if (state.cookies >= state.prixMultiplier) {
        state.cookies -= state.prixMultiplier
        state.multiplier++
        state.prixMultiplier = state.prixMultiplier * 3
      }
    },

    chargerPartie(state, partie) {
      state.cookies = partie.cookies
      state.autoProduction = partie.autoProduction
      state.multiplier = partie.multiplier
      state.prixUpgrade = partie.prixUpgrade
      state.prixMultiplier = partie.prixMultiplier
      state.totalClics = partie.totalClics
      state.totalCookies = partie.totalCookies
    },
    resetPartie(state) {
      state.cookies = 0
      state.autoProduction = 0
      state.multiplier = 1
      state.prixUpgrade = 10
      state.prixMultiplier = 100
      state.totalClics = 0
      state.totalCookies = 0
    }
  },

  // Exercice 4 / TP : action pour la production automatique
  actions: {
    lancerProduction({ commit, dispatch }) {
      if (timer) return
      timer = setInterval(() => {
        commit('produire')
        dispatch('users/sauvegarder', null, { root: true })
      }, 1000)
    },
    arreterProduction() {
      clearInterval(timer)
      timer = null
    }
  }
}
