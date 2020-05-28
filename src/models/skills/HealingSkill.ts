import store from '@/store';
import Skill from './Skill';

export default class HealingSkill extends Skill {
  readonly id = 'healing-skill';

  readonly displayName = '治疗术';

  readonly description = '攻击者在攻击阶段有50%的概率恢复自身生命值最大值的15%。';

  readonly quote = '生与死，仅在一瞬。';

  effect() {
    const isAffects = (Math.floor(Math.random() * 10) % 10) + 1 <= 5;
    if (isAffects) {
      this.api.addLog({
        message: `<b>${this.owner}</b>的技能<b>${this.displayName}</b>发动！恢复玩家生命值最大值的15%。`,
        bgColor: 'primary',
      });
      this.api.increasePlayerHealth({
        id: this.owner,
        amount: store.state.fight.players[this.owner].maxHealth * 0.15,
      });
    }
  }
}
