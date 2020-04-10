import Buff from './Buff';
import * as api from '../api';

export default class LanguageInfluenceWeakenBuff extends Buff {
  readonly id: string = 'language-influence-weaken-buff';

  readonly displayName: string = '语言感化: 虚弱';

  readonly description: string = '玩家本轮攻击力减弱50%。';

  readonly quote: string = '请友善待人。';

  readonly type = 'negative';

  created() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.attackPower.value *= 0.5;
  }

  destroyed() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.attackPower.value = tempPlayer.attackPower.default;
  }
}
