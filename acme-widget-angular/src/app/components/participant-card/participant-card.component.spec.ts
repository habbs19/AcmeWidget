import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ParticipantCardComponent } from './participant-card.component';

describe('ParticipantCardComponent', () => {
  let component: ParticipantCardComponent;
  let fixture: ComponentFixture<ParticipantCardComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {

    const httpStub = jasmine.createSpyObj('HttpClient', ['get','post']);
    const routerStub = jasmine.createSpyObj('routerStub', ['navigate']);
  
    await TestBed.configureTestingModule({
      declarations: [ParticipantCardComponent],
      providers: [
        { provide: HttpClient, useValue: httpStub },
        { provide: Router, useValue: routerStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantCardComponent);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
