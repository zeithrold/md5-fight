import Buff from './Buff';

export default class FortunateWeakenBuff extends Buff {
  readonly id: string = 'fortunate-weaken-buff';

  readonly displayName: string = '幸运: 减弱攻击力';

  readonly description: string = '玩家的攻击力减弱（对手玩家幸运值 / 100）%。';

  readonly quote: string = '...但也不能一点也没有幸运。';

  readonly type = 'negative';

  created() {
    const tempPlayer = this.store.state.fight.players[this.owner];
    const oppositePlayer = this.store.state.fight.players[this.getOppositePlayerName(this.owner)];
    this.api.setPlayerAttackPower(
      {
        id: oppositePlayer.name,
        amount: ((oppositePlayer.attackPower.value * tempPlayer.fortunate.value) / 100),
      },
    );
  }

  destroyed() {
    const tempPlayer = this.store.state.fight.players[this.owner];
    this.api.setPlayerAttackPower({
      id: tempPlayer.name,
      amount: 'default',
    });
  }
}
