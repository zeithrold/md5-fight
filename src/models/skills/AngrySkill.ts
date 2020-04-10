import Skill from './Skill';
import { AngryStrongenBuff, AngryWeakenBuff } from '../buffs';
import * as api from '../api';

export default class AngrySkill extends Skill {
  readonly id = 'angry-skill';

  readonly displayName = '愤怒';

  readonly description = '若玩家的愤怒达到上限，则使自己的攻击力上升50%，对手防御力下降50%。';

  readonly quote = '一时容忍，不能一世容忍。';

  effect() {
    const tempPlayer = api.fight.players[this.owner];
    const isAngry = tempPlayer.skillProps.anger >= 100;
    if (!isAngry) {
      return;
    }
    tempPlayer.skillProps.anger -= 100;
    api.fight.addBuff(this.owner, new AngryStrongenBuff(this.owner), 0, true);
    const oppositePlayerName = api.getOppositePlayerName(this.owner);
    api.fight.addBuff(oppositePlayerName, new AngryWeakenBuff(oppositePlayerName), 0, true);
    api.logs.addLog({
      message: `${this.owner}的怒气值达到上限，最终爆发！${
        this.owner}的攻击力上升50%，对手${api.getOppositePlayerName(this.owner)}的防御力下降！`,
      bgColor: 'red',
    });
  }
}
