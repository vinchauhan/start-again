import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'forecast',
    loadChildren: () => import('./modules/forecast/forecast.module').then(m => m.ForecastModule)
  },
  {
    path: 'optimization',
    loadChildren: () => import('./modules/optimization/optimization.module').then(m => m.OptimizationModule)
  },
  {
    path: 'poolcode',
    loadChildren: () => import('./modules/poolcode/poolcode.module').then(m => m.PoolcodeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
