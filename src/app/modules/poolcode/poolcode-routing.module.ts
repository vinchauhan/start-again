import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoolCodeComponent} from './components/pool-code/pool-code.component';
import {PoolcodeService} from './service/poolcode.service';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: PoolCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  HttpClientModule],
  exports: [RouterModule],
  providers: [PoolcodeService]
})
export class PoolCodeRoutingModule {
}
