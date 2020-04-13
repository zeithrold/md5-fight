import * as commits from '@/store/commmits';
import store from '@/store';

describe('player-api', () => {
  it('setPlayer', () => {
    commits.setPlayer('hello', 'world');
    expect(store.state.fight.players.hello.md5)
      .toBe('5d41402abc4b2a76b9719d911017c592');
    console.log(store.state.fight.players.hello);
    console.log(store.state.fight.players.world);
  });
  it('setPlayerRoleOrder', () => {
    commits.setPlayerRoleOrder();
    expect(store.state.fight.order.first).toBe('hello');
    expect(store.state.logs.logs.length).not.toBe(0);
  });
  it('beginFight', () => {
    commits.beginFight('hello');
    commits.beginFight('world');
    for (let i = 0; i < store.state.logs.logs.length; i += 1) {
      for (let j = 0; j < store.state.logs.logs[i].length; j += 1) {
        console.log(store.state.logs.logs[i][j].message);
      }
    }
  });
});
