/* eslint @typescript-eslint/no-empty-function: "off", class-methods-use-this: "off" */

import { GameAdditionalElement } from '../commons';

export default class Skill implements GameAdditionalElement {
  readonly id: string = 'default-skill';

  readonly displayName: string = 'Default display name';

  readonly description: string = 'Default description';

  readonly owner: string;

  readonly quote?: string;

  power = 0;

  effect(): void { }

  constructor(owner: string) {
    this.owner = owner;
  }
}
