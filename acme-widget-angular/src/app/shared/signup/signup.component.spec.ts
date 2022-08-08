import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivityService } from 'src/app/core/services/activity.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let activityServiceSpy: jasmine.SpyObj<ActivityService>;
  
  beforeEach(async () => {
    const actServiceStub = jasmine.createSpyObj('ActivityService', ['isRegistered','setRegistered']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: ActivityService, useValue: actServiceStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    activityServiceSpy = TestBed.inject(ActivityService) as jasmine.SpyObj<ActivityService>;
    activityServiceSpy.isRegistered.and.returnValue(false);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click new signup, registered should be false', () => {
    expect(component.isRegistered).toBe(false);
  });

  it('visit page when registered', () => {
    activityServiceSpy.isRegistered.and.returnValue(true);
    component.ngOnInit()
    expect(component.isRegistered).toBe(true);
  });

});
