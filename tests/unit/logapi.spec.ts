import * as commits from '@/store/commmits';
import store from '@/store';
import { Log } from '@/models/logs';

describe('log-api', () => {
  it('addLog with object', () => {
    commits.addLog({
      message: '这是一个测试',
      bgColor: 'primary',
    });
    expect(store.state.logs.unstagedLogs[0].message).toBe('这是一个测试');
    expect(store.state.logs.unstagedLogs[0].bgColor).toBe('blue');
  });
  it('addLog with constructor', () => {
    commits.addLog(new Log('hello, world!'));
    expect(store.state.logs.unstagedLogs[1].message).toBe('hello, world!');
  });
  it('pushLog', () => {
    commits.pushLogs();
    expect(store.state.logs.unstagedLogs.length).toBe(0);
    expect(store.state.logs.logs.length).not.toBe(0);
  });
});
