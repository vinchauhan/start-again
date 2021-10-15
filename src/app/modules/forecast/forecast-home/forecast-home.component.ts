import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {BehaviorSubject, Observable} from 'rxjs';
import { MarketDropdownModel } from 'src/app/shared/models/market-dropdown';
import { OriginDestination } from 'src/app/shared/models/origin-destination';
import { MarketsState, MarketStateModel } from 'src/app/shared/state/markets-state';
import { DemandRequest } from '../models/demand-request';
import { DimensionRequest } from '../models/dimension-request';
import {DemandService} from '../../../shared/services/demand.service';
import {ForecastResponse} from '../models/forecast-response';

@Component({
  selector: 'app-forecast-home',
  templateUrl: './forecast-home.component.html',
  styleUrls: ['./forecast-home.component.scss']
})
export class ForecastHomeComponent implements OnInit {

  // Select things from the store that will be used to build the forecast Demand Request
  @Select(MarketsState.getSelectedMarket) market$: Observable<OriginDestination>;

  differentView = [
    {'key': 'day', 'value': 'Day', 'isChecked': true},
    {'key': 'week', 'value': 'Week', 'isChecked': false},
    {'key': 'month', 'value': 'Month', 'isChecked': false}
  ];
  scope = 'day';
  isScope = {day: true, week: true, month: true};
  forecastDemandRequest: DemandRequest;
  forecastDimensionRequest: DimensionRequest;
  forecastDemandResponse$: BehaviorSubject<ForecastResponse[]> = new BehaviorSubject<ForecastResponse[]>(null);

  constructor(private store: Store, private demandService: DemandService) { }

  ngOnInit(): void {
    // Build the initial request for calling all the APIs when the component loads for the first time.
    if (!this.forecastDemandRequest) {
      console.log('ngOnInit | ForecastHomeComponent |', 'initializing forecastDemandRequest');
      this.store.select(MarketsState).subscribe((appState: MarketStateModel) => {
        // TODO: This will be called many a few times since the MarketState changes by the initialization of control-panel component
        // Only build the request Object when the MarketState is completely initialized
        // Need to see if we can only emit from the state once when initial control-panel state is completely initialize
        if (appState.selectedCabin && appState.selectedMarket) {
          console.log('New App State is : ', appState);
          this.forecastDemandRequest = {
            market: appState.selectedMarket.origin + '|' + appState.selectedMarket.destination,
            fromDate: appState.startDateInput.year + '-' + appState.startDateInput.month + '-' + appState.startDateInput.day,
            cabin: appState.selectedCabin.key,
            scope: 'day',
            flows: [],
            pos: appState.backendPos,
            toDate: appState.endDateInput.year + '-' + appState.endDateInput.month + '-' + appState.endDateInput.day,
            yearsBack: 2
          };
          console.log(this.forecastDemandRequest);

          // For now lets call the backend here to get demand
          this.demandService.getDemand(this.forecastDemandRequest).subscribe((result) => {
            console.log('demandService.getDemand', result);
            this.forecastDemandResponse$.next(result);
          });
        }
      });
    }
  }

  onMarketSelected(event: any) {
    console.log('ForecastHomeComponent', event);
  }

  onScopeChange(scope) {

  }

}
