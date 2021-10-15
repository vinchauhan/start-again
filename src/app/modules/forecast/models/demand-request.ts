import { CustomCompare } from "./custom-compare";
import { FlowsPos } from "./flows-pos";
import { Timebands } from "./timebands";
import {PosStateModel} from '../../../shared/models/pos';

export interface DemandRequest {
    cabin: string;
    compare?: CustomCompare;
    flows: FlowsPos[];
    fromDate: string;
    market: string;
    pos: PosStateModel[];
    scope: string;
    timeband?: Timebands[];
    dimensionType?: string;
    toDate: string;
    yearsBack: number;
}
