import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import {MarketDropdownComponent} from './components/market-dropdown/market-dropdown.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NgbDate, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimePickerComponent } from './components/time-picker/time-picker.component';



@NgModule({
    declarations: [
      MarketDropdownComponent, 
      ControlPanelComponent, 
      DatePickerComponent, TimePickerComponent
    ],
    exports: [
        ControlPanelComponent,
        DatePickerComponent,
        NgbModule,
        FontAwesomeModule
    ],
    imports: [
      CommonModule,
      NgSelectModule,
      FormsModule,
      NgbModule,
      FontAwesomeModule
    ]
})
export class SharedModule { }
