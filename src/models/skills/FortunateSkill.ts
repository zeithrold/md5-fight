import Skill from './Skill';
import * as api from '../api';
import { FortunateWeakenBuff } from '../buffs';

export default class FortunateSkill extends Skill {
  id = 'fortunate-skill';

  displayName = '幸运';

  description = '若0~100的随机数小于等于玩家的幸运值，对方的攻击力减弱（100 - 幸运值）%。';

  quote = '虽然幸运不能解决一切...';


  effect() {
    const tempPlayer = api.fight.players[this.owner];
    const random = Math.floor(Math.random() * 100);
    if (random <= tempPlayer.fortunate.value) {
      api.fight.addBuff(
        api.getOppositePlayerName(this.owner),
        new FortunateWeakenBuff(api.getOppositePlayerName(this.owner)),
        0,
        true,
      );
      api.logs.addLog({
        message: `${this.owner}本轮十分的幸运，成功闪避攻击。`,
        bgColor: 'blue',
      });
    }
  }
}
