<template>
  <section>
    <h2 class="titre">Classement</h2>

    <ol class="liste">
      <li
        v-for="(joueur, index) in $store.getters['users/classement']"
        :key="joueur.nom"
        :class="{ moi: joueur.nom === monNom }"
      >
        <span class="rang">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="nom">{{ joueur.nom }}</span>
        <span class="score">{{ joueur.partie.cookies.toLocaleString('fr-FR') }}</span>
        <button v-if="joueur.nom !== monNom" class="defier" @click="defier(joueur)">Défier</button>
        <span v-else class="toi">toi</span>
      </li>
    </ol>

    <p v-if="resultatDefi" class="resultat" :class="resultatDefi.type">
      <span class="resultat-titre">{{ resultatDefi.titre }}</span>
      <span class="resultat-detail">{{ resultatDefi.detail }}</span>
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      resultatDefi: null
    }
  },
  computed: {
    monNom() {
      return this.$store.state.users.joueurConnecte.nom
    }
  },
  methods: {
    defier(adversaire) {
      const mesCookies = this.$store.state.cookies.cookies
      const sesCookies = adversaire.partie.cookies
      const detail = mesCookies + ' contre ' + sesCookies + ' cookies'

      if (mesCookies > sesCookies) {
        this.resultatDefi = { type: 'gagne', titre: 'Victoire contre ' + adversaire.nom, detail: detail }
      } else if (mesCookies < sesCookies) {
        this.resultatDefi = { type: 'perdu', titre: 'Défaite contre ' + adversaire.nom, detail: detail }
      } else {
        this.resultatDefi = { type: 'egalite', titre: 'Égalité avec ' + adversaire.nom, detail: detail }
      }
    }
  }
}
</script>

<style scoped>
.liste {
  list-style: none;
  margin: 0;
  padding: 0;
}

.liste li {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto 72px;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--trait);
}

.liste li:last-child {
  border-bottom: 1px solid var(--trait);
}

.rang {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--gris);
}

.nom {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.moi .nom {
  font-weight: 600;
}

.moi .rang {
  color: var(--accent);
}

.score {
  font-family: var(--mono);
  font-variant-numeric: tabular-nums;
}

.defier {
  justify-self: end;
  background: none;
  border: 1px solid var(--trait);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 13px;
  transition: border-color 150ms ease;
}

.defier:hover {
  border-color: var(--encre);
}

.toi {
  justify-self: end;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
  padding-right: 12px;
}

.resultat {
  display: flex;
  flex-direction: column;
  margin: 24px 0 0;
  padding: 16px 20px;
  background: var(--carte);
  border-radius: 12px;
}

.resultat-titre {
  font-family: var(--affiche);
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.gagne .resultat-titre {
  color: var(--accent);
}

.resultat-detail {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--gris);
  margin-top: 4px;
}
</style>
