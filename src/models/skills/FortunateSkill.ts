import store from '@/store';
import Skill from './Skill';
import { FortunateWeakenBuff } from '../buffs';

export default class FortunateSkill extends Skill {
  readonly id = 'fortunate-skill';

  static readonly displayName = '幸运';

  static readonly description = '若0~100的随机数小于等于玩家的幸运值，对方的攻击力减弱（100 - 幸运值）%。';

  static readonly quote = '虽然幸运不能解决一切...';


  effect() {
    const tempPlayer = store.state.fight.players[this.owner];
    const random = Math.floor(Math.random() * 100);
    if (random <= tempPlayer.fortunate.value) {
      this.api.addBuff({
        player: this.getOppositePlayerName(this.owner),
        buff: new FortunateWeakenBuff(this.getOppositePlayerName(this.owner)),
        duration: 0,
        affectNow: true,
      });
      this.api.addLog({
        message: `<b>${this.owner}</b>本轮十分的幸运，使对方的攻击力降低了<b>${100 - tempPlayer.fortunate.value}%</b>。`,
        bgColor: 'primary',
      });
    }
  }
}
