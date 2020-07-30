import { RapidKnifeUndodgeableBuff, RapidKnifeAttackWeakenBuff } from '@/models/buffs';
import Skill from './Skill';

export default class RapidKnifeSkill extends Skill {
  readonly id = 'rapid-knife-skill';

  readonly displayName = '快刀斩乱麻';

  readonly description = '攻击者在攻击阶段有50%的概率对被攻击者进行不可闪避的，攻击力为60%的攻击。';

  readonly quote = '只是看得见模糊的刀的影子。';

  effect() {
    const isAffects = (Math.floor(Math.random() * 10) % 10) + 1 <= 5;
    if (isAffects) {
      this.api.addLog({
        message: `<b>${this.owner}</b>的技能<b>${this.displayName}</b>发动！攻击者在攻击阶段有50%的概率对被攻击者进行不可闪避的，攻击力为60%的攻击。`,
        bgColor: 'primary',
      });
      this.api.addBuff({
        buff: new RapidKnifeAttackWeakenBuff(this.owner),
        player: this.owner,
        duration: 0,
        affectNow: true,
      });
      this.api.addBuff({
        buff: new RapidKnifeUndodgeableBuff(this.getOppositePlayerName(this.owner)),
        player: this.getOppositePlayerName(this.owner),
        duration: 0,
        affectNow: true,
      });
    }
  }
}
