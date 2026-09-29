<template>
  <section>
    <h2 class="titre">Administration</h2>

    <div v-for="joueur in $store.state.users.joueurs" :key="joueur.nom" class="ligne">
      <label :for="'score-' + joueur.nom">
        {{ joueur.nom }}
        <span>{{ joueur.role }}</span>
      </label>
      <input
        :id="'score-' + joueur.nom"
        type="number"
        min="0"
        v-model.number="nouveauxScores[joueur.nom]"
        :placeholder="joueur.partie.cookies"
      />
      <button class="modifier" @click="modifier(joueur.nom)">Modifier</button>
    </div>

    <div class="danger">
      <div>
        <p class="danger-titre">Reset le jeu</p>
        <p class="danger-info">Remet tous les scores à zéro.</p>
      </div>
      <button class="reset" @click="reset">Reset</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      nouveauxScores: {}
    }
  },
  methods: {
    modifier(nom) {
      const cookies = this.nouveauxScores[nom]
      if (cookies === undefined || cookies === '') return
      this.$store.dispatch('users/modifierScore', { nom, cookies })
      this.nouveauxScores[nom] = ''
    },
    reset() {
      if (confirm('Remettre tous les scores à 0 ?')) {
        this.$store.dispatch('users/resetJeu')
      }
    }
  }
}
</script>

<style scoped>
.ligne {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 90px auto;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid var(--trait);
}

.ligne label span {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--gris);
  margin-left: 8px;
}

input {
  width: 100%;
  background: var(--carte);
  border: 1px solid var(--trait);
  border-radius: 8px;
  padding: 6px 10px;
  font-family: var(--mono);
  font-size: 13px;
}

.modifier {
  background: none;
  border: 1px solid var(--trait);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 13px;
  transition: border-color 150ms ease;
}

.modifier:hover {
  border-color: var(--encre);
}

.danger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  padding: 16px 20px;
  border: 1px solid var(--accent);
  border-radius: 12px;
}

.danger-titre {
  margin: 0;
  font-weight: 500;
}

.danger-info {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--gris);
}

.reset {
  background: var(--accent);
  color: var(--carte);
  border: none;
  border-radius: 999px;
  padding: 8px 18px;
  font-weight: 500;
}
</style>
