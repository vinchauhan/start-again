import { Component, Input, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
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
  @Select (MarketsState.getMarketDropdownList) 
  marketList$: MarketDropdownModel[];
  selectedMarketObj = {'hello':'world'};

  constructor(private store: Store) {
  
  }

  ngOnInit(): void {
    console.log('MarketDropdown initialized');
    if (!this.marketList$) {
      this.store.dispatch(new MarketActions());
    }

  }

  selectedMarket(event: any) {
   
  }

}
