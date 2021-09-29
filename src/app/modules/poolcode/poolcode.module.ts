import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolCodeComponent } from './components/pool-code/pool-code.component';
import {PoolCodeRoutingModule} from './poolcode-routing.module';
import { PoolCodeGridComponent } from './components/pool-code-grid/pool-code-grid.component';
import { DateFormatter } from './pipes/date-formater.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlPanelComponent } from 'src/app/shared/components/control-panel/control-panel.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PoolCodeComponent,
    PoolCodeGridComponent,
    DateFormatter
  ],
  imports: [
    CommonModule,
    PoolCodeRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class PoolcodeModule { }
