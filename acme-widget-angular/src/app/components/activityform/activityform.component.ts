import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,NgModel } from '@angular/forms';
import { FormBuilder,Validators  } from '@angular/forms';
import { Participant, ParticipantAdapter } from 'src/app/core/models/participant.model';
import { AcitivityService } from 'src/app/core/services/acitivity.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Activity, ActivityAdapter } from 'src/app/core/models/activity.model';
import { ActivityForm } from 'src/app/core/models/activityForm.model';

@Component({
  selector: 'app-activityform',
  templateUrl: './activityform.component.html',
  styleUrls: ['./activityform.component.css']
})
  
export class ActivityformComponent implements OnInit {

  protected activities: Activity[] = []
  
  activityForm = this.fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['',[Validators.required,Validators.pattern(/^.+@.+$/)]],
    activity: [-1,Validators.required],
    comments: ['',Validators.maxLength(200)]
  })

  constructor(private fb: FormBuilder,
    private activityService: AcitivityService,
    private adapter: ActivityAdapter,
    private partAdapter: ParticipantAdapter,
    private router: Router) { }

  ngOnInit(): void {
    this.getActivities().subscribe((res: Activity[]) => {
      this.activities = res
    })
  }

  onClickClear() {
    this.activityForm.reset({activity:-1})
  }
  onSubmit() {
    
    if (!this.activityForm.valid || (typeof this.activityForm.value.activity === 'number' && this.activityForm.value.activity < 0)) {
      this.activityForm.markAllAsTouched()
      return;
    }
    
    const partModel = {
      firstName: this.activityForm.value.firstName,
      lastName: this.activityForm.value.lastName,
      emailAddress: this.activityForm.value.email
    } as Participant
    
    const model = {
      employee: this.partAdapter.adapt(partModel),
      activity: this.adapter.adapt(this.activities[Number(this.activityForm.value.activity)]),
      comments: this.activityForm.value.comments
    } as ActivityForm

    this.activityService.signup(model).subscribe(() => {
      this.activityService.setRegistered(true)
      this.router.navigate(['/home/participants'])     
    },(err:any) => {
      alert(err.error)
    })
  }

  getActivities() {
    return this.activityService.getActivities()
  }

}
