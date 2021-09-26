import { Component, Input, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {MarketActions} from '../../actions/market-action';

@Component({
  selector: 'app-market-dropdown',
  templateUrl: './market-dropdown.component.html',
  styleUrls: ['./market-dropdown.component.scss']
})
export class MarketDropdownComponent implements OnInit {

  @Input() setDropdown = '';
  disabled = false;
  @Input() marketList = [];
  selectedMarketObj = {};

  constructor(private store: Store) {
    
  }

  ngOnInit(): void {
    console.log('MarketDropdown initialized');
    if (!this.marketList) {
      this.store.dispatch(new MarketActions());
    }

  }

  selectedMarket(event: any) {
    console.log(event);
  }

}
