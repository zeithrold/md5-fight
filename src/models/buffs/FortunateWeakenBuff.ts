import Buff from './Buff';
import * as api from '../api';

export default class FortunateWeakenBuff extends Buff {
  readonly id: string = 'fortunate-weaken-buff';

  readonly displayName: string = '幸运: 减弱攻击力';

  readonly description: string = '玩家的攻击力减弱50%。';

  readonly quote: string = '...但也不能一点也没有幸运。';

  readonly type = 'negative';

  created() {
    const tempPlayer = api.fight.players[this.owner];
    const oppositePlayer = api.fight.players[api.getOppositePlayerName(this.owner)];
    tempPlayer.attackPower.value *= oppositePlayer.fortunate.value / 100;
  }

  destroyed() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.attackPower.value = tempPlayer.attackPower.default;
  }
}
