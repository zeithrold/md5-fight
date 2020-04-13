import Vue from 'vue';
import * as types from '../mutation-types';

export interface State {
  dialogs: { [key: string]: boolean };
}

const initState: State = {
  dialogs: {},
};

const mutations = {
  [types.DIALOG_REGISTER](state: State, payload: { id: string }) {
    Vue.set(state.dialogs, payload.id, false);
    console.log(payload.id);
  },
  [types.DIALOG_OPEN](state: State, payload: { id: string }) {
    if (Object.keys(state.dialogs).indexOf(payload.id) === -1) {
      throw Error(`Dialog ${payload.id} is not registered, register it before open.`);
    }
    Vue.set(state.dialogs, payload.id, true);
    // console.log(state.dialogs[payload.id]);
  },
  [types.DIALOG_CLOSE](state: State, payload: { id: string }) {
    if (Object.keys(state.dialogs).indexOf(payload.id) === -1) {
      throw Error(`Dialog ${payload.id} is not registered, register it before close.`);
    }
    Vue.set(state.dialogs, payload.id, false);
  },
};

export default {
  state: initState,
  mutations,
};
