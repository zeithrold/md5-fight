import md5 from "blueimp-md5";
// import { Skill } from '.'
import { Skill, SkillProp, utils } from "./skills";
import { BuffSlot } from "./buffs";

export interface PlayerProp {
  value: number;
  readonly default: number;
}

export default class Player {
  /**
   * The name of the player.
   */
  readonly name: string;
  /**
   * The MD5 hex value of the name. Auto-generated on the constructor.
   */
  readonly md5: string;
  /**
   * The private health var of the Player.
   */
  _health: number;
  attackPower: PlayerProp;
  speed: PlayerProp;
  fortunate: PlayerProp;
  physicalDefence: PlayerProp;
  magicalDefence: PlayerProp;
  // anger: PlayerProp;
  readonly skills: Skill[] = [];
  skillProps: SkillProp = {
    freezed: false,
    anger: 0
  };
  buffs: BuffSlot[] = [];
  readonly maxHealth: number;
  type: "physical" | "magical";
  constructor(name: string) {
    this.name = name;
    const tempMD5Value = md5(name);
    this.md5 = tempMD5Value;
    const slicedPlayerProp: number[] = [];
    for (let i = 0; i < 8; i += 1) {
      slicedPlayerProp.push(Math.floor(parseInt(this.md5.slice(i * 2, (i + 1) * 2), 16) / 2.55));
    }
    this._health = slicedPlayerProp[0];
    this.maxHealth = slicedPlayerProp[0];
    this.attackPower = { value: slicedPlayerProp[1], default: slicedPlayerProp[1] };
    this.speed = { value: slicedPlayerProp[2], default: slicedPlayerProp[2] };
    this.fortunate = { value: slicedPlayerProp[3], default: slicedPlayerProp[3] };
    this.physicalDefence = { value: slicedPlayerProp[4], default: slicedPlayerProp[4] };
    this.magicalDefence = { value: slicedPlayerProp[5], default: slicedPlayerProp[5] };
    this.type = slicedPlayerProp[6] % 2 === 0 ? "physical" : "magical";
    let skills = utils.getSkillSet(slicedPlayerProp[7]);
    for (let i = 0; i < skills.length; i += 1) {
      this.skills.push(new skills[i](this.name));
    }
  }
  get health() {
    return this._health;
  }
  set health(value: number) {
    const tempValue = value <= 0 ? 0 : value;
    if (tempValue < this._health) {
      const delta = this._health - tempValue;
      this.skillProps.anger = this.skillProps.anger + delta * 0.25;
    }
    this._health = tempValue;
  }
}
