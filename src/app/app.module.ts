import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {MarketsState} from './shared/state/markets-state';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgSelectModule,
    HttpClientModule,
    NgxsModule.forRoot([MarketsState], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SharedModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
