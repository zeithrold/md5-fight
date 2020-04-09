import Buff from "./Buff";
import * as api from "../api";

export default class AngryStrongenBuff extends Buff {
  readonly id: string = "angry-strongen-buff";

  readonly displayName: string = "愤怒: 加强攻击力";

  readonly description: string = "玩家的攻击力加强50%。";

  readonly quote: string = "感受愤怒的力量吧。";

  readonly type = "positive";

  constructor(owner: string) {
    super(owner);
  }
  created() {
    let tempPlayer = api.fight.players[this.owner];
    tempPlayer.attackPower.value *= 1.5;
  }
  destroyed() {
    let tempPlayer = api.fight.players[this.owner];
    tempPlayer.attackPower.value = tempPlayer.attackPower.default;
  }
}
