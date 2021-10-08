import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import {Select, Selector, Store} from '@ngxs/store';
import {MarketActions} from '../../actions/market-action';
import {MarketsState} from '../../state/markets-state';
import {CabinsActions} from '../../actions/cabins-actions';
import {Observable} from 'rxjs';
import {OriginDestination} from '../../models/origin-destination';
import {MarketDropdownModel} from '../../models/market-dropdown';
import {CabinsStateModel} from '../../models/cabins';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  marketList;
  @Select (MarketsState.getSelectedMarket) selectedMarket$: Observable<OriginDestination>;
  @Select (MarketsState.getCabins) cabins$: Observable<CabinsStateModel[]>;
  @Select (MarketsState.getSelectedCabin) cabinData$: Observable<CabinsStateModel>;
  cabinData: any = "C"
  flows = [
            {key: 'B', value: 'Both', isSelected: true},
            {key: 'L', value: 'Local', isSelected: true},
            {key: 'F', value: 'Flow', isSelected: true}
          ];
  posFilter = [
                {key: 1, value: 'Domestic', isSelected: true},
                {key: 2, value: 'International', isSelected: true}
              ];
  constructor(private marketService: MarketService, private store: Store ) { }

  ngOnInit(): void {
    console.log('control-panel is initialized');
    // When app starts there is no selected market in the state so its better to subscribe to the state slice if data exists
    // const result: OriginDestination = this.store.selectSnapshot<OriginDestination>(MarketsState.getSelectedMarket);
    this.selectedMarket$.subscribe((selectedMarket) => {
      // Only dispatch action when selected market exists
      if ( selectedMarket.origin !== '' && selectedMarket.destination !== '') {
        this.store.dispatch(new CabinsActions(selectedMarket.origin + '|' + selectedMarket.destination));
      }
    });
  }

  resetDates() {

  }

  openTimeBandModal() {

  }

  cabinsFun() {

  }

  flowsFun(flow: { isSelected: boolean; value: string; key: string } | { isSelected: boolean; value: string; key: string } | { isSelected: boolean; value: string; key: string }) {

  }

  posFun(pos: {isSelected: boolean; value: string; key: number} | {isSelected: boolean; value: string; key: number}) {

  }
}
