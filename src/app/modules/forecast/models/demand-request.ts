import { CustomCompare } from "./custom-compare";
import { FlowsPos } from "./flows-pos";
import { Timebands } from "./timebands";

export interface DemandRequest {
    cabin: string;
    compare?: CustomCompare;
    flows: FlowsPos[];
    fromDate: string;
    market: string;
    pos: FlowsPos[];
    scope: string;
    timeband?: Timebands[]
    dimensionType?: string;
    toDate: string;
    yearsBack: number;
}