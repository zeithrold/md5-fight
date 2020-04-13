import Skill from './Skill';
import { ThunderBuff } from '../buffs';

export default class ThunderSkill extends Skill {
  readonly id = 'thunder-skill';

  readonly displayName = '雷电法术';

  readonly description = '被攻击者有15%的概率获得"雷电法术: 雷阵雨"效果。';

  readonly quote = '准备好...感受雷电的力量了吗？'

  effect() {
    const isAffect = Math.floor(Math.random() * 100) <= 15;
    if (isAffect) {
      this.api.addLog({
        message: `玩家${this.owner}的技能${this.displayName}发动！向被攻击者施加"雷电法术: 雷阵雨"效果`,
        bgColor: 'blue',
      });
      const tempOppositePlayerName = this.getOppositePlayerName(this.owner);
      this.api.addBuff({
        player: tempOppositePlayerName,
        buff: new ThunderBuff(tempOppositePlayerName),
        duration: 1,
      });
    }
  }
}
