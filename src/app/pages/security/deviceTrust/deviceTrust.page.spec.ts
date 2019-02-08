import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTrustPage } from './deviceTrust.page';

describe('deviceTrustPage', () => {
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
