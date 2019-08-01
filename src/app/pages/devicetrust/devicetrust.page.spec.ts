import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTrustPage } from './devicetrust.page';

describe('DeviceTrustPage', () => {
  let component: DeviceTrustPage;
  let fixture: ComponentFixture<DeviceTrustPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTrustPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTrustPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
