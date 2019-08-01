import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTrustPage } from './apptrust.page';

describe('AppTrustPage', () => {
  let component: AppTrustPage;
  let fixture: ComponentFixture<AppTrustPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTrustPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTrustPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
