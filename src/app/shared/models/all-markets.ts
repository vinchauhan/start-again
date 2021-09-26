import { OriginDestination } from "./origin-destination";

export interface AllMarkets {
    alpha: OriginDestination[],
    directional: OriginDestination[],
    spokes: OriginDestination[]
}