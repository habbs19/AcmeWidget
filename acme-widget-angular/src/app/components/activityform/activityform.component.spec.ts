import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder,FormControl,FormGroup,Validators  } from '@angular/forms';
import { ActivityService } from 'src/app/core/services/activity.service';

import { ActivityformComponent } from './activityform.component';
import { Activity, ActivityAdapter } from 'src/app/core/models/activity.model';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { ActivityForm } from 'src/app/core/models/activityForm.model';


describe('ActivityformComponent', () => {
  let component: ActivityformComponent;
  let fixture: ComponentFixture<ActivityformComponent>;
  let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
  let actServiceSpy: jasmine.SpyObj<ActivityService>;
  let routerSpy : jasmine.SpyObj<ActivityService>;
  
  beforeEach(async () => {
    const builderStub = jasmine.createSpyObj('FormBuilder', ['group']);
    const actServiceStub = jasmine.createSpyObj('ActivityService', ['getActivities','signup']);
    const routerStub = jasmine.createSpyObj('routerStub', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ActivityformComponent],
      providers: [
        { provide: FormBuilder, useValue: builderStub },
        { provide: ActivityService, useValue: actServiceStub },
        { provide: Router, useValue: routerStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityformComponent);
    actServiceSpy = TestBed.inject(ActivityService) as jasmine.SpyObj<ActivityService>;
    formBuilderSpy = TestBed.inject(FormBuilder) as jasmine.SpyObj<FormBuilder>;
    
    const list = [
      {
        name: 'DodgeBall',
        type: 1
      },
      {
        name: 'Painting',
        type: 2
      }
    ] as Activity[]
    actServiceSpy.getActivities.and.returnValue(of(list));
    component = fixture.componentInstance;

    const form = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.pattern(/^.+@.+$/)]),
      activity: new FormControl(-1,Validators.required),
      comments: new FormControl('',Validators.maxLength(200))
    })
    component.activityForm = form
    fixture.detectChanges();

  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });

  it('get activities', () => {
    let activityList: Activity[] = [
      { name: 'Activity1', type: 1 },
      { name: 'Activity2', type: 2 },
      { name: 'Activity3', type: 3 },
    ]
    actServiceSpy.getActivities.and.returnValue(of(activityList))   
    component.ngOnInit()
    expect(component.activities.length).toBe(3);
  });

});


