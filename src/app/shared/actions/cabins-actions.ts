import { CabinsStateModel } from "../models/cabins";

export class CabinsActions {
  static readonly type = '[Load Cabins] Load cabin for market';
  market: string;
  constructor(market: string) {
    this.market = market;
  }
}

export class CabinSelectAction {
  static readonly type = '[Select Cabin] New cabin selected';
  cabin: CabinsStateModel
  constructor(cabin: CabinsStateModel) {
    this.cabin = cabin;
  }
}
