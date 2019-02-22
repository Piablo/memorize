import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ElapsedDays: 0,
    CardsToTest: [],
  },
  mutations: {
    SET_ELAPSED_DAYS: (state, payload) => {
      state.ElapsedDays = payload;
    },

    SET_CARDS_TO_TEST: (state, payload) => {
      state.CardsToTest = payload;
    },

  },
  actions: {

  }
})
