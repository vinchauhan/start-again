import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { StartEndDateAction } from '../../actions/startend-date-action';
import { DatePickerInput } from '../../models/datepicker-input';
import { MarketsState } from '../../state/markets-state';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  faCalendar = faCalendar
  startDateInput: DatePickerInput
  endDateInput: DatePickerInput

  constructor(private store: Store) { }

  ngOnInit(): void {
      const today: Date = new Date();
      if(!this.startDateInput || !this.endDateInput) {
        this.startDateInput = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
        this.endDateInput = {year: today.getFullYear(), month: today.getMonth() + 2, day: today.getDate()};
        this.store.dispatch(new StartEndDateAction(this.startDateInput, this.endDateInput))
      }
      
  }

}
