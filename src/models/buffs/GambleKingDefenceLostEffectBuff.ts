import Buff from './Buff';

export default class GambleKingDefenceLostEffectBuff extends Buff {
  readonly id: string = 'gamble-king-defence-lost-effect-buff';

  readonly displayName: string = '777: 飞机攻势';

  readonly description: string = '玩家的防御无效。';

  readonly quote: string = '给这位玩家倒一杯卡布奇诺。';

  readonly type = 'negative';

  created() {
    this.api.setPlayerMagicalDefence({
      id: this.owner,
      amount: 0,
    });
    this.api.setPlayerPhysicalDefence({
      id: this.owner,
      amount: 0,
    });
  }

  destroyed() {
    this.api.setPlayerPhysicalDefence({
      id: this.owner,
      amount: 'default',
    });
    this.api.setPlayerMagicalDefence({
      id: this.owner,
      amount: 'default',
    });
  }
}
