/* eslint @typescript-eslint/no-empty-function: "off", class-methods-use-this: "off" */

import { GameAdditionalElement } from "../commons";

export default class Buff implements GameAdditionalElement {
  readonly id: string = "default-buff";

  // displayName: string = "Default display name";
  readonly displayName: string = "Default display name";

  readonly description: string = "Default description";

  readonly owner: string;

  readonly quote?: string;

  readonly type: "positive" | "negative" = "negative";

  power = 0;

  created(): void {}

  effect(): void {}

  destroyed(): void {}

  constructor(owner: string) {
    this.owner = owner;
  }
}
