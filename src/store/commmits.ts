import { Log } from '@/models/logs';
import { Buff } from '@/models/buffs';
import store, { PlayerBooleanPropPayload, PlayerNumberPropPayload } from './index';
import * as types from './mutation-types';

export const setPlayer = (...players: string[]) => {
  store.commit(types.SET_PLAYER, { players });
};

export const setPlayerSpeed = (payload: PlayerNumberPropPayload) => {
  store.commit(types.PLAYER_SET_SPEED, payload);
};

export const setPlayerPhysicalDefence = (payload: PlayerNumberPropPayload) => {
  store.commit(types.PLAYER_SET_PHYSICAL_DEFENCE, payload);
};

export const setPlayerMagicalDefence = (payload: PlayerNumberPropPayload) => {
  store.commit(types.PLAYER_SET_MAGICAL_DEFENCE, payload);
};

export const setPlayerFreezed = (payload: PlayerBooleanPropPayload) => {
  store.commit(types.PLAYER_SET_FREEZED, payload);
};

export const setPlayerFortunate = (payload: PlayerNumberPropPayload) => {
  store.commit(types.PLAYER_SET_FORTUNATE, payload);
};

export const setPlayerAttackPower = (payload: PlayerNumberPropPayload) => {
  store.commit(types.PLAYER_SET_ATTACKPOWER, payload);
};

export const setPlayerHealth = (payload: PlayerNumberPropPayload) => {
  store.commit(types.PLAYER_SET_HEALTH, payload);
};

export const setPlayerAttackable = (payload: PlayerBooleanPropPayload) => {
  store.commit(types.PLAYER_SET_ATTACKABLE, payload);
};

export const setPlayerAnger = (payload: PlayerNumberPropPayload) => {
  store.commit(types.PLAYER_SET_ANGER, payload);
};

export const addLog = (log: Log) => {
  store.commit('addLog', { log });
};

export const pushLogs = () => {
  store.commit('pushLogs');
};

export const clearLogs = () => {
  store.commit('clearLogs');
};

export const setPlayerRoleOrder = () => {
  store.commit(types.SET_PLAYER_ROLE_ORDER);
};

export const increasePlayerHealth = (payload: { id: string; amount: number }) => {
  store.commit(types.PLAYER_INCREASE_HEALTH, payload);
};

export const decreasePlayerHealth = (payload: { id: string; amount: number }) => {
  store.commit(types.PLAYER_DECREASE_HEALTH, payload);
};

export const addBuff = (payload: {
  buff: Buff;
  player: string;
  duration: number;
  affectNow?: boolean;
}) => {
  store.commit(types.PLAYER_ADD_BUFF, payload);
};

export const beginFight = (player: string) => {
  store.commit(types.BEGIN_FIGHT, { player });
};

export const registerDialog = (id: string) => {
  store.commit(types.DIALOG_REGISTER, { id });
};

export const openDialog = (id: string) => {
  store.commit(types.DIALOG_OPEN, { id });
};

export const closeDialog = (id: string) => {
  store.commit(types.DIALOG_CLOSE, { id });
};

export const announcePlayerDeath = (id: string) => {
  store.commit(types.ANNOUNCE_PLAYER_DEATH, { id });
};
