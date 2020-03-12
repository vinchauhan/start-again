import { Component, OnInit } from '@angular/core';
import {PoolcodeService} from '../../service/poolcode.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pool-code',
  templateUrl: './pool-code.component.html',
  styleUrls: ['./pool-code.component.scss']
})
export class PoolCodeComponent implements OnInit {
  poolCodes$: Observable<any>;
  selectedCabinsData = [
    {
      cabinType: 'Y',
      cabinName: 'Economy'
    },
    {
      cabinType: 'B',
      cabinName: 'Business'
    }
  ]
  constructor(private poolcodeService: PoolcodeService) { }

  ngOnInit(): void {
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
