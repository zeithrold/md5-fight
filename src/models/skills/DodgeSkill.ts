import store from '@/store';
import Skill from './Skill';
import { DodgeNotAttackableBuff } from '../buffs';

export default class AngrySkill extends Skill {
  readonly id = 'dodge-skill';

  readonly displayName = '闪避';

  readonly description = '若0~100的随机数小于等于玩家的速度，玩家闪避攻击。';

  readonly quote = '要来比速度吗？';

  effect() {
    const tempPlayer = store.state.fight.players[this.owner];
    const random = Math.floor(Math.random() * 100);
    // const isDodge = tempPlayer.speed.value >= 100;
    if (random <= tempPlayer.speed.value) {
      this.api.addBuff({
        player: this.owner,
        buff: new DodgeNotAttackableBuff(this.owner),
        duration: 0,
        affectNow: true,
      });
      this.api.addLog({
        message: `<b>${this.owner}</b>成功闪避攻击！`,
        bgColor: 'primary',
      });
    }
  }
}
