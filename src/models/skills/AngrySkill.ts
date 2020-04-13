import Skill from './Skill';
import { AngryStrongenBuff, AngryWeakenBuff } from '../buffs';

export default class AngrySkill extends Skill {
  readonly id = 'angry-skill';

  readonly displayName = '愤怒';

  readonly description = '若玩家的愤怒达到上限，则使自己的攻击力上升50%，对手防御力下降50%。';

  readonly quote = '一时容忍，不能一世容忍。';

  effect() {
    const tempPlayer = this.store.state.fight.players[this.owner];
    const isAngry = tempPlayer.props.anger >= 100;
    if (!isAngry) {
      return;
    }
    this.api.setPlayerAnger(
      {
        id: this.owner,
        amount: this.store.state.fight.players[this.owner].props.anger - 100,
      },
    );
    this.api.addBuff({
      player: this.owner,
      buff: new AngryStrongenBuff(this.owner),
      duration: 0,
      affectNow: true,
    });
    const oppositePlayerName = this.getOppositePlayerName(this.owner);
    this.api.addBuff({
      player: oppositePlayerName,
      buff: new AngryWeakenBuff(oppositePlayerName),
      duration: 0,
      affectNow: true,
    });
    this.api.addLog({
      message: `${this.owner}的怒气值达到上限，最终爆发！${
        this.owner}的攻击力上升50%，对手${this.getOppositePlayerName(this.owner)}的防御力下降！`,
      bgColor: 'red',
    });
  }
}
