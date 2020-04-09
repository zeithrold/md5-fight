import FightModule from '@/store/fight';
import LogsModule from '@/store/logs';
import { getModule } from 'vuex-module-decorators';

export const fight = getModule(FightModule);
export const logs = getModule(LogsModule);

export function getOppositePlayerName(player: string): string {
  let keys = Object.keys(fight.players);
  const index = keys.indexOf(player);
  if (index === -1) {
    throw ReferenceError("Cannot find the Player's name.");
  }
  keys = keys.splice(index, 1);
  return keys[0];
}
