import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

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
  public weekDays;
  public pcStartDate;
  public pcEndDate;

  constructor() { }

  ngOnInit(): void {
    console.log('cabins passed to pool-code-grid' , this.cabins);
    }

}
