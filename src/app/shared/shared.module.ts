import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import {MarketDropdownComponent} from './components/market-dropdown/market-dropdown.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NgbDate, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [
      MarketDropdownComponent, 
      ControlPanelComponent, 
      DatePickerComponent
    ],
    exports: [
        ControlPanelComponent,
        DatePickerComponent,
        NgbModule
    ],
    imports: [
      CommonModule,
      NgSelectModule,
      FormsModule,
      NgbModule
    ]
})
export class SharedModule { }
