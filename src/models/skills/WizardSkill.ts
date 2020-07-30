import store from '@/store';
import Skill from './Skill';
import { PoisonBuff } from '../buffs';

export default class WizardSkill extends Skill {
  readonly id = 'wizard-skill';

  readonly displayName = '巫师';

  readonly description = '对手有15%的概率获得5回合的"毒药"效果，每回合前将对手生命值扣除其生命值最大值的10%，若对手已有同效果，则仅刷新次数，不叠加。';

  readonly quote = '可能只是给对手喂了芙蓉秘制小汉堡。';

  effect() {
    const isAffect = Math.floor(Math.random() * 100) <= 15;
    if (isAffect) {
      this.api.addLog({
        message: `<b>${this.owner}</b>的技能<b>${this.displayName}</b>发动！向被攻击者施加5回合的"<b>毒药</b>"效果。`,
        bgColor: 'primary',
      });
      const oppositePlayer = store.state.fight.players[this.getOppositePlayerName(this.owner)];
      const isOppositePlayerHasPoisonBuff = oppositePlayer.buffs.find(
        (buff) => buff.buff.id === 'poison-buff',
      );
      if (isOppositePlayerHasPoisonBuff) {
        this.api.addLog({
          message: `监测到<b>${this.getOppositePlayerName(this.owner)}</b>已有<b>毒药</b>效果，仅进行刷新。`,
          bgColor: 'primary',
        });
        const poisonBuffIndex = oppositePlayer.buffs.findIndex(
          (buff) => buff.buff.id === 'poison-buff',
        );
        oppositePlayer.buffs[poisonBuffIndex].duration = 5;
      } else {
        this.api.addBuff({
          player: this.getOppositePlayerName(this.owner),
          buff: new PoisonBuff(this.getOppositePlayerName(this.owner)),
          duration: 5,
        });
      }
    }
  }
}
