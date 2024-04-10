

import { IConfiguration } from '../src/typings/index';

declare global {
  interface Window {
    BotmanWidget: typeof BotmanWidget;
  }
}

declare class BotmanWidget {
  constructor(config: IConfiguration);
  init(): void;
  destroy(): void;
  render(): void;
}

export as namespace BotmanWidget;
export = BotmanWidget;