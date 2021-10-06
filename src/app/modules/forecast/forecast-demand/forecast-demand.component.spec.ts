import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDemandComponent } from './forecast-demand.component';

describe('ForecastDemandComponent', () => {
  let component: ForecastDemandComponent;
  let fixture: ComponentFixture<ForecastDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
