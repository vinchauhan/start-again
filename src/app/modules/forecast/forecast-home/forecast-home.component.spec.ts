import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastHomeComponent } from './forecast-home.component';

describe('ForecastHomeComponent', () => {
  let component: ForecastHomeComponent;
  let fixture: ComponentFixture<ForecastHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
