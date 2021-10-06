export class CabinsActions {
  static readonly type = '[Load Cabins] Load cabin for market';
  market: string;
  constructor(market: string) {
    this.market = market;
  }
}
