import { PcDate } from './../../model/pcDate';
import { Component, OnInit } from '@angular/core';
import {PoolcodeService} from '../../service/poolcode.service';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';
import {PoolCodesReq} from '../../model/pool-code.request';
import {CabinCodes} from '../../model/cabin-codes';
import {PoolCodeGridData} from '../../model/pool-code-grid-data';
import {PcdateRow} from '../../model/pcdate-row';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-pool-code',
  templateUrl: './pool-code.component.html',
  styleUrls: ['./pool-code.component.scss']
})

export class PoolCodeComponent implements OnInit {
  poolCodes$: Observable<any>;
  pcDates$: Observable<PcDate[]>;
  comparePcDates$: Observable<PcDate[]>;
  initPoolCodeGridDataArray: PoolCodeGridData[] = [];
  poolCodeGridDataArray: PoolCodeGridData[] = [];
  startDateDow;
  initialPcDates: PcDate[] = [];
  initialComparePcDates: PcDate[] = [];
  loading = true;
  startDate =  '2020-04-11';
  endDate = '2021-04-11';
  startComparePcDate = moment(this.startDate).subtract(1, 'year').format('YYYY-MM-DD');
  endComparePcDate = moment(this.endDate).subtract(1, 'year').format('YYYY-MM-DD');
  pcDates: PcDate[] = [];
  comparePcDates: PcDate[] = [];
  pcDateGridData = [];
  poolGridDataWithCabins: CabinCodes[] = [];
  weeks;
  pcDatesOnScreen;
  comparePcDatesOnScreen;
  changedPcDates: PcDate[] = [];
  changedComparePcDates: PcDate[] = [];
  selectedCabinsData = [
    {
      cabinType: 'Y',
      cabinName: 'Economy'
    },
    {
      cabinType: 'C',
      cabinName: 'Business'
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
  selectedPoolCode;
  constructor(private poolcodeService: PoolcodeService) {
  }

  ngOnInit(): void {
    // Initialize PcDates Array with default poolCode
    this.initializePcDatesArray();
    // Initialize comparePcDates Array with default poolCodes
    this.initializeComparePcDatesArray();
    // Initialize poolCodeGridArrayWithCabins
    this.initializePoolCodeGridArrayWithCabins();
    // load data from the backend.
    this.loadPoolCodes();
  }

  initializePcDatesArray() {
    moment().isoWeekday();
    let start = moment(this.startDate, 'YYYY-MM-DD');
    this.startDateDow = start.day();
    const end = moment(this.endDate, 'YYYY-MM-DD');
    this.weeks = moment.duration(end.diff(start)).asWeeks();
    // Initial array of PcDate to be constructed with defaults
    while (!start.isAfter(end)) {
      const pcDate = new PcDate();
      pcDate.pcDate = start.format('YYYY-MM-DD');
      pcDate.poolCode = 'M';
      this.initialPcDates.push(pcDate);
      start = start.add(1, 'days');
    }
    // console.log('initialPcDates', this.initialPcDates);
  }

  initializeComparePcDatesArray() {
    let startComparePcDate = moment(this.startComparePcDate, 'YYYY-MM-DD');
    const endComparePcDate = moment(this.endComparePcDate, 'YYYY-MM-DD');
    this.weeks = moment.duration(endComparePcDate.diff(startComparePcDate)).asWeeks();
    // Initial array of PcDate to be contructed with defaults
    while (!startComparePcDate.isAfter(endComparePcDate)) {
      const pcDate = new PcDate();
      pcDate.pcDate = startComparePcDate.format('YYYY-MM-DD');
      pcDate.poolCode = 'M';
      this.initialComparePcDates.push(pcDate);
      startComparePcDate = startComparePcDate.add(1, 'days');
    }
    // console.log('initialComparePcDates', this.initialComparePcDates);
  }

  initializePoolCodeGridArrayWithCabins() {
    this.selectedCabinsData.forEach(cabin => {
      const poolCodeGridData: PoolCodeGridData = new PoolCodeGridData();
      poolCodeGridData.cabinCode = cabin.cabinType;
      const pcdateRow = new PcdateRow();
      pcdateRow.pcDate = [];
      poolCodeGridData.pcdateRows = [];
      poolCodeGridData.comparePcDateRows = [];
      this.initialPcDates.forEach((el, index) => {
        const momentElement = moment(el.pcDate, 'YYYY-MM-DD');
        if ((momentElement.day()) % 7 === 0) {
          pcdateRow.pcDate.push(el);
          poolCodeGridData.pcdateRows.push(Object.assign({}, pcdateRow));
          pcdateRow.pcDate = [];
        } else {
          pcdateRow.pcDate.push(el);
        }
      });
      const comparePcdateRow = new PcdateRow();
      comparePcdateRow.pcDate = [];
      this.initialComparePcDates.forEach((el, index) => {
        const momentElement = moment(el.pcDate, 'YYYY-MM-DD');
        if ((momentElement.day()) % 7 === 0) {
          comparePcdateRow.pcDate.push(el);
          poolCodeGridData.comparePcDateRows.push(Object.assign({}, comparePcdateRow));
          comparePcdateRow.pcDate = [];
        } else {
          comparePcdateRow.pcDate.push(el);
        }
      });
      this.initPoolCodeGridDataArray.push(poolCodeGridData);
    });
    console.log('Initial pool-code-grid data for each cabin', this.initPoolCodeGridDataArray);
  }
  // paintGrid() {
  //   // Then create the pcDateGridData with defaults
  //   // a. This involves creating an array of pcDates with default
  //   moment().isoWeekday();
  //   let start = moment(this.startDate, 'YYYY-MM-DD');
  //   this.startDateDow = start.day();
  //   // console.log('start', start.day());
  //   const end = moment(this.endDate, 'YYYY-MM-DD');
  //   this.weeks = moment.duration(end.diff(start)).asWeeks();
  //   // Initial array of PcDate to be constructed with defaults
  //   const pcDates: PcDate[] = [];
  //   while (!start.isAfter(end)) {
  //     const pcDate = new PcDate();
  //     pcDate.pcDate = start.format('YYYY-MM-DD');
  //     pcDate.poolCode = 'M';
  //     pcDates.push(pcDate);
  //     // created member variable
  //     this.initialPcDates.push(pcDate);
  //     start = start.add(1, 'days');
  // }
    // console.log('Default pcDates', pcDates);
    // console.log('initialPcDates', this.initialPcDates);
    // // b. Create an array of comparePcDates with default
    // let startComparePcDate = moment(this.startComparePcDate, 'YYYY-MM-DD');
    // const endComparePcDate = moment(this.endComparePcDate, 'YYYY-MM-DD');
    // // this.startDateDow = startComparePcDate.day();
    // // console.log('start', start.day());
    // this.weeks = moment.duration(endComparePcDate.diff(startComparePcDate)).asWeeks();
    // // Initial array of PcDate to be contructed with defaults
    // const comparePcDates: PcDate[] = [];
    // while (!startComparePcDate.isAfter(endComparePcDate)) {
    //   const pcDate = new PcDate();
    //   pcDate.pcDate = startComparePcDate.format('YYYY-MM-DD');
    //   pcDate.poolCode = 'M';
    //   comparePcDates.push(pcDate);
    //   // created member variable
    //   this.initialComparePcDates.push(pcDate);
    //   startComparePcDate = startComparePcDate.add(1, 'days');
    // }
    // console.log('initialComparePcDates', this.initialComparePcDates);
    // // console.log('Default comparePcDates', comparePcDates);
    // // For each Cabin create default pcDates and comparePcDates
    // this.selectedCabinsData.forEach(cabin => {
    //   // console.log('cabins is' + cabin.cabinType);
    //   const cabinCodes: CabinCodes = new CabinCodes();
    //   const poolCodeGridData: PoolCodeGridData = new PoolCodeGridData();
    //   // poolCodeGridData.cabinCode = '';
    //   // poolCodeGridData.pcDates = [];
    //   // poolCodeGridData.comparePcDates = [];
    //   cabinCodes.cabinCode = cabin.cabinType;
    //   poolCodeGridData.cabinCode = cabin.cabinType;
    //   // Object.assign to assign a new copy of pcDates and comparePcDates to each Cabin.
    //   cabinCodes.pcDates = Object.assign([], pcDates);
    //   // let pcDatesRowArray: PcDate[];
    //   // let comparePcDatesRowArray: PcDate[];
    //   const pcdateRow = new PcdateRow();
    //   pcdateRow.pcDate = [];
    //   poolCodeGridData.pcdateRows = [];
    //   poolCodeGridData.comparePcDateRows = [];
    //   this.initialPcDates.forEach((el, index) => {
    //           const momentElement = moment(el.pcDate, 'YYYY-MM-DD');
    //           if ((momentElement.day()) % 7 === 0) {
    //             // console.log('adding to griddata', pcDatesRow);
    //             pcdateRow.pcDate.push(el);
    //             poolCodeGridData.pcdateRows.push(Object.assign([], pcdateRow));
    //             // console.log('poolCodeGridData', poolCodeGridData);
    //             pcdateRow.pcDate = [];
    //           } else {
    //             // console.log('Adding to pcDatesRow', element);
    //             pcdateRow.pcDate.push(el);
    //             // pcDatesRow.push(el);
    //             // console.log(pcDatesRow);
    //           }
    //         });
    //   cabinCodes.comparePcDates = Object.assign([], comparePcDates);
    //   const comparePcdateRow = new PcdateRow();
      // this.initialComparePcDates.forEach((el, index) => {
      //   const momentElement = moment(el.pcDate, 'YYYY-MM-DD');
      //   // const dateRow = new PcdateRow()
      //   comparePcdateRow.pcDate = [];
      //   if ((momentElement.day()) % 7 === 0) {
      //     // console.log('adding to griddata', pcDatesRow);
      //     comparePcdateRow.pcDate.push(el);
      //     poolCodeGridData.comparePcDateRows.push(comparePcdateRow);
      //     comparePcdateRow.pcDate = [];
      //   } else {
      //     // console.log('Adding to pcDatesRow', element);
      //     comparePcdateRow.pcDate.push(el);
      //     // pcDatesRow.push(el);
      //     // console.log(pcDatesRow);
      //   }
      // });
      // this.poolGridDataWithCabins.push(cabinCodes);
      // this.poolCodeGridDataArray.push(poolCodeGridData);
    // });
    // // console.log('Initial pool-code-grid not simplified per cabin', this.poolGridDataWithCabins);
    // console.log('Initial pool-code-grid data for each cabin', this.poolCodeGridDataArray);

    // c. Then modify the default pcDates array created to assign the ones received from backend.
    // this.pcDates$.subscribe(res => {
    //   // this.loading = false;
    //   res.forEach(pcDate => {
    //     // Depending on the cabin inside each pcDate assign the pcDates for the default pcDates of that cabin
    //     console.log(pcDate.cabinCode);
    //     const cabinData = this.poolGridDataWithCabins.find(data => data.cabinCode === pcDate.cabinCode);
    //     console.log('pcDatesForCabin', cabinData);
    //     // tslint:disable-next-line:triple-equals max-line-length
    //     _.assign(cabinData.pcDates, cabinData.pcDates.map(el => ((el.pcDate === pcDate.pcDate) && (pcDate.cabinCode === cabinData.cabinCode)) ? pcDate : el ));
    //     // console.log('pcDatesForCabin 1', cabinData);
    //   });
    //   console.log('final pcDateForEachCabin', this.poolGridDataWithCabins);
    //
    //   // Create the pcDateGridData now within the observable block
    //   let pcDatesRow = [];
    //   pcDates.forEach((el, index) => {
    //     const momentElement = moment(el.pcDate, 'YYYY-MM-DD');
    //     if ((momentElement.day()) % 7 === 0) {
    //       // console.log('adding to griddata', pcDatesRow);
    //       pcDatesRow.push(el);
    //       this.pcDateGridData.push(pcDatesRow);
    //       pcDatesRow = [];
    //     } else {
    //       // console.log('Adding to pcDatesRow', element);
    //       pcDatesRow.push(el);
    //       // console.log(pcDatesRow);
    //     }
    //   });
    // });

    // d. Then modify the default comparePcDates array created to assign the ones received from backend.
    // this.comparePcDates$.subscribe(response => {
    //   this.loading = false;
    //   response.forEach(comparePcDate => {
    //     console.log('comparePcDate', comparePcDate);
    //     // Depending on the cabin inside each pcDate assign the pcDates for the default pcDates of that cabin
    //     console.log(comparePcDate.cabinCode);
    //     const cabinData = this.poolGridDataWithCabins.find(data => data.cabinCode === comparePcDate.cabinCode);
    //     console.log('comparePcDatesForCabin', cabinData.comparePcDates);
    //     // tslint:disable-next-line:triple-equals max-line-length
    //     _.assign(cabinData.comparePcDates, cabinData.comparePcDates.map(el => ((el.pcDate === comparePcDate.pcDate) && (comparePcDate.cabinCode === cabinData.cabinCode)) ? comparePcDate : el ));
    //     console.log('comparePcDatesForCabin 1', cabinData.comparePcDates);
    //   });
    //   console.log('final comparePcDateForEachCabin', this.poolGridDataWithCabins);
    //
    //   // Create the pcDateGridData now within the observable block
    //   // let pcDatesRow = [];
    //   // pcDates.forEach((el, index) => {
    //   //   const momentElement = moment(el.pcDate, 'YYYY-MM-DD');
    //   //   if ((momentElement.day()) % 7 === 0) {
    //   //     // console.log('adding to griddata', pcDatesRow);
    //   //     pcDatesRow.push(el);
    //   //     this.pcDateGridData.push(pcDatesRow);
    //   //     pcDatesRow = [];
    //   //   } else {
    //   //     // console.log('Adding to pcDatesRow', element);
    //   //     pcDatesRow.push(el);
    //   //     // console.log(pcDatesRow);
    //   //   }
    //   // });
    // });
    // console.log('pcDateGridData : ', this.pcDateGridData);
  // }
  public loadPoolCodes() {
    console.log('loading poolCodes.....');
    // this.poolcodeService.getPoolCodesAsync()
    this.poolcodeService.getPoolCodesFromBackend(this.poolCodeReq)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(res => {
        // this.loading = false;
        // console.log(res);
        this.pcDatesOnScreen = res.pcDates;
        this.comparePcDatesOnScreen = res.comparisonPcDates;
        this.repaintWithResponse(res);
      });
    // this.poolCodes$ = this.poolcodeService.getPoolCodesAsync();
    // this.pcDates$ = this.poolCodes$
    //   .pipe(
    //     map(codes => codes.pcDates)
    //   );
    // this.comparePcDates$ = this.poolCodes$
    //   .pipe(
    //     map(codes => codes.comparisonPcDates)
    //   );
  }

  setClass(event, j, day) {
    console.log(event, j, day);
  }


  somefunction() {
    console.log('someFunction');
  }

  applyPoolCode() {
    this.poolCodeGridDataArray = [];
    this.loading = true;
    // console.log('changed pcDates', this.pcDatesOnScreen);
    // console.log('changed comparePcDates', this.comparePcDatesOnScreen);
    const updatePoolCodeObj: PoolCodesReq = this.poolCodeReq;
    updatePoolCodeObj.pcDates = this.pcDatesOnScreen;
    updatePoolCodeObj.comparisonPcDates = this.comparePcDatesOnScreen;
    updatePoolCodeObj.actionType = 'apply';
    // console.log('Update pool code object ', updatePoolCodeObj);
    this.poolcodeService.updateAllPoolCodesDate(updatePoolCodeObj)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(res => {
        this.pcDatesOnScreen = res.pcDates;
        this.comparePcDatesOnScreen = res.comparisonPcDates;
        this.repaintWithResponse(res);
      });
  }

  repaintWithResponse(res) {
    // this.poolCodeGridDataArray = [];
    // Collect the initPoolCodeGridDataArray into a temp variable.
    // Initialize PcDates Array again.
    console.log('++++++++++++++++++++++++++++++++++++++', this.initPoolCodeGridDataArray);
    // const tempPoolCodeGridDataArray: PoolCodeGridData[] = [...this.initPoolCodeGridDataArray];
    // const tempPoolCodeGridDataArray: PoolCodeGridData[] = _.cloneDeep(this.initPoolCodeGridDataArray);
    const tempPoolCodeGridDataArray: PoolCodeGridData[] = JSON.parse(JSON.stringify(this.initPoolCodeGridDataArray));
    // const tempPoolCodeGridDataArray = this.initPoolCodeGridDataArray.map(a => Object.assign({}, a));
    console.log(res.pcDates);
    console.log(res.comparisonPcDates);
    // for each pcDates in the response reset the this.poolCodeGridDataArray.pcDatesRow to new value
    res.pcDates.forEach(pcDate => {
      // Depending on the cabin inside each pcDate assign the pcDates for the default pcDates of that cabin
      // console.log(pcDate.cabinCode);
      const cabinData = tempPoolCodeGridDataArray.find(data => data.cabinCode === pcDate.cabinCode);
      // console.log('CabinData structure is : ', cabinData);
      cabinData.pcdateRows.forEach(row => {
        // tslint:disable-next-line:max-line-length
        _.assign(row.pcDate, row.pcDate.map(el => ((el.pcDate === pcDate.pcDate) && (pcDate.cabinCode === cabinData.cabinCode)) ? pcDate : el ));
      });
      // tslint:disable-next-line:triple-equals max-line-length
      // _.assign(cabinData.pcDates, cabinData.pcDates.map(el => ((el.pcDate === pcDate.pcDate) && (pcDate.cabinCode === cabinData.cabinCode)) ? pcDate : el ));
      // console.log('pcDatesForCabin 1', cabinData);
    });

    // for each pcDates in the response reset the this.poolCodeGridDataArray.pcDatesRow to new value
    res.comparisonPcDates.forEach(pcDate => {
      // Depending on the cabin inside each pcDate assign the pcDates for the default pcDates of that cabin
      // console.log(pcDate.cabinCode);
      const cabinData = tempPoolCodeGridDataArray.find(data => data.cabinCode === pcDate.cabinCode);
      // console.log('CabinData structure is : ', cabinData);
      cabinData.comparePcDateRows.forEach(row => {
        // tslint:disable-next-line:max-line-length
        _.assign(row.pcDate, row.pcDate.map(el => ((el.pcDate === pcDate.pcDate) && (pcDate.cabinCode === cabinData.cabinCode)) ? pcDate : el ));
      });
      // tslint:disable-next-line:triple-equals max-line-length
      // _.assign(cabinData.pcDates, cabinData.pcDates.map(el => ((el.pcDate === pcDate.pcDate) && (pcDate.cabinCode === cabinData.cabinCode)) ? pcDate : el ));
      // console.log('pcDatesForCabin 1', cabinData);
    });
    // this.poolCodeGridDataArray = this.initPoolCodeGridDataArray;
    this.poolCodeGridDataArray = tempPoolCodeGridDataArray;
    console.log('final poolCodeGridDataArray', this.poolCodeGridDataArray);
  }
  undoPoolCodes() {
    this.poolCodeGridDataArray = [];
    this.loading = true;
    console.log('undo poolcode');
    const undoPoolCodeReq: PoolCodesReq = this.poolCodeReq;
    undoPoolCodeReq.actionType = 'undo';
    // console.log('Undo pool code object ', undoPoolCodeReq);
    this.poolcodeService.getPoolCodesFromBackend(undoPoolCodeReq)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(res => {
        this.pcDatesOnScreen = res.pcDates;
        this.comparePcDatesOnScreen = res.comparisonPcDates;
        this.repaintWithResponse(res);
      });
  }

  colorSelect(className) {
    console.log(className);
    this.selectedPoolCode = className;
  }

  setComparisonValues(event) {
    console.log(event);
  }

  assignPoolCodeToOriginal(event) {
    console.log('emitted pcDate from child to parent is :', event);
    if (event.originated === 'pcDates') {
      const pcDateFound = this.pcDatesOnScreen.find(value => value.pcDate === event.newPcDate.pcDate);
      if (!pcDateFound) {
        // If existing pcDate was not touched, just add the new pcDate to the existing array
        this.pcDatesOnScreen = [...this.pcDatesOnScreen, event.newPcDate];
      } else {
        // If existing pcDate was touched, assign add the new pcDate to the existing array
        _.assign(this.pcDatesOnScreen, this.pcDatesOnScreen.map(el => el.pcDate === event.newPcDate.pcDate ? event.newPcDate : el));
      }
        // this.changedPcDates.push(event.newPcDate);
    } else {
      const pcDateFound = this.comparePcDatesOnScreen.find(value => value.pcDate === event.newPcDate.pcDate);
      if (!pcDateFound) {
        // If existing pcDate was not touched, just add the new pcDate to the existing array
        this.comparePcDatesOnScreen = [...this.comparePcDatesOnScreen, event.newPcDate];
      } else {
        // If existing pcDate was touched, assign add the new pcDate to the existing array
        // tslint:disable-next-line:max-line-length
        _.assign(this.comparePcDatesOnScreen, this.comparePcDatesOnScreen.map(el => el.pcDate === event.newPcDate.pcDate ? event.newPcDate : el));
      }
      // this.changedComparePcDates.push(event.newPcDate);
    }
  }
}
