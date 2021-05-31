import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpTransactionComponent } from './top-up-transaction.component';

describe('TopUpTransactionComponent', () => {
  let component: TopUpTransactionComponent;
  let fixture: ComponentFixture<TopUpTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
