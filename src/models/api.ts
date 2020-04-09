import Vue from "vue";
import Player from "./Player";
import { Log } from "./logs";
import store from "@/store";
import FightModule from "@/store/fight";
import LogsModule from "@/store/logs";
import { getModule } from "vuex-module-decorators";

let fight = getModule(FightModule);
let logs = getModule(LogsModule);

export function getOppositePlayerName(player: string): string {
  let keys = Object.keys(fight.players);
  const index = keys.indexOf(player);
  if (index === -1) {
    throw ReferenceError(`Cannot find the Player's name.`);
  }
  keys = keys.splice(index, 1);
  return keys[0];
}

// export function applyEffect(player: string, effect: typeof Effect, roundDuration: number): void {}
// export function applyBuff(player: string, buff: typeof Buff, roundDuration: number): void {}

// applyEffect('helloworld', FreezeEffect);
// TODO: Complete the full API.
