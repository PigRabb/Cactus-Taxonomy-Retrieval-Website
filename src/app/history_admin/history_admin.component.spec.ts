/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { History_adminComponent } from './history_admin.component';

describe('History_adminComponent', () => {
  let component: History_adminComponent;
  let fixture: ComponentFixture<History_adminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ History_adminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(History_adminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
