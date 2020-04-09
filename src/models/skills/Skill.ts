import { GameAdditionalElement } from "../commons";
import { Log } from "../logs";

export default class Skill implements GameAdditionalElement {
  readonly id: string = "default-skill";
  readonly displayName: string = "Default display name";
  readonly description: string = "Default description";
  readonly owner: string;
  readonly quote?: string;
  power: number = 0;
  // created(): void {}
  effect(): void {}
  // destroyed(): void {}
  constructor(owner: string) {
    this.owner = owner;
  }
}
