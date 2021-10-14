import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EndDateAction } from '../../actions/enddate-action';
import { StartDateAction } from '../../actions/startdate-action';
import { DatePickerInput } from '../../models/datepicker-input';
import { MarketsState, MarketStateModel } from '../../state/markets-state';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, AfterViewInit {

  faCalendar = faCalendar;
  @Select(MarketsState) marketState$: Observable<MarketStateModel>;

  startDateInput: DatePickerInput;
  endDateInput: DatePickerInput;

  constructor(private store: Store) {}

  ngOnInit(): void {
      console.log('ngInit', this.startDateInput)

      this.marketState$.subscribe((state) => {
        this.startDateInput = state.startDateInput;
        this.endDateInput = state.endDateInput;
      });

      // const today: Date = new Date();
      // if(!this.startDateInput || !this.endDateInput) {
      //   console.log('initialize datepicket to todays')
      //   this.startDateInput = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
      //   this.endDateInput = {year: today.getFullYear(), month: today.getMonth() + 2, day: today.getDate()};
      //   this.store.dispatch(new StartEndDateAction(this.startDateInput, this.endDateInput))
      // }
  }

  ngAfterViewInit(): void {

  }

  onStartDateSelect(event) {
    console.log(event);
    const newStartDate: DatePickerInput = event;
    this.store.dispatch(new StartDateAction(newStartDate));
  }

  onEndDateSelect(event) {
    console.log(event);
    const newEndDate: DatePickerInput = event;
    this.store.dispatch(new EndDateAction(newEndDate));
  }


  resetDates() {

  }

  openTimeBandModal() {

  }
}
