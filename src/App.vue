<template>
  <div class="page">
    <header class="topbar">
      <span class="logo">cookie<span class="point">.</span></span>

      <div v-if="joueur" class="compte">
        <span class="nom">{{ joueur.nom }}</span>
        <span class="role">{{ joueur.role }}</span>
        <button class="lien" @click="sauvegarder">{{ sauvegarde ? 'Sauvegardé' : 'Sauvegarder' }}</button>
        <button class="lien" @click="$store.dispatch('users/deconnexion')">Déconnexion</button>
      </div>
    </header>

    <Login v-if="!joueur" />

    <main v-else>
      <CookieClicker />
      <div class="bas">
        <Leaderboard />
        <AdminPanel v-if="$store.getters['users/estAdmin']" />
      </div>
    </main>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import CookieClicker from './components/CookieClicker.vue'
import Leaderboard from './components/Leaderboard.vue'
import AdminPanel from './components/AdminPanel.vue'

export default {
  components: { Login, CookieClicker, Leaderboard, AdminPanel },
  data() {
    return {
      sauvegarde: false
    }
  },
  computed: {
    joueur() {
      return this.$store.state.users.joueurConnecte
    }
  },
  methods: {
    sauvegarder() {
      this.$store.dispatch('users/sauvegarder')
      this.sauvegarde = true
      setTimeout(() => {
        this.sauvegarde = false
      }, 1500)
    }
  }
}
</script>

<style>
:root {
  --fond: #f3efe7;
  --carte: #fbf9f5;
  --encre: #1c1a17;
  --gris: #6e675d;
  --trait: #ddd6ca;
  --accent: #a8481a;
  --pate: #d9a066;
  --pate-fonce: #c0854c;
  --chocolat: #3b2418;

  --affiche: 'Jost', 'Futura', sans-serif;
  --texte: 'Jost', 'Futura', sans-serif;
  --mono: 'Spline Sans Mono', ui-monospace, monospace;

  --sortie: cubic-bezier(0.23, 1, 0.32, 1);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--fond);
  color: var(--encre);
  font-family: var(--texte);
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

button,
input {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.titre {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gris);
  margin: 0 0 16px;
}

.bouton {
  background: var(--encre);
  color: var(--carte);
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  font-weight: 500;
  transition: background-color 150ms ease;
}

.bouton:hover {
  background: var(--accent);
}

.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid var(--trait);
  margin-bottom: 48px;
}

.logo {
  font-family: var(--affiche);
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
}

.point {
  color: var(--accent);
}

.compte {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nom {
  font-weight: 500;
}

.role {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid var(--trait);
  border-radius: 999px;
  padding: 2px 10px;
  color: var(--gris);
}

.lien {
  background: none;
  border: none;
  padding: 0;
  color: var(--gris);
  transition: color 150ms ease;
}

.lien:hover {
  color: var(--encre);
}

.bas {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 48px;
  margin-top: 64px;
  padding-top: 48px;
  border-top: 1px solid var(--trait);
}

@media (max-width: 800px) {
  .bas {
    grid-template-columns: minmax(0, 1fr);
  }
  .compte .nom,
  .compte .role {
    display: none;
  }
}
</style>
