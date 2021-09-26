import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDropdownComponent } from './market-dropdown.component';

describe('AppMarketDropdownComponent', () => {
  let component: MarketDropdownComponent;
  let fixture: ComponentFixture<MarketDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
