import { Observable } from 'rxjs';
import {Component, OnInit, Input, AfterViewInit, OnChanges, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import { PcDate } from '../../model/pcDate';
import {CabinCodes} from '../../model/cabin-codes';

@Component({
  selector: 'pool-code-grid',
  templateUrl: './pool-code-grid.component.html',
  styleUrls: ['./pool-code-grid.component.scss']
})
export class PoolCodeGridComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  public cabins;
  @Input()
  public poolGridDataWithCabins: CabinCodes[];
  @Input()
  public pcDateGridData;
  @Input()
  public startDateDow;
  @Input()
  public selectedPoolCode

  @Output()
  applyPoolCode = new EventEmitter();
  public weekDays;
  public pcStartDate;
  public pcEndDate;
  public padNumbers;
  public daysHeader = [];
  loading = true;
  constructor() {
    this.daysHeader = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
   }
  ngOnInit() {
    console.log('startDateDow', this.startDateDow);
    this.padNumbers = Array(this.startDateDow - 1).fill(0).map((x, i) => i);
    console.log('cabins passed to pool-code-grid' , this.cabins);
    console.log('pcDateGridData passed to pool-code-grid-component is :', this.pcDateGridData);
  }
  ngOnChanges() {
    console.log('OnChanges of child fired');
    console.log(this.selectedPoolCode);
  }
  ngAfterViewInit(): void {
    this.loading = false;
  }

  applyClassForPoolCode(cabinCode, pcDate, event, rowNumber) {
    // console.log(event.target.className);
    console.log(event.target.id);
    // pcDate.poolCode = this.selectedPoolCode;
    // pcDate.dataSource = 'Y';
    event.target.className = 'button-' + this.selectedPoolCode.toLowerCase();
    console.log(event.target.className);
    console.log(pcDate);
    const newPcDate = new PcDate();
    newPcDate.pcDate = pcDate.pcDate;
    newPcDate.cabinCode = cabinCode;
    newPcDate.poolCode = this.selectedPoolCode;
    newPcDate.dataSource = 'N';
    console.log('modified pcDate', newPcDate);
    this.applyPoolCode.emit({
      originated : event.target.id,
      newPcDate
    });
  }

  checkEndOfWeek(date: string, index) {
    const momentElement = moment(date, 'YYYY-MM-DD');
    if (index < 7) {
      console.log('index is less than 7 returning true');
      return true;
    } else if ((momentElement.day()) % 7 === 0) {
      return true;
    } else {
      return false;
    }
  }
}
