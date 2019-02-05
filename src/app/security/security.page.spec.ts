import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPage } from './security.page';

describe('SecurityPage', () => {
  let component: SecurityPage;
  let fixture: ComponentFixture<SecurityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
