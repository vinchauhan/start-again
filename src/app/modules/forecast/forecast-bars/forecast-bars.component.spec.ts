import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastBarsComponent } from './forecast-bars.component';

describe('ForecastBarsComponent', () => {
  let component: ForecastBarsComponent;
  let fixture: ComponentFixture<ForecastBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
