type Color = 'blue' | 'red' | 'green' | 'yellow' | string;

export default class Log {
  message: string;

  bgColor?: Color;

  constructor(message: string, bgColor?: Color) {
    if (bgColor) {
      this.bgColor = bgColor;
    }
    this.message = message;
  }
}
