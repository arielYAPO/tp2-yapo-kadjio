import { createStore } from 'vuex'
import cookies from './modules/cookies'
import users from './modules/users'

// Exercice 5 : store organisé en modules
export default createStore({
  modules: {
    cookies,
    users
  }
})
