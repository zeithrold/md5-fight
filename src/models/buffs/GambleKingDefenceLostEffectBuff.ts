import Buff from './Buff';
import * as api from '../api';

export default class GambleKingDefenceLostEffectBuff extends Buff {
  readonly id: string = 'gamble-king-defence-lost-effect-buff';

  readonly displayName: string = '777: 飞机攻势';

  readonly description: string = '玩家的防御无效。';

  readonly quote: string = '给这位玩家倒一杯卡布奇诺。';

  readonly type = 'negative';

  created() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.physicalDefence.value = 0;
    tempPlayer.magicalDefence.value = 0;
  }

  destroyed() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.physicalDefence.value = tempPlayer.physicalDefence.default;
    tempPlayer.magicalDefence.value = tempPlayer.magicalDefence.default;
  }
}
