import store from '@/store';
import Buff from './Buff';


export default class AngryWeakenBuff extends Buff {
  readonly id: string = 'angry-weaken-buff';

  readonly displayName: string = '愤怒: 减弱防御力';

  readonly description: string = '玩家的防御力减弱50%。';

  readonly quote: string = '愤怒的力量不好惹。';

  readonly type = 'negative';

  created() {
    const tempPlayer = store.state.fight.players[this.owner];
    this.api.setPlayerMagicalDefence(
      {
        id: this.owner,
        amount: tempPlayer.magicalDefence.value * 0.5,
      },
    );
    this.api.setPlayerPhysicalDefence(
      { id: this.owner, amount: tempPlayer.physicalDefence.value * 0.5 },
    );
  }

  destroyed() {
    this.api.setPlayerMagicalDefence(
      { id: this.owner, amount: 'default' },
    );
    this.api.setPlayerPhysicalDefence(
      { id: this.owner, amount: 'default' },
    );
  }
}
