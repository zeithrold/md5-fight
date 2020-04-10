import Buff from './Buff';
import * as api from '../api';

export default class ThunderBuff extends Buff {
  readonly id = 'thunder-buff';

  readonly displayName = '雷电法术: 雷阵雨';

  readonly description = '攻击阶段，玩家有50%的概率生命值减半。'

  readonly quote = '也许这就是命运吧...'

  readonly type = 'negative';

  effect() {
    const coinResult = Math.floor(Math.random() * 10) % 2 === 0;
    if (coinResult) {
      api.logs.addLog({
        message: `玩家${this.owner}的效果"${this.displayName}"被触发，玩家的生命值减半。`,
      });
      api.fight.players[this.owner].health *= 0.5;
    }
  }
}
