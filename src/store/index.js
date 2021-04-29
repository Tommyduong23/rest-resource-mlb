import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedSeason: null,
  },
  mutations: {
    setSeason (state, season) {
      state.selectedSeason = season
    }
  },
  actions: {},
  modules: {},
})
