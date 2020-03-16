import { PcDates, PcDate } from './../../model/pcDate';
import { Component, OnInit } from '@angular/core';
import {PoolcodeService} from '../../service/poolcode.service';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-pool-code',
  templateUrl: './pool-code.component.html',
  styleUrls: ['./pool-code.component.scss']
})

export class PoolCodeComponent implements OnInit {
  poolCodes$: Observable<any>;
  poolCodes;
  startDate =  "2020-03-05";
  endDate = "2021-03-04";
  selectedCabinsData = [
    {
      cabinType: 'Y',
      cabinName: 'Economy'
    },
    {
      cabinType: 'B',
      cabinName: 'Business'
    }
  ];
  constructor(private poolcodeService: PoolcodeService) { }

  ngOnInit(): void {
    let start = moment(this.startDate, 'YYYY-MM-DD');
    let end = moment(this.endDate, 'YYYY-MM-DD');
    let weeks = moment.duration(end.diff(start)).asWeeks();
    let dates = [];
    let pcDates: PcDate[];
    dates.push(start.format('YYYY-MM-DD'));
    while (!start.isSame(end)) {
        start = start.add(1, 'days');
        dates.push(start.format('YYYY-MM-DD'));
        let pcDate = new PcDate();
    }
    console.log(dates);
    console.log('Number of weeks between : ', weeks);
    this.loadPoolCodes();
  }
  public loadPoolCodes() {
    console.log('loading poolCodes.....');
    this.poolCodes$ = this.poolcodeService.getPoolCodes();
  }

  setClass(event,j, day) {
    console.log(event, j, day);
  }
}
