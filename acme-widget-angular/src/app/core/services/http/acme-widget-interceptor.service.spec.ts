import { TestBed } from '@angular/core/testing';

import { AcmeWidgetInterceptorService } from './acme-widget-interceptor.service';

describe('AcmeWidgetInterceptorService', () => {
  let service: AcmeWidgetInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcmeWidgetInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
