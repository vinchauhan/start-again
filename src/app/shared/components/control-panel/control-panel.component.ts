import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MarketService } from '../../services/market.service';
import {Select, Selector, Store} from '@ngxs/store';
import {MarketActions} from '../../actions/market-action';
import {MarketsState} from '../../state/markets-state';
import {CabinsActions, CabinSelectAction} from '../../actions/cabins-actions';
import {Observable} from 'rxjs';
import {OriginDestination} from '../../models/origin-destination';
import {MarketDropdownModel} from '../../models/market-dropdown';
import {CabinsStateModel} from '../../models/cabins';
import {PosStateModel} from '../../models/pos';
import {AddPosAction, RemovePosAction} from '../../actions/pos-actions';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  @Output()
  emitSelectedMarket = new EventEmitter();
  marketList;
  @Select (MarketsState.getSelectedMarket) selectedMarket$: Observable<OriginDestination>;
  @Select (MarketsState.getCabins) cabins$: Observable<CabinsStateModel[]>;
  @Select (MarketsState.getSelectedCabin) cabinData$: Observable<CabinsStateModel>;
  cabinData: any = 'C';
  posFilter = true;
  flows = [
            {key: 'B', value: 'Both', isSelected: true},
            {key: 'L', value: 'Local', isSelected: true},
            {key: 'F', value: 'Flow', isSelected: true}
          ];
  // posFilter = [
  //               {key: 1, value: 'Domestic', isSelected: true},
  //               {key: 2, value: 'International', isSelected: true}
  //             ];
  @Select (MarketsState.getPosFilter) posFilter$: Observable<PosStateModel[]>;
  constructor(private marketService: MarketService, private store: Store ) { }

  ngOnInit(): void {
    console.log('control-panel is initialized');
    // When app starts there is no selected market in the state so its better to subscribe to the state slice if data exists
    // const result: OriginDestination = this.store.selectSnapshot<OriginDestination>(MarketsState.getSelectedMarket);
    // this.selectedMarket$.subscribe((selectedMarket) => {
    //   // Only dispatch action when selected market exists
    //   console.log('selectedMarket store slice subscription Triggered :', selectedMarket);
    //   if ( selectedMarket.origin !== '' && selectedMarket.destination !== '') {
    //     this.store.dispatch(new CabinsActions(selectedMarket.origin + '|' + selectedMarket.destination));
    //   }
    // });
  }

  resetDates() {

  }

  marketSelected(event: any) {
    console.log('event emitted is collected', event);
    this.emitSelectedMarket.emit(event);
  }

  openTimeBandModal() {

  }

  cabinSelected(cabin: CabinsStateModel) {
    console.log('cabinSelected >>>>>', cabin);
    // Dispatch and Action to update selected cabin
    this.store.dispatch(new CabinSelectAction(cabin));
  }

  flowsFun(flow: CabinsStateModel) {

  }

  posFun(pos: PosStateModel, evt) {
    console.log(evt.target.checked);
    console.log(pos);
    // based of if the checkbox event is check or unchecked we have to dispatch add or remove pos actions
    if (!evt.target.checked) {
      // Dispatch remove POS action
      console.log('Dispatch remove POS action for pos :', pos);
      this.store.dispatch(new RemovePosAction(pos));
    } else {
      // Dispatch Add POS action
      console.log('Dispatch add POS action for pos :', pos);
      this.store.dispatch(new AddPosAction(pos));
    }
  }
}
