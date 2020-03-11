import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolCodeComponent } from './pool-code.component';

describe('PoolCodeComponent', () => {
  let component: PoolCodeComponent;
  let fixture: ComponentFixture<PoolCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
