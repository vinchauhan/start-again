import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MarketActions } from '../actions/market-action';
import { AllMarkets } from '../models/all-markets';
import { OriginDestination } from '../models/origin-destination';
import { MarketService } from '../services/market.service';

export class MarketStateModel {
  allmarkets: AllMarkets;
  selectedMarket: OriginDestination;
}

@State<MarketStateModel>({
  name: 'AppState',
  defaults: {
    allmarkets: { alpha: [], directional: [], spokes: []},
    selectedMarket: {origin: '', destination: ''}
  }
})
@Injectable()
export class MarketsState {

  constructor(private store: Store, private marketService: MarketService) {}

  @Selector()
    static getTodoList(state: MarketStateModel) {
        return state.allmarkets;
    }

    @Selector()
    static getSelectedTodo(state: MarketStateModel) {
        return state.selectedMarket;
    }


  @Action(MarketActions)
  getMarkets({getState, setState}: StateContext<MarketStateModel>) {
    const userMarkets$ = this.marketService.getAllMarketsByUser();
    const allMarkets$ = this.marketService.getMarkets();

    return forkJoin([userMarkets$, allMarkets$]).pipe(tap((results=> {
      const userMarkets = results[0];
      const allMarkets = results[1];
      let market = {origin: '', destination: ''};
      if (userMarkets && userMarkets.directional && userMarkets.directional.length > 0) {
        market = userMarkets.directional[0];
      } else {
        market = allMarkets.directional[0];
      }
      const state = getState();
                              setState({
                                ...state,
                                allmarkets: allMarkets,
                                selectedMarket: market
                            });
    })))
  }
  
}

