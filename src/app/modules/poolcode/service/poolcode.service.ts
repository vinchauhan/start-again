import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PoolCodesReq} from '../model/pool-code.request';
import { environment } from 'src/environments/environment';

@Injectable()
export class PoolcodeService {
  poolCodeURL = 'assets/data/pool-code-response.json';
  poolCodeURLBackend = 'http://rmappt22.qcorpaa.aa.com:9088/plc/';
  poolCodeAPI = environment.poolCodes;

  // poolCodeURLBackend = 'http://localhost:9083/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) {

  }

  getPoolCodesAsync() {
    return this.http.get(this.poolCodeURL);
  }
  getPoolCodesFromBackend(json: PoolCodesReq) {
    return this.http.post(this.poolCodeAPI, json, this.httpOptions);
  }

}
