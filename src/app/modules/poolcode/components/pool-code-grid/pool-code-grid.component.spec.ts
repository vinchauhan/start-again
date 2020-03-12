import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolCodeGridComponent } from './pool-code-grid.component';

describe('PoolCodeGridComponent', () => {
  let component: PoolCodeGridComponent;
  let fixture: ComponentFixture<PoolCodeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolCodeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolCodeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
