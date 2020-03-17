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
  public pcDates: PcDate[];
  @Input()
  public weeks;
  public weekDays;
  public pcStartDate;
  public pcEndDate;
  public daysHeader = [];
  constructor() {
    this.daysHeader = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
   }

  ngOnInit(): void {
    console.log('cabins passed to pool-code-grid' , this.cabins);
    }

}
