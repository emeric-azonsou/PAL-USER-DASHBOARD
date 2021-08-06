/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoBusinessModalComponent } from './no-business-modal.component';

describe('NoBusinessModalComponent', () => {
  let component: NoBusinessModalComponent;
  let fixture: ComponentFixture<NoBusinessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoBusinessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBusinessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
