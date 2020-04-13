import Skill from './Skill';
import { PoisonBuff } from '../buffs';

export default class WizardSkill extends Skill {
  readonly id = 'wizard-skill';

  readonly displayName = '巫师';

  readonly description = '对手有15%的概率获得5回合的"毒药"效果，每回合前将对手生命值扣除其生命值最大值的10%，效果可叠加。';

  readonly quote = '可能只是给对手喂了芙蓉秘制小汉堡。';

  effect() {
    const isAffect = Math.floor(Math.random() * 100) <= 15;
    if (isAffect) {
      this.api.addLog({
        message: `玩家${this.owner}的技能${this.displayName}发动！向被攻击者施加5回合的"毒药"效果。`,
        bgColor: 'blue',
      });
      this.api.addBuff({
        player: this.getOppositePlayerName(this.owner),
        buff: new PoisonBuff(this.getOppositePlayerName(this.owner)),
        duration: 5,
      });
    }
  }
}
