import Skill from './Skill';
import { LanguageInfluenceFreezedBuff, LanguageInfluenceWeakenBuff } from '../buffs';

export default class LanguageInfluenceSkill extends Skill {
  readonly id = 'language-influence-skill';

  readonly displayName = '语言感化';

  readonly description = '被攻击者有20%的概率下一轮无法攻击；被攻击者有30%的概率下一轮攻击力降低50%。';

  readonly quote = '来自祖安人的亲切问候。';


  effect() {
    // const tempPlayer = api.fight.players[this.owner];
    const random = Math.floor(Math.random() * 100);
    if (random <= 20) {
      this.api.addBuff({
        player: this.getOppositePlayerName(this.owner),
        buff: new LanguageInfluenceFreezedBuff(this.getOppositePlayerName(this.owner)),
        duration: 1,
      });
      this.api.addLog({
        message: `${this.owner}的技能${this.displayName}发动！被攻击者下一轮无法攻击。`,
        bgColor: 'blue',
      });
    } else if (random > 20 && random <= 50) {
      this.api.addBuff(
        {
          player: this.getOppositePlayerName(this.owner),
          buff: new LanguageInfluenceWeakenBuff(this.getOppositePlayerName(this.owner)),
          duration: 1,
        },
      );
      this.api.addLog({
        message: `${this.owner}的技能${this.displayName}发动！被攻击者下一轮攻击力降低50%。`,
        bgColor: 'blue',
      });
    }
  }
}
