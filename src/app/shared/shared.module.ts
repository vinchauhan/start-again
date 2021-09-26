import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import {MarketDropdownComponent} from './components/market-dropdown/market-dropdown.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';



@NgModule({
    declarations: [MarketDropdownComponent, ControlPanelComponent],
    exports: [
        ControlPanelComponent
    ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ]
})
export class SharedModule { }
