import Buff from './Buff';
import * as api from '../api';

export default class PoisonBuff extends Buff {
  readonly id: string = 'poison-buff';

  readonly displayName: string = '毒药';

  readonly description: string = '玩家每轮攻击开始前生命值扣除最大值的10%。';

  readonly quote: string = '这到底是健康餐，还是生化武器？';

  readonly type = 'negative';

  effect() {
    api.logs.addLog({
      message: `受技能${this.displayName}影响，玩家${this.owner}从其生命值中扣除生命值最大值的10%。`,
    });
    api.fight.players[this.owner].health -= api.fight.players[this.owner].maxHealth * 0.1;
  }
}
