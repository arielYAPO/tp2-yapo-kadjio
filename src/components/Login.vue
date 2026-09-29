<template>
  <section class="login">
    <h1 class="grand">Une partie<br /><em>en cours ?</em></h1>
    <p class="aide">Entre ton pseudo. S'il n'existe pas encore, ton compte est créé et ta partie démarre.</p>

    <form @submit.prevent="seConnecter">
      <label>
        <span>Pseudo</span>
        <input v-model="nom" autocomplete="username" />
      </label>

      <label>
        <span>Mot de passe</span>
        <input v-model="motDePasse" type="password" autocomplete="current-password" />
      </label>

      <div class="roles">
        <span>Rôle</span>
        <div class="choix">
          <button type="button" :class="{ actif: role === 'Player' }" @click="role = 'Player'">Player</button>
          <button type="button" :class="{ actif: role === 'Admin' }" @click="role = 'Admin'">Admin</button>
        </div>
      </div>

      <p v-if="erreur" class="erreur">{{ erreur }}</p>

      <button class="bouton" type="submit">Jouer</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      nom: '',
      motDePasse: '',
      role: 'Player',
      erreur: ''
    }
  },
  methods: {
    async seConnecter() {
      if (this.nom === '' || this.motDePasse === '') {
        this.erreur = 'Remplis le pseudo et le mot de passe.'
        return
      }
      const ok = await this.$store.dispatch('users/connexion', {
        nom: this.nom,
        motDePasse: this.motDePasse,
        role: this.role
      })
      if (!ok) {
        this.erreur = 'Mot de passe incorrect.'
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 420px;
  margin: 40px auto 0;
}

.grand {
  font-family: var(--affiche);
  font-weight: 300;
  font-size: 60px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin: 0 0 16px;
}

.grand em {
  color: var(--accent);
}

.aide {
  color: var(--gris);
  margin: 0 0 40px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label,
.roles {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label span,
.roles > span {
  font-size: 13px;
  color: var(--gris);
}

input {
  background: var(--carte);
  border: 1px solid var(--trait);
  border-radius: 10px;
  padding: 12px 14px;
  transition: border-color 150ms ease;
}

input:focus {
  border-color: var(--encre);
}

.choix {
  display: inline-flex;
  background: var(--carte);
  border: 1px solid var(--trait);
  border-radius: 999px;
  padding: 4px;
  align-self: flex-start;
}

.choix button {
  background: none;
  border: none;
  border-radius: 999px;
  padding: 6px 18px;
  color: var(--gris);
  transition: background-color 150ms ease, color 150ms ease;
}

.choix button.actif {
  background: var(--encre);
  color: var(--carte);
}

.erreur {
  color: var(--accent);
  margin: 0;
}

.bouton {
  align-self: flex-start;
  padding: 12px 32px;
}
</style>
