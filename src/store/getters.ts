/* eslint @typescript-eslint/no-explicit-any: "off" */

import { Getter, GetterTree } from 'vuex';
import { State } from './index';

const playerDisplayProps: Getter<State, any> = (state: State) => {
  const { players } = state.fight;
  const leftPlayer = players[Object.keys(players)[0]];
  const rightPlayer = players[Object.keys(players)[1]];
  const result: {
    [sectionKey: string]: {
      leftPlayer: any;
      rightPlayer: any;
      displayName: string;
    };
  } = {};
  result.name = {
    leftPlayer: leftPlayer.name,
    rightPlayer: rightPlayer.name,
    displayName: 'VS',
  };
  result.md5 = {
    leftPlayer: leftPlayer.md5,
    rightPlayer: rightPlayer.md5,
    displayName: 'MD5',
  };
  result.maxHealth = {
    leftPlayer: leftPlayer.maxHealth,
    rightPlayer: rightPlayer.maxHealth,
    displayName: '最大生命值',
  };
  result.attackPower = {
    leftPlayer: leftPlayer.attackPower.default,
    rightPlayer: rightPlayer.attackPower.default,
    displayName: '攻击力',
  };
  result.speed = {
    leftPlayer: leftPlayer.speed.default,
    rightPlayer: rightPlayer.speed.default,
    displayName: '速度',
  };
  result.fortunate = {
    leftPlayer: leftPlayer.fortunate.default,
    rightPlayer: rightPlayer.fortunate.default,
    displayName: '幸运值',
  };

  let tempLeftPlayerSkills = '';
  let tempRightPlayerSkills = '';
  for (let i = 0; i < leftPlayer.skills.length; i += 1) {
    tempLeftPlayerSkills += `<v-chip>${leftPlayer.skills[i].displayName}</v-chip>`;
  }
  for (let i = 0; i < rightPlayer.skills.length; i += 1) {
    tempRightPlayerSkills += `<v-chip>${rightPlayer.skills[i].displayName}</v-chip>`;
  }
  result.skills = {
    leftPlayer: tempLeftPlayerSkills,
    rightPlayer: tempRightPlayerSkills,
    displayName: '技能',
  };
  result.type = {
    leftPlayer: leftPlayer.type === 'physical' ? '战士' : '法师',
    rightPlayer: rightPlayer.type === 'physical' ? '战士' : '法师',
    displayName: '职业',
  };
  return result;
};


const getterTree: GetterTree<State, any> = {
  playerDisplayProps,
};

export default getterTree;
