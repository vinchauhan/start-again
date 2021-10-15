import {Injectable} from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EndDateAction } from '../actions/enddate-action';
import {MarketActions, MarketSelectedAction} from '../actions/market-action';
import { StartDateAction } from '../actions/startdate-action';
import { AllMarkets } from '../models/all-markets';
import { DatePickerInput } from '../models/datepicker-input';
import { MarketDropdownModel } from '../models/market-dropdown';
import { OriginDestination } from '../models/origin-destination';
import { MarketService } from '../services/market.service';
import {CabinsActions, CabinSelectAction} from '../actions/cabins-actions';
import {CabinService} from '../services/cabin.service';
import {CabinsStateModel} from '../models/cabins';
import {PosStateModel} from '../models/pos';

export class MarketStateModel {
  allmarkets: AllMarkets;
  selectedMarket?: OriginDestination;
  marketListDropdown?: MarketDropdownModel[];
  cabins?: CabinsStateModel[];
  flows?: CabinsStateModel[];
  pos?: PosStateModel[];
  selectedCabin?: CabinsStateModel;
  startDateInput?: DatePickerInput;
  endDateInput?: DatePickerInput;
}
// {id: 'PHX|DFW', text: 'PHXDFW'} - marketDropdownlist sample
@State<MarketStateModel>({
  name: 'AppState',
  defaults: {
    allmarkets: { alpha: [], directional: [], spokes: []},
    selectedMarket: {origin: '', destination: ''},
    cabins: [],
    flows: [],
    pos: [{key: '0', value: 'Domestic', isSelected: true}, {key: '1', value: 'International', isSelected: true }],
    marketListDropdown: [],
    startDateInput: getDefaultStartDate(),
    endDateInput: getDefaultEndDateInput()
  }
})
@Injectable()
export class MarketsState {

constructor(private store: Store,
            private marketService: MarketService,
            private cabinService: CabinService) {}

    @Selector()
    static getAllMarkets(state: MarketStateModel) {
        return state.allmarkets;
    }

    @Selector()
    static getSelectedMarket(state: MarketStateModel) {
        return state.selectedMarket;
    }

    @Selector()
    static getMarketDropdownList(state: MarketStateModel): MarketDropdownModel[] {
      return state.marketListDropdown;
    }

    // Select startInputDate
    @Selector()
    static getStartDateInput(state: MarketStateModel): DatePickerInput {
      return state.startDateInput;
    }

    // Select startInputDate
    @Selector()
    static getEndDateInput(state: MarketStateModel): DatePickerInput {
      return state.endDateInput;
    }

    @Selector()
    static getCabins(state: MarketStateModel): CabinsStateModel[] {
      return state.cabins;
    }

    @Selector()
    static getSelectedCabin(state: MarketStateModel): CabinsStateModel {
      return state.selectedCabin;
    }

    @Selector()
    static getPosFilter(state: MarketStateModel): PosStateModel[] {
      return state.pos;
    }

    @Selector()
    static getFlows(state: MarketStateModel): CabinsStateModel[] {
      return state.flows;
    }
    // [ACTIONS]: Listeners

    // @Action(StartEndDateAction)
    // loadDefaultDateRange({getState, setState}: StateContext<MarketStateModel>) {
    //   console.log('Received StartEndDateAction')
    // }

    @Action(CabinSelectAction)
    updateSelectedCabin({getState, setState}: StateContext<MarketStateModel>, {cabin}: CabinSelectAction) {
      console.log('ActionListener | CabinSelectAction | payload {}', cabin);
      setState(patch({
        selectedCabin: cabin
      }));
    }

    @Action(StartDateAction)
    updateStartDate({getState, setState}: StateContext<MarketStateModel>, {startDate}: StartDateAction) {
      console.log('Received StartEndDateAction', startDate);
      const state = getState;
      setState(
        patch({
        startDateInput: startDate
      })
      );
    }

    @Action(EndDateAction)
    updateEndDate({getState, setState}: StateContext<MarketStateModel>, {endDate}: EndDateAction) {
      console.log('Received StartEndDateAction', endDate);
      setState(
        patch({
        endDateInput: endDate
      })
      );
    }

    @Action(CabinsActions)
    getCabins(ctx: StateContext<MarketStateModel>, { market }: CabinsActions) {
      console.log('CabinAction triggered');
      const state = ctx.getState;
      return this.cabinService.getCabinsForMarket(market).pipe(
        tap((cabins) => {
          ctx.setState(
            patch({
              cabins,
              selectedCabin: cabins[0]
            })
          );
        })
      );
    }

    // Market Action Listeners
    @Action(MarketSelectedAction)
    marketSelected({getState, setState}: StateContext<MarketStateModel>, {selectedMarket}: MarketSelectedAction) {
      // When market is selected on the control-panel component,  the first thing to do is fetch the cabins for that market
      console.log('Action MarketSelectedAction listened');
      console.log('Fetching cabins in the market', selectedMarket);
      return this.cabinService.getCabinsForMarket(selectedMarket.origin + '|' + selectedMarket.destination).pipe(
        tap((cabins) => {
          setState(patch(
            {
              cabins,
              selectedCabin: cabins[0],
              selectedMarket
            }
          ));
        })
      );
    }

    @Action(MarketActions)
    getMarkets({getState, setState}: StateContext<MarketStateModel>) {
      console.log('Action MarketAction listened');
      const userMarkets$ = this.marketService.getAllMarketsByUser();
      const allMarkets$ = this.marketService.getMarkets();

      return forkJoin([userMarkets$, allMarkets$]).pipe(tap((results) => {
        const userMarkets = results[0];
        const allMarkets = results[1];
        let firstHalfMarketList = [];
        const allMarketsList = allMarkets.directional;
        let market = {origin: '', destination: ''};
        if (userMarkets && userMarkets.directional && userMarkets.directional.length > 0) {
          market = userMarkets.directional[0];
          firstHalfMarketList = userMarkets.directional;
        } else {
          market = allMarkets.directional[0];
          firstHalfMarketList = allMarkets.directional;
        }
          // Added a seperator to be shown as a divider between market list
        firstHalfMarketList.push({origin: 'x',
          destination: 'x'});

        for (const market of allMarketsList) {
            if (userMarkets.directional.length > 0 && userMarkets.directional.findIndex(mkt => mkt.origin === market.origin &&
              mkt.destination === market.destination) < 0) {
              firstHalfMarketList.push(market);
            }
        }
          // console.log(firstHalfMarketList);

          // Build the market object to be used by the MarketDropdown component
        const marketListDropdown =  firstHalfMarketList.map(i => {
            if (i.origin === 'x') {
              const text2 = '='.repeat(14);
              return {id: i.origin + '|' + i.destination, text: text2, disabled: true};
            } else {
              return {id: i.origin + '|' + i.destination, text: i.origin + i.destination};
            }
          });

        const state = getState();
        return setState({
                  ...state,
                  allmarkets: allMarkets,
                  selectedMarket: market,
                  marketListDropdown
                });
      }));
    }
}


function getDefaultStartDate(): DatePickerInput {
  const today: Date = new Date();
  console.log('initialize startDate in store');
  return {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
}

function getDefaultEndDateInput(): DatePickerInput {
  const today: Date = new Date();
  console.log('initialize endDate in the store to');
  return {year: today.getFullYear(), month: today.getMonth() + 2, day: today.getDate()};
}

