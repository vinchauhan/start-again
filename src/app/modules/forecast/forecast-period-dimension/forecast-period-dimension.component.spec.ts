import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastPeriodDimensionComponent } from './forecast-period-dimension.component';

describe('ForecastPeriodDimensionComponent', () => {
  let component: ForecastPeriodDimensionComponent;
  let fixture: ComponentFixture<ForecastPeriodDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastPeriodDimensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastPeriodDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
