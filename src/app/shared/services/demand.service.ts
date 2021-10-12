import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandRequest } from 'src/app/modules/forecast/models/demand-request';
import { environment } from 'src/environments/environment';
import {ForecastResponse} from '../../modules/forecast/models/forecast-response';

@Injectable({
  providedIn: 'root'
})
export class DemandService {

  demandAPI = environment.demand;
  constructor(private httpClient: HttpClient) { }


  getDemand(demand: DemandRequest): Observable<ForecastResponse[]> {
    return this.httpClient.post<ForecastResponse[]>(this.demandAPI, demand);
  }
}
