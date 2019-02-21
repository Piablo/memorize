import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ElapsedDays: 0
  },
  mutations: {
    SET_ELAPSED_DAYS: (state, payload) => {
      state.ElapsedDays = payload;
    },

  },
  actions: {

  }
})
