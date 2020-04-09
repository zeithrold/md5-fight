import { VuexModule, Module, Mutation, getModule } from "vuex-module-decorators";
import store from "@/store";
import LogModule from "./logs";
import Player from "@/models/Player";
import { Buff, BuffSlot } from "@/models/buffs";

const logs = getModule(LogModule);

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
    const tempBuffSlot = {
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
    let oppositePlayer = this.players[oppositePlayerName];
    logs.addLog({
      message: `${player}向${oppositePlayerName}发动了攻击！`
    });
    oppositePlayer.onBeingAttack();
    if (!oppositePlayer.buffProps.attackable) {
      return;
    }
    let tempAttackAmount = tempPlayer.attackPower.value;
    if (tempPlayer.type === "physical") {
      const tempHealthDiscountAmount = oppositePlayer.physicalDefence.value * 0.5;
      logs.addLog({
        message: `${player}向${oppositePlayerName}造成了${tempHealthDiscountAmount}的物理攻击！`
      });
      tempAttackAmount -= tempHealthDiscountAmount;
    } else {
      const tempHealthDiscountAmount = oppositePlayer.magicalDefence.value * 0.5;
      logs.addLog({
        message: `${player}向${oppositePlayerName}造成了${tempHealthDiscountAmount}的物理攻击！`
      });
      tempAttackAmount -= oppositePlayer.magicalDefence.value * 0.5;
    }
    tempAttackAmount = tempAttackAmount < 0 ? 0 : tempAttackAmount;
    oppositePlayer.health -= tempAttackAmount;
  }
}
