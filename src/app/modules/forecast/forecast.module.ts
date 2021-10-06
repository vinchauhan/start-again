import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastHomeComponent } from './forecast-home/forecast-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastBarsComponent } from './forecast-bars/forecast-bars.component';
import { ForecastDemandComponent } from './forecast-demand/forecast-demand.component';
import { ForecastClassDimensionComponent } from './forecast-class-dimension/forecast-class-dimension.component';
import { ForecastPeriodDimensionComponent } from './forecast-period-dimension/forecast-period-dimension.component';
import { ForecastDowDimensionComponent } from './forecast-dow-dimension/forecast-dow-dimension.component';
import { ForecastBandDimensionComponent } from './forecast-band-dimension/forecast-band-dimension.component';



@NgModule({
  declarations: [ForecastHomeComponent, ForecastBarsComponent, ForecastDemandComponent, ForecastClassDimensionComponent, ForecastPeriodDimensionComponent, ForecastDowDimensionComponent, ForecastBandDimensionComponent],
  imports: [
    CommonModule,
    SharedModule,
    ForecastRoutingModule
  ]
})
export class ForecastModule { }
