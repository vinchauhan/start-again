import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PoolCodesRes } from '../model/pool-code.response';

@Injectable()
export class PoolcodeService {
  poolCodeURL = 'assets/data/pool-code-response.json';
  constructor(private http: HttpClient) {

  }

  getPoolCodesAsync() {
    return this.http.get(this.poolCodeURL);
  }

}
