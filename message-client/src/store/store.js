import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: '',
  },

  mutations: {
    setApiUrl(state, url) {
      state.apiUrl = url
    }
  },

  actions: {
    setApiUrl(context, url) {
      context.commit('setApiUrl', url)
    }
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
