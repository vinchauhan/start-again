import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastClassDimensionComponent } from './forecast-class-dimension.component';

describe('ForecastClassDimensionComponent', () => {
  let component: ForecastClassDimensionComponent;
  let fixture: ComponentFixture<ForecastClassDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastClassDimensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastClassDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
