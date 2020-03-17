import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolCodeComponent } from './components/pool-code/pool-code.component';
import {PoolCodeRoutingModule} from './poolcode-routing.module';
import { PoolCodeGridComponent } from './components/pool-code-grid/pool-code-grid.component';
import { DateFormatter } from './pipes/date-formater.pipe';



@NgModule({
  declarations: [
    PoolCodeComponent,
    PoolCodeGridComponent,
    DateFormatter
  ],
  imports: [
    CommonModule,
    PoolCodeRoutingModule
  ]
})
export class PoolcodeModule { }
