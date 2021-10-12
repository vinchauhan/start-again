import { CompareSelectedDates } from "./compare-selected-dates";
import { Timebands } from "./timebands";

export interface CustomCompare {
    dates: CompareSelectedDates[];
    market: string;
    timebands: Timebands;
}