import Vue from 'vue';
import Vuex from 'vuex';
import fight, { State as FightState } from './modules/fight';
import logs, { State as LogsState } from './modules/logs';
import site, { State as SiteState } from './modules/site';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export interface State {
  fight: FightState;
  logs: LogsState;
  site: SiteState;
}

export interface PlayerNumberPropPayload {
  id: string;
  amount: number | 'default';
}

export interface PlayerBooleanPropPayload {
  id: string;
  context: boolean;
}

export default new Vuex.Store({
  modules: {
    fight,
    logs,
    site,
  },
  mutations,
  getters,
});
