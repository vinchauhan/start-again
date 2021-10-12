import {ForecastHistoricalResponse} from './forecast-historical-response';

export interface ForecastResponse {
  barLabel: string;
  boxLabel: string;
  custom: ForecastHistoricalResponse;
  data: string;
  demand: number;
  dow: number;
  flightCounts: number;
  influenceCounts: number;
  lastMonth: ForecastHistoricalResponse;
  lastNight: ForecastHistoricalResponse;
  lastWeek: ForecastHistoricalResponse;
  lastYear: ForecastHistoricalResponse;
  pool: string;
  pure: number;
  remaining: number;
  selected: boolean;
}
