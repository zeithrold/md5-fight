import store from '@/store';
import Buff from './Buff';

export default class PoisonBuff extends Buff {
  readonly id: string = 'poison-buff';

  readonly displayName: string = '毒药';

  readonly description: string = '玩家每轮攻击开始前生命值扣除最大值的10%。';

  readonly quote: string = '来自炎熔的同情。';

  static readonly type = 'negative';

  effect() {
    this.api.addLog({
      message: `受技能<b>"${this.displayName}"</b>影响，<b>${this.owner}</b>从其生命值中扣除生命值最大值的10%。`,
    });
    this.api.decreasePlayerHealth({
      id: this.owner,
      amount: store.state.fight.players[this.owner].maxHealth * 0.1,
    });
  }
}
