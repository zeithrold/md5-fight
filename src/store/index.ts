import Vue from 'vue';
import Vuex from 'vuex';
import Fight from './fight';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  mutations: {},
  state: {},

  modules: {
    fight: Fight,
  },
});
