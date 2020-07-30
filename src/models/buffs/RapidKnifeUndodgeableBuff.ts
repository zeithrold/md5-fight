import Buff from './Buff';

export default class RapidKnifeUndodgeableBuff extends Buff {
  readonly id: string = 'rapid-knife-undodgeable-buff';

  readonly displayName: string = '快刀斩乱麻: 眩晕';

  readonly description: string = '玩家不可闪避。';

  readonly quote: string = '无声无息的短短几秒间，战斗仍在持续。';

  static readonly type = 'positive';

  created() {
    this.api.setPlayerSpeed({
      id: this.owner,
      amount: -1,
    });
  }

  destroyed() {
    this.api.setPlayerSpeed({ id: this.owner, amount: 'default' });
  }
}
