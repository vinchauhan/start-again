export interface ForecastHistoricalResponse {
  date: string;
  demand: number;
  dow: number;
  flightCounts: number;
  pool: number;
  fcstSource: string;
}
