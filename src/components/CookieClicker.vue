<template>
  <section class="clicker">
    <div class="scene">
      <p class="titre">Cookies</p>
      <p class="compteur">{{ cookies.cookies.toLocaleString('fr-FR') }}</p>
      <p class="vitesse">
        <span>{{ $store.getters['cookies/cookiesParSeconde'] }} / seconde</span>
        <span>×{{ $store.getters['cookies/cookiesParClic'] }} par clic</span>
      </p>

      <button class="cookie" @click="cliquer" aria-label="Cliquer sur le cookie">
        <svg viewBox="0 0 200 200" width="240" height="240" aria-hidden="true">
          <circle cx="100" cy="100" r="92" fill="var(--pate-fonce)" />
          <circle cx="100" cy="96" r="88" fill="var(--pate)" />
          <ellipse cx="70" cy="62" rx="9" ry="7" fill="var(--chocolat)" />
          <ellipse cx="128" cy="54" rx="7" ry="6" fill="var(--chocolat)" />
          <ellipse cx="140" cy="104" rx="10" ry="8" fill="var(--chocolat)" />
          <ellipse cx="92" cy="110" rx="8" ry="7" fill="var(--chocolat)" />
          <ellipse cx="56" cy="124" rx="7" ry="6" fill="var(--chocolat)" />
          <ellipse cx="112" cy="150" rx="9" ry="7" fill="var(--chocolat)" />
          <ellipse cx="100" cy="72" rx="5" ry="4" fill="var(--chocolat)" />
        </svg>
        <span
          v-for="bulle in bulles"
          :key="bulle.id"
          class="bulle"
          :style="{ left: bulle.x + 'px', top: bulle.y + 'px' }"
        >+{{ bulle.valeur }}</span>
      </button>
    </div>

    <aside class="cote">
      <h2 class="titre">Boutique</h2>

      <div class="article">
        <div>
          <p class="article-nom">Four</p>
          <p class="article-info">+1 cookie par seconde · {{ cookies.autoProduction }} possédé(s)</p>
        </div>
        <button
          class="acheter"
          @click="$store.commit('cookies/acheterUpgrade')"
          :disabled="!$store.getters['cookies/peutAcheterUpgrade']"
        >
          {{ cookies.prixUpgrade.toLocaleString('fr-FR') }}
        </button>
      </div>

      <div class="article">
        <div>
          <p class="article-nom">Multiplicateur</p>
          <p class="article-info">+1 au multiplicateur · actuel ×{{ cookies.multiplier }}</p>
        </div>
        <button
          class="acheter"
          @click="$store.commit('cookies/acheterMultiplier')"
          :disabled="!$store.getters['cookies/peutAcheterMultiplier']"
        >
          {{ cookies.prixMultiplier.toLocaleString('fr-FR') }}
        </button>
      </div>

      <h2 class="titre stats-titre">Statistiques</h2>
      <dl class="stats">
        <div>
          <dt>Double des cookies</dt>
          <dd>{{ $store.getters['cookies/doubleCookies'].toLocaleString('fr-FR') }}</dd>
        </div>
        <div>
          <dt>Production auto</dt>
          <dd>{{ cookies.autoProduction }}</dd>
        </div>
        <div>
          <dt>Multiplicateur</dt>
          <dd>×{{ cookies.multiplier }}</dd>
        </div>
        <div>
          <dt>Cookies par clic</dt>
          <dd>{{ $store.getters['cookies/cookiesParClic'] }}</dd>
        </div>
        <div>
          <dt>Cookies par seconde</dt>
          <dd>{{ $store.getters['cookies/cookiesParSeconde'] }}</dd>
        </div>
        <div>
          <dt>Nombre de clics</dt>
          <dd>{{ cookies.totalClics.toLocaleString('fr-FR') }}</dd>
        </div>
        <div>
          <dt>Cookies gagnés au total</dt>
          <dd>{{ cookies.totalCookies.toLocaleString('fr-FR') }}</dd>
        </div>
      </dl>
    </aside>
  </section>
</template>

<script>
export default {
  data() {
    return {
      bulles: [],
      compteurBulles: 0
    }
  },
  computed: {
    cookies() {
      return this.$store.state.cookies
    }
  },
  methods: {
    cliquer(event) {
      this.$store.commit('cookies/ajouterCookie')

      const zone = event.currentTarget.getBoundingClientRect()
      const x = event.clientX ? event.clientX - zone.left : zone.width / 2
      const y = event.clientY ? event.clientY - zone.top : zone.height / 2

      this.compteurBulles++
      const bulle = { id: this.compteurBulles, x: x, y: y, valeur: this.cookies.multiplier }
      this.bulles.push(bulle)

      setTimeout(() => {
        this.bulles = this.bulles.filter(b => b.id !== bulle.id)
      }, 700)
    }
  }
}
</script>

<style scoped>
.clicker {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 64px;
  align-items: start;
}

.scene {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.compteur {
  font-family: var(--affiche);
  font-size: clamp(72px, 12vw, 152px);
  font-weight: 300;
  line-height: 0.85;
  letter-spacing: -0.05em;
  margin: 0;
  font-variant-numeric: tabular-nums;
}

.vitesse {
  display: flex;
  gap: 24px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--gris);
  margin: 16px 0 40px;
}

.cookie {
  position: relative;
  align-self: center;
  background: none;
  border: none;
  padding: 0;
  border-radius: 50%;
  transition: transform 100ms var(--sortie);
  -webkit-tap-highlight-color: transparent;
}

.cookie svg {
  display: block;
  filter: drop-shadow(0 18px 24px rgba(59, 36, 24, 0.18));
}

.cookie:active {
  transform: scale(0.96);
}

@media (hover: hover) and (pointer: fine) {
  .cookie:hover {
    transform: scale(1.02);
  }
  .cookie:hover:active {
    transform: scale(0.96);
  }
}

.bulle {
  position: absolute;
  font-family: var(--mono);
  font-weight: 500;
  font-size: 16px;
  color: var(--accent);
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: monter 700ms var(--sortie) forwards;
}

@keyframes monter {
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -150%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bulle {
    animation: disparaitre 700ms ease forwards;
  }
  .cookie,
  .cookie:hover,
  .cookie:active {
    transform: none;
  }
}

@keyframes disparaitre {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.cote {
  padding-top: 8px;
}

.article {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid var(--trait);
}

.article:last-of-type {
  border-bottom: 1px solid var(--trait);
}

.article-nom {
  font-weight: 500;
  margin: 0;
}

.article-info {
  font-size: 13px;
  color: var(--gris);
  margin: 2px 0 0;
}

.acheter {
  min-width: 88px;
  font-family: var(--mono);
  font-size: 13px;
  background: var(--encre);
  color: var(--carte);
  border: 1px solid var(--encre);
  border-radius: 999px;
  padding: 8px 16px;
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
}

.acheter:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
}

.acheter:disabled {
  background: transparent;
  color: var(--gris);
  border-color: var(--trait);
  cursor: not-allowed;
}

.stats-titre {
  margin-top: 48px;
}

.stats {
  margin: 0;
}

.stats div {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--trait);
}

.stats dt {
  color: var(--gris);
}

.stats dd {
  margin: 0;
  font-family: var(--mono);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 800px) {
  .clicker {
    grid-template-columns: minmax(0, 1fr);
    gap: 48px;
  }
  .cookie svg {
    width: 200px;
    height: 200px;
  }
}
</style>
