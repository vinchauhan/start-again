import { OriginDestination } from './origin-destination';

export interface HubtoSpokeMarkets {
    spoke: string;
    markets: OriginDestination[];
}

export interface UserMarkets {
    spokes: HubtoSpokeMarkets;
    alpha: OriginDestination[];
    directional: OriginDestination[];
}
