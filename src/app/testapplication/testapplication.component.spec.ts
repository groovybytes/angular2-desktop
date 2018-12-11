import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestapplicationComponent } from './testapplication.component';

describe('TestapplicationComponent', () => {
  let component: TestapplicationComponent;
  let fixture: ComponentFixture<TestapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
