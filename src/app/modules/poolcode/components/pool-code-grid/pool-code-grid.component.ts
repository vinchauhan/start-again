import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { PcDate } from '../../model/pcDate';

@Component({
  selector: 'pool-code-grid',
  templateUrl: './pool-code-grid.component.html',
  styleUrls: ['./pool-code-grid.component.scss']
})
export class PoolCodeGridComponent implements OnInit {

  @Input()
  public cabins;
  @Input()
  public poolCodes;
  @Input()
  public pcDateGridData;
  @Input()
  public startDateDow;
  public weekDays;
  public pcStartDate;
  public pcEndDate;
  public padNumbers;
  
  public daysHeader = [];
  constructor() {
    this.daysHeader = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
   }

  ngOnInit(): void {
    console.log('startDateDow', this.startDateDow);
    this.padNumbers = Array(this.startDateDow - 1).fill(0).map((x, i) => i);
    console.log('cabins passed to pool-code-grid' , this.cabins);
    console.log('pcDateGridData passed to pool-code-grid-component is :', this.pcDateGridData);
    }

}
