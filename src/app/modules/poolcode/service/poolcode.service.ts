import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PoolcodeService {
  poolCodeURL = 'assets/data/poolCode.json';
  constructor(private http: HttpClient) {

  }

  getPoolCodes() {
    return this.http.get(this.poolCodeURL);
  }
}
