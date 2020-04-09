import Buff from './Buff';
import * as api from '../api';

export default class AngryWeakenBuff extends Buff {
  readonly id: string = 'angry-weaken-buff';

  readonly displayName: string = '愤怒: 减弱防御力';

  readonly description: string = '玩家的防御力减弱50%。';

  readonly quote: string = '愤怒的力量不好惹。';

  readonly type = 'negative';

  created() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.magicalDefence.value *= 0.5;
    tempPlayer.physicalDefence.value *= 0.5;
  }

  destroyed() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.physicalDefence.value = tempPlayer.physicalDefence.default;
    tempPlayer.magicalDefence.value = tempPlayer.magicalDefence.default;
  }
}
