/* eslint semi: "off", no-extra-semi: "off" */

import Buff from './Buff';

export default interface BuffSlot {
  buff: Buff;
  created: boolean;
  duration: number | 'forever';
};
