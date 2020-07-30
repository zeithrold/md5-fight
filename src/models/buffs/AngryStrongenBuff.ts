import store from '@/store';
import Buff from './Buff';

export default class AngryStrongenBuff extends Buff {
  readonly id: string = 'angry-strongen-buff';

  readonly displayName: string = '愤怒: 加强攻击力';

  readonly description: string = '玩家的攻击力加强50%。';

  readonly quote: string = '感受愤怒的力量吧。';

  static readonly type = 'positive';


  created() {
    const tempPlayer = store.state.fight.players[this.owner];
    this.api.setPlayerAttackPower({ id: this.owner, amount: tempPlayer.attackPower.value * 1.5 });
  }

  destroyed() {
    this.api.setPlayerAttackPower({ id: this.owner, amount: 'default' });
  }
}
