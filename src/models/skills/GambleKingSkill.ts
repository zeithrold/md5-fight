import Skill from './Skill';
import { GambleKingDefenceLostEffectBuff } from '../buffs';

export default class GambleKingSkill extends Skill {
  readonly id = 'gamble-king-skill';

  readonly displayName = '777';

  readonly description = `攻击者在攻击阶段有40%的概率触发。
  丢一枚硬币。若结果为正面，本轮攻击被攻击者的防御无效；若结果为反面，攻击者在攻击前生命值减少最大生命值的30%`;

  readonly quote = '敢问您的17张牌能不能秒了我。';


  effect() {
    const isAffects = Math.floor(Math.random() * 10) <= 4;
    if (isAffects) {
      this.api.addLog({
        message: `玩家${this.owner}的技能${this.displayName}发动！开始丢一枚硬币。`,
        bgColor: 'blue',
      });
      const coinResult = Math.floor(Math.random() * 10) % 2 === 0;
      if (coinResult) {
        this.api.addLog({
          message: '丢硬币的结果为「正面」，本轮攻击被攻击者的防御无效。',
          bgColor: 'blue',
        });
        const tempOppositePlayerName = this.getOppositePlayerName(this.owner);
        this.api.addBuff({
          player: tempOppositePlayerName,
          buff: new GambleKingDefenceLostEffectBuff(tempOppositePlayerName),
          duration: 0,
          affectNow: true,
        });
      } else {
        this.api.addLog({
          message: '丢硬币的结果为「反面」，攻击者在攻击前生命值减少最大生命值的30%。',
          bgColor: 'red',
        });
        this.api.decreasePlayerHealth({
          id: this.owner,
          amount: this.store.state.fight.players[this.owner].maxHealth * 0.3,
        });
      }
    }
  }
}
