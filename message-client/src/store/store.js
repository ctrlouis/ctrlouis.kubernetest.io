import Vue from 'vue'
import Vuex from 'vuex'

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
  }
});
