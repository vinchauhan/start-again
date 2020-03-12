import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pool-code-grid',
  templateUrl: './pool-code-grid.component.html',
  styleUrls: ['./pool-code-grid.component.scss']
})
export class PoolCodeGridComponent implements OnInit {

  constructor() { }

  @Input()
  public cabins

  ngOnInit(): void {
    console.log(this.cabins)
  }

}
