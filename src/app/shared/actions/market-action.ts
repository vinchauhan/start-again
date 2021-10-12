import {MarketDropdownModel} from '../models/market-dropdown';
import {OriginDestination} from '../models/origin-destination';

export class MarketActions {
    static readonly type = '[Markets] Load All Markets';
    constructor() {}
}

export class MarketSelectedAction {
  static readonly type = '[Market] New Market Selected';
  selectedMarket: OriginDestination;
  constructor(selectedMarket: OriginDestination) {
    this.selectedMarket = selectedMarket;
  }
}
