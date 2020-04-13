/* eslint @typescript-eslint/no-empty-function: "off", class-methods-use-this: "off" */

import * as api from '@/store/commmits';
import store from '@/store';
import { GameAdditionalElement } from '../commons';

export default class Skill implements GameAdditionalElement {
  readonly id: string = 'default-skill';

  readonly displayName: string = 'Default display name';

  readonly description: string = 'Default description';

  readonly owner: string;

  readonly quote?: string;

  readonly api = api;

  readonly store = store;

  getOppositePlayerName(player: string): string {
    let keys = Object.keys(this.store.state.fight.players);
    const index = keys.indexOf(player);
    if (index === -1) {
      throw ReferenceError("Cannot find the Player's name.");
    }
    keys = keys.splice(index, 1);
    return keys[0];
  }

  power = 0;

  effect(): void { }

  constructor(owner: string) {
    this.owner = owner;
  }
}
