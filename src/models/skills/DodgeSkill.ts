import Skill from './Skill';
// import { AngryStrongenBuff, AngryWeakenBuff } from "../buffs";
import { DodgeNotAttackableBuff } from '../buffs';
import * as api from '../api';

export default class AngrySkill extends Skill {
  readonly id = 'dodge-skill';

  readonly displayName = '闪避';

  readonly description = '若0~100的随机数小于等于玩家的速度，玩家闪避攻击。';

  readonly quote = '要来比速度吗？';

  effect() {
    const tempPlayer = api.fight.players[this.owner];
    const random = Math.floor(Math.random() * 100);
    // const isDodge = tempPlayer.speed.value >= 100;
    if (random <= tempPlayer.speed.value) {
      api.fight.addBuff(this.owner, new DodgeNotAttackableBuff(this.owner), 0, true);
      api.logs.addLog({
        message: `${this.owner}成功闪避攻击！`,
        bgColor: 'blue',
      });
    }
  }
}
