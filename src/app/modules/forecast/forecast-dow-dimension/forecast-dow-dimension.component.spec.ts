import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDowDimensionComponent } from './forecast-dow-dimension.component';

describe('ForecastDowDimensionComponent', () => {
  let component: ForecastDowDimensionComponent;
  let fixture: ComponentFixture<ForecastDowDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastDowDimensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDowDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
