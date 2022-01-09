import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTransfersComponent } from './confirm-transfers.component';

describe('ConfirmTransfersComponent', () => {
  let component: ConfirmTransfersComponent;
  let fixture: ComponentFixture<ConfirmTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
