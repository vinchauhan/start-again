import {Injectable} from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EndDateAction } from '../actions/enddate-action';
import { MarketActions } from '../actions/market-action';
import { StartDateAction } from '../actions/startdate-action';
import { AllMarkets } from '../models/all-markets';
import { DatePickerInput } from '../models/datepicker-input';
import { MarketDropdownModel } from '../models/market-dropdown';
import { OriginDestination } from '../models/origin-destination';
import { MarketService } from '../services/market.service';

export class MarketStateModel {
  allmarkets: AllMarkets;
  selectedMarket: OriginDestination;
  marketListDropdown: MarketDropdownModel[];
  startDateInput?: DatePickerInput;
  endDateInput?: DatePickerInput
}

@State<MarketStateModel>({
  name: 'AppState',
  defaults: {
    allmarkets: { alpha: [], directional: [], spokes: []},
    selectedMarket: {origin: '', destination: ''},
    marketListDropdown: [{id: 'PHX|DFW', text: 'PHXDFW'}],
    startDateInput: getDefaultStartDate(),
    endDateInput: getDefaultEndDateInput()
  }
})
@Injectable()
export class MarketsState {

  constructor(private store: Store, private marketService: MarketService) {}

    @Selector()
    static getAllMarkets(state: MarketStateModel) {
        return state.allmarkets;
    }

    @Selector()
    static getSelectedMarket(state: MarketStateModel) {
        return state.selectedMarket;
    }

    @Selector()
    static getMarketDropdownList(state: MarketStateModel) : MarketDropdownModel[] {
      return state.marketListDropdown;
    }

    // Select startInputDate
    @Selector()
    static getStartDateInput(state: MarketStateModel): DatePickerInput {
      return state.startDateInput
    }

    // Select startInputDate
    @Selector()
    static getEndDateInput(state: MarketStateModel): DatePickerInput {
      return state.endDateInput
    }

    // Action Listeners

    // @Action(StartEndDateAction)
    // loadDefaultDateRange({getState, setState}: StateContext<MarketStateModel>) {
    //   console.log('Received StartEndDateAction')
    // }

    @Action(StartDateAction)
    updateStartDate({getState, setState}: StateContext<MarketStateModel>, {startDate}: StartDateAction) {
      console.log('Received StartEndDateAction', startDate)
      const state = getState;
      setState(
        patch({
        startDateInput: startDate
      })
      );
    }

    @Action(EndDateAction)
    updateEndDate({getState, setState}: StateContext<MarketStateModel>, {endDate}: EndDateAction) {
      console.log('Received StartEndDateAction', endDate)
      const state = getState;
      setState(
        patch({
        endDateInput: endDate
      })
      );
    }

    @Action(MarketActions)
    getMarkets({getState, setState}: StateContext<MarketStateModel>) {
      console.log("Action MarketAction listened")
      const userMarkets$ = this.marketService.getAllMarketsByUser();
      const allMarkets$ = this.marketService.getMarkets();

      return forkJoin([userMarkets$, allMarkets$]).pipe(tap((results)=> {
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
          firstHalfMarketList.push({'origin': 'x',
          'destination': 'x'});

          for (const market of allMarketsList) {
            if (userMarkets.directional.findIndex(mkt => mkt.origin === market.origin &&
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
                                setState({
                                  ...state,
                                  allmarkets: allMarkets,
                                  selectedMarket: market,
                                  marketListDropdown: marketListDropdown
                              });
      }));
    }
}


function getDefaultStartDate(): DatePickerInput {
  const today: Date = new Date();
  console.log('initialize startDate in store')
  return {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
}

function getDefaultEndDateInput(): DatePickerInput {
  const today: Date = new Date();
  console.log('initialize endDate in the store to')
  return {year: today.getFullYear(), month: today.getMonth() + 2, day: today.getDate()};
}

