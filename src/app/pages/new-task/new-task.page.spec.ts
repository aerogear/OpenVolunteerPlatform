import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskPage } from './new-task.page';

describe('NewItemPage', () => {
  let component: NewTaskPage;
  let fixture: ComponentFixture<NewTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
