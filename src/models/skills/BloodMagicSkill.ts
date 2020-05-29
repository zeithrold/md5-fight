import store from '@/store';
import Skill from './Skill';

export default class BloodMagicSkill extends Skill {
  readonly id = 'blood-magic-skill';

  readonly displayName = '血液魔法学';

  readonly description = '<i>一次性技能</i>攻击者在攻击阶段若生命值低于最大值的10%，则将两方的生命值皆设定为此前双方生命值的平均值。';

  readonly quote = '来自祖安人的亲切问候。';

  effected = false;

  effect() {
    // const tempPlayer = api.fight.players[this.owner];
    if (this.effected) {
      return;
    }
    const ownerPlayer = store.state.fight.players[this.owner];
    if (ownerPlayer.health <= ownerPlayer.maxHealth * 0.1) {
      this.effected = true;
      const oppositePlayer = store.state.fight.players[this.getOppositePlayerName(this.owner)];
      const averageHealth = (ownerPlayer.health + oppositePlayer.health) / 2;
      this.api.setPlayerHealth({
        id: this.owner,
        amount: averageHealth,
      });
      this.api.setPlayerHealth({
        id: oppositePlayer.name,
        amount: averageHealth,
      });
      this.api.addLog({
        message: `<b>${this.owner}</b>处于濒危状态，发动技能<b>血液魔法学</b>，两方的生命值皆设定为此前双方生命值的平均值。`,
        bgColor: 'primary',
      });
    }
  }
}
