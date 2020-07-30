import store from '@/store';
import Buff from './Buff';

export default class RapidKnifeUndodgeableBuff extends Buff {
  readonly id: string = 'rapid-knife-undodgeable-buff';

  readonly displayName: string = '快刀斩乱麻: 影刃';

  readonly description: string = '玩家攻击力降低40%。';

  readonly quote: string = '看不见的刀，是最致命的刀。';

  static readonly type = 'positive';

  created() {
    this.api.setPlayerAttackPower({
      id: this.owner,
      amount: store.state.fight.players[this.owner].attackPower.default * 0.6,
    });
  }

  destroyed() {
    this.api.setPlayerAttackPower({
      id: this.owner,
      amount: 'default',
    });
  }
}
