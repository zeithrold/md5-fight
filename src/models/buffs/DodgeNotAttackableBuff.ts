import Buff from './Buff';

export default class DodgeNotAttackableBuff extends Buff {
  readonly id: string = 'dodge-buff';

  static readonly displayName: string = '闪避';

  static readonly description: string = '玩家不可被攻击。';

  static readonly quote: string = '你的攻击...快得过我的速度吗？';

  static readonly type = 'positive';

  created() {
    this.api.setPlayerAttackable({ id: this.owner, context: false });
  }

  destroyed() {
    this.api.setPlayerAttackable({ id: this.owner, context: true });
  }
}
