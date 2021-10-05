import { DatePickerInput } from "../models/datepicker-input";

export class StartDateAction {
    static readonly type = '[Start Date Selected] User clicked new startDate';
    startDate: DatePickerInput;
    constructor(startDate: DatePickerInput){
        this.startDate = startDate;
    }
}