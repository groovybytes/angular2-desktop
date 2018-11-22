import { TestBed, inject } from '@angular/core/testing';

import { Angular2DesktopService } from './angular2-desktop.service';

describe('Angular2DesktopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Angular2DesktopService]
    });
  });

  it('should be created', inject([Angular2DesktopService], (service: Angular2DesktopService) => {
    expect(service).toBeTruthy();
  }));
});
