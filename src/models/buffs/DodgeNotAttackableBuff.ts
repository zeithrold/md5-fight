import Buff from "./Buff";
import * as api from "../api";

export default class DodgeNotAttackableBuff extends Buff {
  readonly id: string = "dodge-buff";

  readonly displayName: string = "闪避";

  readonly description: string = "玩家不可被攻击。";

  readonly quote: string = "你的攻击...快得过我的速度吗？";

  readonly type = "positive";

  constructor(owner: string) {
    super(owner);
  }
  created() {
    let tempPlayer = api.fight.players[this.owner];
    tempPlayer.buffProps.attackable = false;
  }
  destroyed() {
    let tempPlayer = api.fight.players[this.owner];
    tempPlayer.buffProps.attackable = true;
  }
}
