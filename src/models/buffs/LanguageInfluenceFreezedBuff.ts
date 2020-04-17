import Buff from './Buff';

export default class LanguageInfluenceFreezedBuff extends Buff {
  readonly id: string = 'language-influence-freezed-buff';

  readonly displayName: string = '语言感化: 禁锢';

  readonly description: string = '玩家本轮无法攻击。';

  readonly quote: string = '创建文明和谐素质社会。';

  readonly type = 'negative';

  created() {
    this.api.setPlayerFreezed({ id: this.owner, context: true });
  }

  effect() {
    this.api.addLog({
      message: `受技能<b>${this.displayName}</b>影响，<b>${this.owner}</b>本轮无法攻击。`,
    });
  }

  destroyed() {
    this.api.setPlayerFreezed({ id: this.owner, context: false });
  }
}
