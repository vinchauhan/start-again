import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolCodeComponent } from './components/pool-code/pool-code.component';
import {PoolCodeRoutingModule} from './poolcode-routing.module';
import { PoolCodeGridComponent } from './components/pool-code-grid/pool-code-grid.component';



@NgModule({
  declarations: [PoolCodeComponent, PoolCodeGridComponent],
  imports: [
    CommonModule,
    PoolCodeRoutingModule
  ]
})
export class PoolcodeModule { }
