import { Component, Input, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {MarketActions} from '../../actions/market-action';
import { MarketDropdownModel } from '../../models/market-dropdown';
import { MarketsState } from '../../state/markets-state';

@Component({
  selector: 'app-market-dropdown',
  templateUrl: './market-dropdown.component.html',
  styleUrls: ['./market-dropdown.component.scss']
})
export class MarketDropdownComponent implements OnInit {

  disabled = true;
  @Select (MarketsState.getMarketDropdownList) marketList$: Observable<MarketDropdownModel>
  selectedMarketObj;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    console.log('MarketDropdown initialized');
    // this.marketList$.pipe(take(1)).subscribe((market) => {
    //   console.log('selecting market', market[0])
    //   this.selectedMarketObj = market[0]
    // })
    // console.log('loading market dropdown result from store')
    const result: MarketDropdownModel[] = this.store.selectSnapshot<MarketDropdownModel[]>(MarketsState.getMarketDropdownList);
    // console.log(result)
    // tslint:disable-next-line:triple-equals
    if (result.length == 0) {
      console.log('selecting market');
      this.store.dispatch(new MarketActions());
      // this.marketList$.pipe(take(1)).subscribe((market) => {
      //   console.log('selecting market')
      //   this.selectedMarketObj = market
      // })
    }
  }

  selectedMarket(event: any) {
   this.selectedMarketObj = event;
   console.log(event)
  }

}
