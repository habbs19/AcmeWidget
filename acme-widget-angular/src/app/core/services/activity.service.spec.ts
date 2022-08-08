import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ActivityService } from './activity.service';

describe('ActivityService', () => {
  let service: ActivityService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {

    const httpStub = jasmine.createSpyObj('HttpClient', ['get','post']);

    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue:httpStub }]
    });
    service = TestBed.inject(ActivityService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });
});
