import { DatePickerInput } from '../models/datepicker-input';

export class EndDateAction {
    static readonly type = '[End Date Selected] User clicked new endDate';
    endDate: DatePickerInput;
    constructor(endDate: DatePickerInput) {
        this.endDate = endDate;
    }
}
