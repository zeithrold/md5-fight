import Buff from './Buff';
import * as api from '../api';

export default class LanguageInfluenceFreezedBuff extends Buff {
  readonly id: string = 'language-influence-freezed-buff';

  readonly displayName: string = '语言感化: 禁锢';

  readonly description: string = '玩家本轮无法攻击。';

  readonly quote: string = '请友善待人。';

  readonly type = 'negative';

  created() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.buffProps.freezed = true;
  }

  effect() {
    api.logs.addLog({
      message: `受技能${this.displayName}影响，玩家${this.owner}本轮无法攻击。`,
    });
  }

  destroyed() {
    const tempPlayer = api.fight.players[this.owner];
    tempPlayer.buffProps.freezed = false;
  }
}
