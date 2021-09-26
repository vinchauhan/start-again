import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllMarkets } from '../models/all-markets';
import { UserMarkets } from '../models/user-markets';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private httpClient: HttpClient) { }

  marketAPI = environment.allMarkets;
  userMarketAPI = environment.userMarkets;

  getMarkets(): Observable<AllMarkets> {
      return this.httpClient.get<AllMarkets>(this.marketAPI);
  }

  getAllMarketsByUser(): Observable<UserMarkets> {
    return this.httpClient.get<UserMarkets>(this.userMarketAPI)
  }
}
