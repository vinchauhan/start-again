import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolCodeComponent } from './components/pool-code/pool-code.component';
import {PoolCodeRoutingModule} from './poolcode-routing.module';



@NgModule({
  declarations: [PoolCodeComponent],
  imports: [
    CommonModule,
    PoolCodeRoutingModule
  ]
})
export class PoolcodeModule { }
