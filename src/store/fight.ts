import { VuexModule, Module, Mutation } from "vuex-module-decorators";
import store from "@/store";
import Player from "@/models/Player";

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
  beginFight(player: string) {
    let tempPlayer = this.players[player];
  }
}
