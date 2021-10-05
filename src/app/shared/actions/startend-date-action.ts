import { DatePickerInput } from "../models/datepicker-input";

export class StartEndDateAction {
    static readonly type = '[Load Dates] Default Start and End Dates';
    startDate: DatePickerInput;
    endDate: DatePickerInput
    constructor(startDate: DatePickerInput, endDate: DatePickerInput){
        this.startDate = startDate;
        this.endDate = endDate;
    }
}