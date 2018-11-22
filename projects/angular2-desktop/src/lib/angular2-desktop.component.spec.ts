import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular2DesktopComponent } from './angular2-desktop.component';

describe('Angular2DesktopComponent', () => {
  let component: Angular2DesktopComponent;
  let fixture: ComponentFixture<Angular2DesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Angular2DesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Angular2DesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
