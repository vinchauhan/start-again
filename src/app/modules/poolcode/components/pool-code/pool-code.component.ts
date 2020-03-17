import { element } from 'protractor';
import { PcDate } from './../../model/pcDate';
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
  pcDates: PcDate[];
  gridData = [];
  weeks;
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
    // moment().startOf('isoWeek');
    moment().isoWeekday();
    let start = moment(this.startDate, 'YYYY-MM-DD');
    console.log('startDate', this.startDate);
    console.log('start', start.day());
    let end = moment(this.endDate, 'YYYY-MM-DD');
    this.weeks = moment.duration(end.diff(start)).asWeeks();
    const pcDates: PcDate[] = [];
    while (!start.isAfter(end)) {
        let pcDate = new PcDate();
        pcDate.pcDate = start.format('YYYY-MM-DD');
        pcDate.poolCode = 'M';
        pcDates.push(pcDate);
        start = start.add(1, 'days');
    }
    let pcDatesRow = [];
    pcDates.forEach((element, index) => {
      const momentElement = moment(element.pcDate, 'YYYY-MM-DD');
      if ((momentElement.day()) % 7 === 0) {
        console.log('adding to griddata', pcDatesRow);
        pcDatesRow.push(element);
        this.gridData.push(pcDatesRow);
        pcDatesRow = [];
      } else {
        console.log('Adding to pcDatesRow', element);
        pcDatesRow.push(element);
        console.log(pcDatesRow);
      }
      // console.log('date', element.pcDate);
      // console.log(momentElement.day());
      // Cleaning array
    });

    console.log('gridData', this.gridData);

    console.log(pcDates);
    this.pcDates = pcDates;
    console.log('Number of weeks between : ', this.weeks);
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
