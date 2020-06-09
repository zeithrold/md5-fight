import store from '@/store';
import Buff from './Buff';

export default class ThunderBuff extends Buff {
  readonly id = 'thunder-buff';

  static readonly displayName = '雷电法术: 雷阵雨';

  static readonly description = '攻击阶段，玩家有50%的概率生命值减半。'

  static readonly quote = '也许这就是命运吧...'

  static readonly type = 'negative';

  effect() {
    const coinResult = Math.floor(Math.random() * 10) % 2 === 0;
    if (coinResult) {
      this.api.addLog({
        message: `<b>${this.owner}</b>的效果"<b>${ThunderBuff.displayName}</b>"被触发，玩家的生命值减半。`,
        bgColor: 'error',
      });
      this.api.decreasePlayerHealth({
        id: this.owner,
        amount: Math.floor(store.state.fight.players[this.owner].health * 0.5 * 100) / 100,
      });
    }
  }
}
