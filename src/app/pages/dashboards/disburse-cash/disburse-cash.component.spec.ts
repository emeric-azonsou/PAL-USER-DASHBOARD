import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisburseCashComponent } from './disburse-cash.component';

describe('DisburseCashComponent', () => {
  let component: DisburseCashComponent;
  let fixture: ComponentFixture<DisburseCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisburseCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisburseCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
