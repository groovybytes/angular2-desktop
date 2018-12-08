import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeothercomponentComponent } from './someothercomponent.component';

describe('SomeothercomponentComponent', () => {
  let component: SomeothercomponentComponent;
  let fixture: ComponentFixture<SomeothercomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomeothercomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeothercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
