import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CabinsStateModel} from '../models/cabins';

@Injectable({
  providedIn: 'root'
})
export class CabinService {
  cabinsAPI = environment.cabins;
  constructor(private httpClient: HttpClient) { }

  getCabinsForMarket(market: string): Observable<CabinsStateModel[]> {
    const params = new HttpParams().set('market', market);
    return this.httpClient.get<CabinsStateModel[]>(this.cabinsAPI, {params});
  }
}
