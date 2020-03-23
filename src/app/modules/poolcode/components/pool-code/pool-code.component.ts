import { PoolCodesRes } from './../../model/pool-code.response';
import { element } from 'protractor';
import { PcDate } from './../../model/pcDate';
import { Component, OnInit } from '@angular/core';
import {PoolcodeService} from '../../service/poolcode.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-pool-code',
  templateUrl: './pool-code.component.html',
  styleUrls: ['./pool-code.component.scss']
})

export class PoolCodeComponent implements OnInit {
  poolCodes$: Observable<any>;
  pcDates$: Observable<PcDate[]>;
  comparePcDates$: Observable<PcDate[]>;
  poolCodes;
  startDateDow;
  loading = true;
  startDate =  '2020-06-06';
  endDate = '2021-04-11';
  pcDates: PcDate[] = [];
  pcDateGridData = [];
  weeks;
  selectedCabinsData = [
    {
      cabinType: 'Y',
      cabinName: 'Economy'
    },
    {
      cabinType: 'B',
      cabinName: 'Business'
    },
    {
      cabinType: 'F',
      cabinName: 'Fashion'
    }
  ];
  constructor(private poolcodeService: PoolcodeService) { }

  ngOnInit(): void {

    // First thing is to load the poolCode data from backend to initialize variables
    this.loadPoolCodes();
    // Then create the pcDateGridData with defaults
    // a. This involves creating and array of pcDates with default
    moment().isoWeekday();
    let start = moment(this.startDate, 'YYYY-MM-DD');
    this.startDateDow = start.day();
    // console.log('start', start.day());
    const end = moment(this.endDate, 'YYYY-MM-DD');
    this.weeks = moment.duration(end.diff(start)).asWeeks();
    // Initial array of PcDate to be contructed with defaults
    const pcDates: PcDate[] = [];
    while (!start.isAfter(end)) {
        const pcDate = new PcDate();
        pcDate.pcDate = start.format('YYYY-MM-DD');
        pcDate.poolCode = 'M';
        pcDates.push(pcDate);
        start = start.add(1, 'days');
    }

    // b. Then modify the default pcDates array created to assign the onces received from backend.
    this.pcDates$.subscribe(res => {
      this.loading = false;
      res.forEach(pcDate => {
      _.assign(pcDates, pcDates.map(el => el.pcDate === pcDate.pcDate ? pcDate : el ));
      });

      // Create the pcDateGridData now within the observable block
      let pcDatesRow = [];
      pcDates.forEach((el, index) => {
      const momentElement = moment(el.pcDate, 'YYYY-MM-DD');
      if ((momentElement.day()) % 7 === 0) {
        // console.log('adding to griddata', pcDatesRow);
        pcDatesRow.push(el);
        this.pcDateGridData.push(pcDatesRow);
        pcDatesRow = [];
      } else {
        // console.log('Adding to pcDatesRow', element);
        pcDatesRow.push(el);
        // console.log(pcDatesRow);
      }
    });
  });
    console.log('pcDateGridData : ', this.pcDateGridData);
  }
  public loadPoolCodes() {
    console.log('loading poolCodes.....');
    this.poolCodes$ = this.poolcodeService.getPoolCodesAsync();
    this.pcDates$ = this.poolCodes$
                        .pipe(
                          map(codes => codes.pcDates)
                        );
    this.comparePcDates$ = this.poolCodes$
    .pipe(
      map(codes => codes.comparisonPcDates)
    );
    this.pcDates$.subscribe(pcDate => {
      // console.log(pcDate);
    });
  }

  setClass(event, j, day) {
    console.log(event, j, day);
  }
}
