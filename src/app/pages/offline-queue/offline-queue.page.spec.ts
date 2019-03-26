import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineQueuePage } from './offline-queue.page';

describe('OfflineQueuePage', () => {
  let component: OfflineQueuePage;
  let fixture: ComponentFixture<OfflineQueuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineQueuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineQueuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
