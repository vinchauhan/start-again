import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { Observable } from 'rxjs';
import {MarketActions, MarketSelectedAction} from '../../actions/market-action';
import { MarketDropdownModel } from '../../models/market-dropdown';
import {MarketsState, MarketStateModel} from '../../state/markets-state';
import {CabinsActions} from '../../actions/cabins-actions';
import {OriginDestination} from '../../models/origin-destination';

@Component({
  selector: 'app-market-dropdown',
  templateUrl: './market-dropdown.component.html',
  styleUrls: ['./market-dropdown.component.scss']
})
export class MarketDropdownComponent implements OnInit {


  @Output() emitSelectedMarket = new EventEmitter();

  disabled = true;
  @Select (MarketsState.getMarketDropdownList) marketList$: Observable<MarketDropdownModel>;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    // this.marketList$.pipe(take(1)).subscribe((market) => {
    //   console.log('selecting market', market[0])
    //   this.selectedMarketObj = market[0]
    // })
    // console.log('loading market dropdown result from store')
    const result: MarketDropdownModel[] = this.store.selectSnapshot<MarketDropdownModel[]>(MarketsState.getMarketDropdownList);
    // console.log(result)
    // tslint:disable-next-line:triple-equals
    if (result.length == 0) {
      console.log('Loading markets for MarketDropdown by dispatch MarketActions');
      this.store.dispatch(new MarketActions()).subscribe((state: MarketStateModel) => {
        console.log(state);
        // Once the selectedMarket is added to state we need to dispatch another action to load cabins
        // Grab the selectedMarket from the state to be passed to CabinsAction
        const selectedMarket = this.store.selectSnapshot<OriginDestination>(MarketsState.getSelectedMarket);
        this.store.dispatch(new CabinsActions(selectedMarket.origin + '|' + selectedMarket.destination));
      });
      // this.marketList$.pipe(take(1)).subscribe((market) => {
      //   console.log('selecting market')
      //   this.selectedMarketObj = market
      // })
    }
  }

  selectedMarket(event: MarketDropdownModel) {
    // When market is changed need to load new cabins for the market is the always.
    // Dispatch an action the store to load cabins for the new market
    // Also dispatch and action to store that a new market was selected
    if (event) {
      console.log('New Market Selected', event);
      const originDestination = event.id.split('|');
      console.log(originDestination[0]);
      console.log(originDestination[1]);
      this.store.dispatch(new MarketSelectedAction({origin: originDestination[0], destination: originDestination[1]})).subscribe(() => {
        this.emitSelectedMarket.emit(event.id);
      });
    }
  }

}
