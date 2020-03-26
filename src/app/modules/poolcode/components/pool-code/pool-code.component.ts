import { PcDate } from './../../model/pcDate';
import { Component, OnInit } from '@angular/core';
import {PoolcodeService} from '../../service/poolcode.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';
import {PoolCodesReq} from '../../model/pool-code.request';

@Component({
  selector: 'app-pool-code',
  templateUrl: './pool-code.component.html',
  styleUrls: ['./pool-code.component.scss']
})

export class PoolCodeComponent implements OnInit {
  poolCodes$: Observable<any>;
  pcDates$: Observable<PcDate[]>;
  comparePcDates$: Observable<PcDate[]>;
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

  poolcodes = [
    {name: 'H1',  pos: 1 , isCurrent: 1 , className: 'button-h1'},
    {name: 'M',   pos: 2 , isCurrent: 1 , className: 'button-m'},
    {name: 'H2',  pos: 3 , isCurrent: 1 , className: 'button-h2'},
    {name: 'H',   pos: 4 , isCurrent: 2 , className: 'button-h'}, // Should display only in selection pod
    {name: 'HX',  pos: 4,  isCurrent: 0 , className: 'button-hx'}, // Should display only in counts pod
    {name: 'H3',  pos: 5 , isCurrent: 1 , className: 'button-h3'},
    {name: 'I',   pos: 6 , isCurrent: 1 , className: 'button-i'},
    {name: 'HL',  pos: 7 , isCurrent: 1 , className: 'button-hl'}
  ];

  poolCodeReq: PoolCodesReq = {
    actionType: 'select',
    market: 'ABE|PHL',
    fromDate: '2020-03-20',
    toDate: '2021-03-19',
    comparisonFromDate: '2019-03-19',
    comparisonToDate: '2020-03-18',
    cabinCode: 'Y|W|C|F',
    pcDates: [],
    comparisonPcDates: [],
    cabins: 'Y|W|C|F'
  };

  constructor(private poolcodeService: PoolcodeService) { }

  ngOnInit(): void {
    // First thing is to load the poolCode data from backend to initialize variables
    // this.loadPoolCodes();
    this.loadPoolCodesFromBackend();
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

  public loadPoolCodesFromBackend() {
    console.log('loading poolCodes.....');
    this.poolCodes$ = this.poolcodeService.getPoolCodesFromBackend(this.poolCodeReq);
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

  somefunction() {
    console.log('someFunction');
  }

  applyPoolCode() {
    console.log('applyPoolCode');
  }

  undoPoolCodes() {
    console.log('undo poolcode');
  }

  colorSelect(className) {
    console.log(className);
  }

}
