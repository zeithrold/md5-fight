import {
  VuexModule, Module, Mutation, getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import Player from '@/models/Player';
import { Buff, BuffSlot } from '@/models/buffs';
import LogModule from './logs';

const logs = getModule(LogModule);

@Module({
  dynamic: true,
  store,
  name: 'fight',
})
export default class FightModule extends VuexModule {
  players: { [key: string]: Player } = {
    '玩家 1': new Player('玩家 1'),
    '玩家 2': new Player('玩家 2'),
  };

  order = {
    first: '玩家 1',
    second: '玩家 2',
  };

  @Mutation
  setPhysicalDefence(player: string, physicalDefence: number) {
    this.players[player].physicalDefence.value = physicalDefence;
  }

  @Mutation
  setMagicalDefence(player: string, magicalDefence: number) {
    this.players[player].magicalDefence.value = magicalDefence;
  }

  @Mutation
  increaseHealth(player: string, amount: number) {
    this.players[player].health += amount;
  }

  @Mutation
  decreaseHealth(player: string, amount: number) {
    this.players[player].health -= amount;
  }

  @Mutation
  setAttackPower(player: string, amount: number) {
    this.players[player].attackPower.value = amount;
  }

  @Mutation
  setSpeed(player: string, amount: number) {
    this.players[player].speed.value = amount;
  }

  @Mutation
  setPlayer(player1: string, player2: string) {
    this.players = {};
    this.players[player1] = new Player(player1);
    this.players[player2] = new Player(player2);
    let firstPlayer;
    let secondPlayer;
    if (this.players[player1].speed > this.players[player2].speed) {
      firstPlayer = player1;
      secondPlayer = player2;
      logs.addLog({
        message: `${player1}的速度较快，由${player1}先攻。`,
      });
    } else if (this.players[player1].speed < this.players[player2].speed) {
      firstPlayer = player2;
      secondPlayer = player1;
      logs.addLog({
        message: `${player2}的速度较快，由${player2}先攻。`,
      });
    } else {
      logs.addLog({
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
      logs.addLog({
        message: `抛硬币的结果为${random}，将由${firstPlayer}先攻。`,
      });
    }
    this.order = {
      first: firstPlayer,
      second: secondPlayer,
    };
    if (
      this.players[this.order.first].maxHealth === 0
      && this.players[this.order.second].maxHealth !== 0
    ) {
      logs.addLog({
        message: `${this.order.first}的初始生命值为0，自动判定${this.order.second}获胜。`,
        bgColor: 'red',
      });
    } else if (
      this.players[this.order.second].maxHealth === 0
      && this.players[this.order.first].maxHealth !== 0
    ) {
      logs.addLog({
        message: `${this.order.second}的初始生命值为0，自动判定${this.order.first}获胜。`,
        bgColor: 'red',
      });
    } else if (
      this.players[this.order.second].maxHealth === 0
      && this.players[this.order.first].maxHealth === 0
    ) {
      logs.addLog({
        message: '两位玩家初始生命值都为0，无胜负。',
        bgColor: 'red',
      });
    }
  }

  @Mutation
  addBuff(player: string, buff: Buff, duration: number | 'forever', affectNow?: boolean) {
    // this.players[player].buffs.push({
    //   buff,
    //   created: false,
    //   duration
    // });
    const tempPlayer = this.players[player];
    const tempBuffSlot = {
      buff,
      duration,
      created: false,
    };
    if (affectNow) {
      tempBuffSlot.buff.created();
      tempBuffSlot.created = affectNow;
    }
    tempPlayer.buffs.push(tempBuffSlot);
  }

  /**
   * Begin a fight
   * @param player the name of the player.
   */
  @Mutation
  beginFight(player: string) {
    const tempPlayer = this.players[player];
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
      tempPlayer.buffs = remainingBuffs;
    }
    if (tempPlayer.buffProps.freezed) {
      return;
    }
    if (tempPlayer.skills) {
      for (let i = 0; i < tempPlayer.skills.length; i += 1) {
        const tempSkill = tempPlayer.skills[i];
        tempSkill.effect();
      }
    }
    let keys = Object.keys(this.players);
    const index = keys.indexOf(player);
    if (index === -1) {
      throw ReferenceError("Cannot find the Player's name.");
    }
    keys = keys.splice(index, 1);
    const oppositePlayerName = keys[0];
    const oppositePlayer = this.players[oppositePlayerName];
    logs.addLog({
      message: `${player}向${oppositePlayerName}发动了攻击！`,
    });
    oppositePlayer.onBeingAttack();
    if (!oppositePlayer.buffProps.attackable) {
      return;
    }
    let tempAttackAmount = tempPlayer.attackPower.value;
    if (tempPlayer.type === 'physical') {
      const tempHealthDiscountAmount = oppositePlayer.physicalDefence.value * 0.5;
      logs.addLog({
        message: `${player}向${oppositePlayerName}造成了${tempHealthDiscountAmount}的物理攻击！`,
      });
      tempAttackAmount -= tempHealthDiscountAmount;
    } else {
      const tempHealthDiscountAmount = oppositePlayer.magicalDefence.value * 0.5;
      logs.addLog({
        message: `${player}向${oppositePlayerName}造成了${tempHealthDiscountAmount}的物理攻击！`,
      });
      tempAttackAmount -= oppositePlayer.magicalDefence.value * 0.5;
    }
    tempAttackAmount = tempAttackAmount < 0 ? 0 : tempAttackAmount;
    oppositePlayer.health -= tempAttackAmount;
  }
}
