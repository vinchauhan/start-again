import { TestBed } from '@angular/core/testing';

import { MarketService } from './market.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ALL_MARKETS} from '../../../test-data/all-markets';
import {environment} from '../../../environments/environment';

describe('MarketServiceService', () => {
  let marketService: MarketService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarketService]
    });
    marketService = TestBed.inject(MarketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(marketService).toBeTruthy();
  });

  it('should return all markets', () => {
    marketService.getMarkets()
      .subscribe((markets) => {
        expect(markets).toBeTruthy('No markets returned');
      });
    const req = httpTestingController.expectOne(r => r.url === environment.allMarkets);
    expect(req.request.method).toEqual('GET');
    req.flush({payload: ALL_MARKETS});
  });
});
