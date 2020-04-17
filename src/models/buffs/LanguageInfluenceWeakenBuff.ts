import store from '@/store';
import Buff from './Buff';

export default class LanguageInfluenceWeakenBuff extends Buff {
  readonly id: string = 'language-influence-weaken-buff';

  readonly displayName: string = '语言感化: 虚弱';

  readonly description: string = '玩家本轮攻击力减弱50%。';

  readonly quote: string = '请友善待人。';

  readonly type = 'negative';

  created() {
    const tempPlayer = store.state.fight.players[this.owner];
    this.api.setPlayerAttackPower({ id: this.owner, amount: tempPlayer.attackPower.value * 0.5 });
  }

  destroyed() {
    this.api.setPlayerAttackPower({ id: this.owner, amount: 'default' });
  }
}
