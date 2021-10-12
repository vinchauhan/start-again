import { Component, Input, OnInit } from '@angular/core';
import { DemandService } from 'src/app/shared/services/demand.service';
import { DemandRequest } from '../models/demand-request';

@Component({
  selector: 'app-forecast-demand',
  templateUrl: './forecast-demand.component.html',
  styleUrls: ['./forecast-demand.component.scss']
})
export class ForecastDemandComponent implements OnInit {

  @Input() forecastDemandInput: DemandRequest;
  demandResponse$;
  forecastDemandResponse;
  // Day, Week & Month
	differentView = [
		{'key': 'day', 'value': 'Day', 'isChecked': true},
		{'key': 'week', 'value': 'Week', 'isChecked': false},
		{'key': 'month', 'value': 'Month', 'isChecked': false}
	];
  scope = 'day';
	isScope = {day: true, week: true, month: true};
  constructor(private demandService: DemandService) { }
  ngOnInit(): void {
    console.log('ngOnInit | ForecastDemandComponent', this.forecastDemandInput);
    // this.demandService.getDemand(this.forecastDemandInput).subscribe((result) => {
    //   console.log('demandService.getDemand', result);
    //   this.forecastDemandResponse = result;
    // });
  }

  onScopeChange(scope) {

  }

}
