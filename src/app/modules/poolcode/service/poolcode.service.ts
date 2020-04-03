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

  getPoolCodesAsync(): Observable<PoolCodesRes> {
    return this.http.get<PoolCodesRes>(this.poolCodeURL);
  }
  getPoolCodesFromBackend(json: PoolCodesReq): Observable<PoolCodesRes> {
    return this.http.post<PoolCodesRes>(this.poolCodeURLBackend + 'holiday-poolcodes', json, this.httpOptions);
  }

  updateAllPoolCodesDate(updatePoolCodeObj) {
    return this.http.post<PoolCodesRes>(this.poolCodeURLBackend + 'holiday-poolcode', updatePoolCodeObj, this.httpOptions);
  }

}
