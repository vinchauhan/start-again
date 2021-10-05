import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastHomeComponent } from './forecast-home/forecast-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForecastRoutingModule } from './forecast-routing.module';



@NgModule({
  declarations: [ForecastHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ForecastRoutingModule
  ]
})
export class ForecastModule { }
