import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockInstance, ngMocks } from 'ng-mocks';
import { map, Observable, of } from 'rxjs';
import { ActivityForm, ActivityFormAdapter } from 'src/app/core/models/activityForm.model';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ParticipantsComponent } from './participants.component';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;
  let activityServiceSpy: jasmine.SpyObj<ActivityService>;
  let adapterSpy: jasmine.SpyObj<ActivityFormAdapter>;

  beforeEach(async () => {

    const actServiceStub = jasmine.createSpyObj('ActivityService', ['isRegistered','getAll','getFormId']);
    const formAdapterStub = jasmine.createSpyObj('ActivityFormAdapter', ['adapt']);

    await TestBed.configureTestingModule({
      declarations: [ParticipantsComponent],
      providers: [
        { provide: ActivityService, useValue: actServiceStub },
        { provide: ActivityFormAdapter, useValue: formAdapterStub }
      ],
    })
    .compileComponents();


    fixture = TestBed.createComponent(ParticipantsComponent);
    adapterSpy = TestBed.inject(ActivityFormAdapter) as jasmine.SpyObj<ActivityFormAdapter>;
    activityServiceSpy = TestBed.inject(ActivityService) as jasmine.SpyObj<ActivityService>;
    activityServiceSpy.isRegistered.and.returnValue(false);

    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is registered, get all participants', () => {
    activityServiceSpy.isRegistered.and.returnValue(true);
    activityServiceSpy.getFormId.and.returnValue(1);

    const form = [
      {
        comments: 'thriller',
        activity: {
          name: 'DodgeBall',
          type: 1
        },
        employee: {
          firstName: 'michael',
          lastName: 'jackson',
          emailAddress: 'mj@hotmail.com'
        }
      },
      {
        comments: 'changes',
        activity: {
          name: 'MountainClimbing',
          type: 2
        },
        employee: {
          firstName: 'tupac',
          lastName: 'shakur',
          emailAddress: '2pac@hotmail.com'
        }
      },
    ] as ActivityForm[]
    
    adapterSpy.adapt.and.returnValue(form[0])

    activityServiceSpy.getAll.and.returnValue(of(form))
    component.ngOnInit()

    expect(component.getParticipants().length).toBe(2)

  });
});
