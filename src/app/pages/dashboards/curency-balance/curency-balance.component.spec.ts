import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurencyBalanceComponent } from './curency-balance.component';

describe('CurencyBalanceComponent', () => {
  let component: CurencyBalanceComponent;
  let fixture: ComponentFixture<CurencyBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurencyBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurencyBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
