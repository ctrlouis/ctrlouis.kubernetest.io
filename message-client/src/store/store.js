import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: '',
    username: '',
  },

  mutations: {
    SET_API_URL(state, url) {
      state.apiUrl = url
    },

    SET_USERNAME(state, username) {
      state.username = username;
    },
  },

  actions: {
    setApiUrl(context, url) {
      context.commit('SET_API_URL', url)
    },

    setUsername(context, username) {
      context.commit('SET_USERNAME', username)
    },
  },

  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
});
