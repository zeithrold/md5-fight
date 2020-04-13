import { Log } from '@/models/logs';
import { Mutation, MutationTree } from 'vuex';
import { State } from './index';


const addLog: Mutation<State> = (state: State, payload: { log: Log }) => {
  state.logs.unstagedLogs.push(payload.log);
};

const pushLogs: Mutation<State> = (state: State) => {
  state.logs.logs.push(state.logs.unstagedLogs);
  state.logs.unstagedLogs = [];
};

const clearLogs: Mutation<State> = (state: State) => {
  state.logs.logs = [];
  state.logs.unstagedLogs = [];
};

const mutations: MutationTree<State> = {
  addLog,
  pushLogs,
  clearLogs,
};

export default mutations;
