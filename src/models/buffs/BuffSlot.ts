import Buff from "./Buff";

export default interface BuffSlot {
  buff: Buff;
  created: boolean;
  duration: number | "forever";
}
