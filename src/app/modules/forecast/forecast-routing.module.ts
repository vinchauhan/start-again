import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ForecastHomeComponent } from './forecast-home/forecast-home.component';

const routes: Routes = [
  {
    path: '',
    component: ForecastHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  HttpClientModule],
  exports: [RouterModule],
  providers: []
})
export class ForecastRoutingModule {
}
