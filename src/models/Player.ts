import md5 from "blueimp-md5";
// import { Skill } from '.'
import { Skill, utils } from "./skills";
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

  /**
   * The power of attack of the player. It'll be taken mainly during the main attack.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  attackPower: PlayerProp;

  /**
   * The speed of the player. The chance of dodge depends on the speed.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  speed: PlayerProp;

  /**
   * The amount of fortunate of the player.
   * The chance of discount of the attack mount orruration depends on the fortunate amount.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  fortunate: PlayerProp;

  /**
   * The basic physical defence amount of the player.
   * When a physical attack occurs, the amount of the attack will be discounted by the physical defence amount in a proper proportion.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  physicalDefence: PlayerProp;

  /**
   * The basic magical defence amount of the player.
   * When a magical attack occurs, the amount of the attack will be discounted by the magical defence amount in a proper proportion.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  magicalDefence: PlayerProp;

  /**
   * The skill array of the Player. When turned to a player, after the player's all the buff affects it's skills affects.
   * More information see class `Skill`'s document.
   * @generatedFromMD5 Player's skill set is auto-generated from the md5-hex of the name.
   */
  readonly skills: Skill[] = [];

  buffProps = {
    freezed: false
  };

  skillProps = {
    // freezed: false,
    anger: 0
  };

  buffs: BuffSlot[] = [];

  readonly maxHealth: number;

  type: "physical" | "magical";

  /**
   * The constructor of the class `Player`.
   *
   * Just put the name in the param, and let it go!
   * @param name The player's name
   */
  constructor(name: string) {
    this.name = name; // Sets the name and generate md5-hex value.
    const tempMD5Value = md5(name);
    this.md5 = tempMD5Value;
    const slicedPlayerProp: number[] = [];
    for (let i = 0; i < 8; i += 1) {
      slicedPlayerProp.push(Math.floor(parseInt(this.md5.slice(i * 2, (i + 1) * 2), 16) / 2.55));
    } // Slice the MD5-hex into 8 parts which each of them contains 2 chars.
    // Then convert it to [0, 100] 10-radix number.
    // BEGIN the property and skills settings.
    this._health = slicedPlayerProp[0];
    this.maxHealth = slicedPlayerProp[0];
    this.attackPower = { value: slicedPlayerProp[1], default: slicedPlayerProp[1] };
    this.speed = { value: slicedPlayerProp[2], default: slicedPlayerProp[2] };
    this.fortunate = { value: slicedPlayerProp[3], default: slicedPlayerProp[3] };
    this.physicalDefence = { value: slicedPlayerProp[4], default: slicedPlayerProp[4] };
    this.magicalDefence = { value: slicedPlayerProp[5], default: slicedPlayerProp[5] };
    this.type = slicedPlayerProp[6] % 2 === 0 ? "physical" : "magical";
    const tempSkills = utils.getSkillSet(slicedPlayerProp[7]);
    for (let i = 0; i < tempSkills.length; i += 1) {
      this.skills.push(new tempSkills[i](this.name));
    }
    // END the property and skills settings.
  }

  get health() {
    return this._health;
  }

  /**
   * health's setter.
   * The setter contains Player's anger-collector which is used by the anger.
   */
  set health(value: number) {
    const tempValue = value <= 0 ? 0 : value;
    if (tempValue < this._health) {
      const delta = this._health - tempValue;
      this.skillProps.anger = this.skillProps.anger + delta * 0.25;
    }
    this._health = tempValue;
  }
}
