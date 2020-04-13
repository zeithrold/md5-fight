import Player from '@/models/Player';
import { Buff, BuffSlot } from '@/models/buffs';
import Vue from 'vue';
import * as api from '../commmits';
import * as types from '../mutation-types';
import { PlayerNumberPropPayload, PlayerBooleanPropPayload } from '../index';

export interface State {
  players: { [key: string]: Player };
  order: {
    first: string;
    second: string;
  };
  isEnded: boolean;
}

const initState: State = {
  players: {
    '玩家 1': new Player('玩家 1'),
    '玩家 2': new Player('玩家 2'),
  },
  order: {
    first: '玩家 1',
    second: '玩家 2',
  },
  isEnded: false,
};

const mutations = {
  [types.PLAYER_SET_ANGER](state: State, payload: PlayerNumberPropPayload) {
    const player = state.players[payload.id];

    if (payload.amount === 'default') {
      Vue.set(player.props, 'anger', 0);
    } else {
      Vue.set(player.props, 'anger', payload.amount);
    }
  },
  [types.PLAYER_SET_ATTACKABLE](state: State, payload: PlayerBooleanPropPayload) {
    Vue.set(state.players[payload.id].props, 'attackable', payload.context);
  },
  [types.PLAYER_SET_ATTACKPOWER](state: State, payload: PlayerNumberPropPayload) {
    const player = state.players[payload.id];
    if (payload.amount === 'default') {
      Vue.set(player.attackPower, 'value', player.attackPower.default);
    } else {
      Vue.set(player.attackPower, 'value', payload.amount);
    }
  },
  [types.PLAYER_SET_FORTUNATE](state: State, payload: PlayerNumberPropPayload) {
    const player = state.players[payload.id];
    if (payload.amount === 'default') {
      Vue.set(player.fortunate, 'value', player.fortunate.default);
    } else {
      Vue.set(player.fortunate, 'value', payload.amount);
    }
  },
  [types.PLAYER_SET_FREEZED](state: State, payload: PlayerBooleanPropPayload) {
    Vue.set(state.players[payload.id].props, 'freezed', payload.context);
  },
  [types.PLAYER_SET_MAGICAL_DEFENCE](state: State, payload: PlayerNumberPropPayload) {
    const player = state.players[payload.id];
    if (payload.amount === 'default') {
      Vue.set(player.magicalDefence, 'value', player.magicalDefence.default);
    } else {
      Vue.set(player.magicalDefence, 'value', payload.amount);
    }
  },
  [types.PLAYER_SET_PHYSICAL_DEFENCE](state: State, payload: PlayerNumberPropPayload) {
    const player = state.players[payload.id];
    if (payload.amount === 'default') {
      Vue.set(player.physicalDefence, 'value', player.physicalDefence.default);
    } else {
      Vue.set(player.physicalDefence, 'value', payload.amount);
    }
  },
  [types.PLAYER_SET_SPEED](state: State, payload: PlayerNumberPropPayload) {
    const player = state.players[payload.id];
    if (payload.amount === 'default') {
      Vue.set(player.speed, 'value', player.speed.default);
    } else {
      Vue.set(player.speed, 'value', payload.amount);
    }
  },
  [types.SET_PLAYER](state: State, payload: { players: string[] }) {
    Vue.set(state, 'players', {});
    Vue.set(state.players, payload.players[0], new Player(payload.players[0]));
    Vue.set(state.players, payload.players[1], new Player(payload.players[1]));
  },
  [types.SET_PLAYER_ROLE_ORDER](state: State) {
    const player1 = Object.keys(state.players)[0];
    const player2 = Object.keys(state.players)[1];
    let firstPlayer;
    let secondPlayer;
    if (state.players[player1].speed.value > state.players[player2].speed.value) {
      firstPlayer = player1;
      secondPlayer = player2;
      api.addLog({
        message: `${player1}的速度较快，由${player1}先攻。`,
      });
    } else if (state.players[player1].speed.value < state.players[player2].speed.value) {
      firstPlayer = player2;
      secondPlayer = player1;
      api.addLog({
        message: `${player2}的速度较快，由${player2}先攻。`,
      });
    } else {
      api.addLog({
        message: '两位玩家的速度相同，攻击先后顺序将由抛硬币决定。',
        bgColor: 'blue',
      });
      const random = Math.floor(Math.random() * 10) % 2 === 0 ? '正面' : '反面';
      if (random === '正面') {
        firstPlayer = player1;
        secondPlayer = player2;
      } else {
        firstPlayer = player2;
        secondPlayer = player1;
      }
      api.addLog({
        message: `抛硬币的结果为${random}，将由${firstPlayer}先攻。`,
      });
    }
    Vue.set(state, 'order', {
      first: firstPlayer,
      second: secondPlayer,
    });
    if (
      state.players[state.order.first].maxHealth === 0
      && state.players[state.order.second].maxHealth !== 0
    ) {
      api.addLog({
        message: `${state.order.first}的初始生命值为0，自动判定${state.order.second}获胜。`,
        bgColor: 'red',
      });
    } else if (
      state.players[state.order.second].maxHealth === 0
      && state.players[state.order.first].maxHealth !== 0
    ) {
      api.addLog({
        message: `${state.order.second}的初始生命值为0，自动判定${state.order.first}获胜。`,
        bgColor: 'red',
      });
    } else if (
      state.players[state.order.second].maxHealth === 0
      && state.players[state.order.first].maxHealth === 0
    ) {
      api.addLog({
        message: '两位玩家初始生命值都为0，无胜负。',
        bgColor: 'red',
      });
    }
    api.pushLogs();
  },
  [types.PLAYER_ADD_BUFF](
    state: State,
    payload: {
      buff: Buff;
      player: string;
      duration: number;
      affectNow?: boolean;
    },
  ) {
    const tempPlayer = state.players[payload.player];
    const tempBuffSlot = {
      buff: payload.buff,
      duration: payload.duration,
      created: false,
    };
    if (payload.affectNow) {
      tempBuffSlot.buff.created();
      tempBuffSlot.created = payload.affectNow;
    }
    tempPlayer.buffs.push(tempBuffSlot);
  },
  [types.BEGIN_FIGHT](state: State, payload: { player: string }) {
    const tempPlayer = state.players[payload.player];
    if (tempPlayer.buffs) {
      const remainingBuffs: BuffSlot[] = [];
      for (let i = 0; i < tempPlayer.buffs.length; i += 1) {
        const tempBuffSlot = tempPlayer.buffs[i];
        if (tempBuffSlot.duration !== 0) {
          if (!tempBuffSlot.created) {
            tempBuffSlot.buff.created();
            tempBuffSlot.created = true;
          }
          tempBuffSlot.buff.effect();
          if (tempBuffSlot.duration !== 'forever') {
            tempBuffSlot.duration -= 1;
            if (tempBuffSlot.duration === 0) {
              tempBuffSlot.buff.destroyed();
            } else {
              remainingBuffs.push(tempBuffSlot);
            }
          } else {
            remainingBuffs.push(tempBuffSlot);
          }
        } else {
          tempBuffSlot.buff.destroyed();
        }
      }
      Vue.set(tempPlayer, 'buffs', remainingBuffs);
    }
    if (tempPlayer.props.freezed) {
      return;
    }
    if (tempPlayer.skills) {
      for (let i = 0; i < tempPlayer.skills.length; i += 1) {
        const tempSkill = tempPlayer.skills[i];
        tempSkill.effect();
      }
    }
    const keys = Object.keys(state.players);
    const index = keys.indexOf(payload.player);
    // console.log(keys);
    if (index === -1) {
      throw ReferenceError("Cannot find the Player's name.");
    }
    keys.splice(index, 1);
    const oppositePlayerName = keys[0];
    // console.log(oppositePlayerName);
    const oppositePlayer = state.players[oppositePlayerName];
    api.addLog({
      message: `${payload.player}向${oppositePlayerName}发动了攻击！`,
    });
    oppositePlayer.onBeingAttack();
    if (!oppositePlayer.props.attackable) {
      return;
    }
    let tempAttackAmount = tempPlayer.attackPower.value;
    if (tempPlayer.type === 'physical') {
      const tempAttackDiscountAmount = oppositePlayer.physicalDefence.value * 0.5;
      tempAttackAmount -= tempAttackDiscountAmount;
      tempAttackAmount = tempAttackAmount < 0 ? 0 : tempAttackAmount;
      api.addLog({
        message: `${payload.player}向${oppositePlayerName}造成了${tempAttackAmount}的物理攻击！`,
      });
    } else {
      const tempAttackDiscountAmount = oppositePlayer.magicalDefence.value * 0.5;
      tempAttackAmount -= tempAttackDiscountAmount;
      tempAttackAmount = tempAttackAmount < 0 ? 0 : tempAttackAmount;
      api.addLog({
        message: `${payload.player}向${oppositePlayerName}造成了${tempAttackAmount}的物理攻击！`,
      });
    }
    this.PLAYER_DECREASE_HEALTH(state, { id: oppositePlayer.name, amount: tempAttackAmount });
    api.pushLogs();
  },
  [types.PLAYER_DECREASE_HEALTH](state: State, payload: { id: string; amount: number }) {
    Vue.set(state.players[payload.id], 'health', state.players[payload.id].health - payload.amount);
  },
  [types.PLAYER_INCREASE_HEALTH](state: State, payload: { id: string; amount: number }) {
    Vue.set(state.players[payload.id], 'health', state.players[payload.id].health + payload.amount);
  },
};

export default {
  state: initState,
  mutations,
};
