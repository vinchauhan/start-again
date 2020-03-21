import { PcDate } from './pcDate';

export class PoolCodesRes {
market: string;
fromDate: string;
toDate: string;
comparisonFromDate: string;
comparisonToDate: string;
cabinCode: string;
pcDates: PcDate[];
comparisonPcDates: PcDate[];
}