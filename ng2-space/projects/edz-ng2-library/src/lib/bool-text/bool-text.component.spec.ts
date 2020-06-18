/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoolTextComponent } from './bool-text.component';

describe('BoolTextComponent', () => {
  let component: BoolTextComponent;
  let fixture: ComponentFixture<BoolTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoolTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoolTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
