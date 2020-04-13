import { Log } from '@/models/logs';

export interface State {
  unstagedLogs: Log[];
  logs: Log[][];
}

const state: State = {
  unstagedLogs: [],
  logs: [],
};

export default {
  state,
};
