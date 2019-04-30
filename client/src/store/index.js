import Vue from 'vue'
import Vuex from 'vuex';
import todos from './modules/todos';
import appState from './modules/appState';
import slides from './modules/slides';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos,
    appState,
    slides
  },
})
