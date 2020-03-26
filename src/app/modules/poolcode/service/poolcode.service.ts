import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PoolCodesRes } from '../model/pool-code.response';
import {PoolCodesReq} from '../model/pool-code.request';

@Injectable()
export class PoolcodeService {
  poolCodeURL = 'assets/data/pool-code-response.json';
  poolCodeURLBackend = 'http://rmappt22.qcorpaa.aa.com:9088/plc/';

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
    return this.http.post(this.poolCodeURLBackend + 'holiday-poolcodes', json, this.httpOptions);
  }

}
