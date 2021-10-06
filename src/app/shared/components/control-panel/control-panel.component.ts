import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import {Store} from '@ngxs/store';
import {MarketActions} from '../../actions/market-action';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  marketList;

  constructor(private marketService: MarketService, private store: Store ) { }

  ngOnInit(): void {
    console.log('control-panel is initialized');
  }

}
