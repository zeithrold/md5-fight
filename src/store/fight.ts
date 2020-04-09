import { VuexModule, Module, Mutation } from "vuex-module-decorators";
import store from "@/store";
import Player from "@/models/Player";
import { Buff, BuffSlot } from "@/models/buffs";

@Module({
  dynamic: true,
  store,
  name: "fight"
})
export default class FightModule extends VuexModule {
  players: { [key: string]: Player } = {
    "玩家 1": new Player("玩家 1"),
    "玩家 2": new Player("玩家 2")
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
  }

  @Mutation
  addBuff(player: string, buff: Buff, duration: number | "forever", affectNow?: boolean) {
    // this.players[player].buffs.push({
    //   buff,
    //   created: false,
    //   duration
    // });
    const tempPlayer = this.players[player];
    let tempBuffSlot = {
      buff,
      duration,
      created: false
    };
    if (affectNow) {
      tempBuffSlot.buff.created();
      tempBuffSlot.created = affectNow;
    }
    tempPlayer.buffs.push(tempBuffSlot);
  }

  @Mutation
  beginFight(player: string) {
    const tempPlayer = this.players[player];

    if (tempPlayer.buffs) {
      const remainingBuffs: BuffSlot[] = [];
      for (let i = 0; i < tempPlayer.buffs.length; i += 1) {
        const tempBuffSlot = tempPlayer.buffs[i];
        if (!tempBuffSlot.created) {
          tempBuffSlot.buff.created();
          tempBuffSlot.created = true;
        }
        tempBuffSlot.buff.effect();
        if (tempBuffSlot.duration !== "forever") {
          tempBuffSlot.duration -= 1;
          if (tempBuffSlot.duration === 0) {
            tempBuffSlot.buff.destroyed();
          } else {
            remainingBuffs.push(tempBuffSlot);
          }
        } else {
          remainingBuffs.push(tempBuffSlot);
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
    // TODO: ADD FIGHT CODE.
  }
}
