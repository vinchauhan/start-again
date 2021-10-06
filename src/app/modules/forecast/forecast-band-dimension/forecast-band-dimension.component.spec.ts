import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastBandDimensionComponent } from './forecast-band-dimension.component';

describe('ForecastBandDimensionComponent', () => {
  let component: ForecastBandDimensionComponent;
  let fixture: ComponentFixture<ForecastBandDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastBandDimensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastBandDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
