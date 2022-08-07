import { TestBed } from '@angular/core/testing';

import { AcitivityService } from './acitivity.service';

describe('AcitivityService', () => {
  let service: AcitivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcitivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
