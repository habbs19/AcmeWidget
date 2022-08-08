import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { ActivityForm, ActivityFormAdapter } from 'src/app/core/models/activityForm.model';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html'
})
export class ParticipantsComponent implements OnInit {

  protected isRegistered: boolean = false
  protected participants : ActivityForm[] = []
  protected formId: number | null | undefined

  constructor(
    private activityService: ActivityService,
    private formAdapter: ActivityFormAdapter,
  ) {}

  ngOnInit(): void {
    this.isRegistered = this.activityService.isRegistered()

    if (this.isRegistered) {
      this.activityService.getAll().subscribe(res => {
        this.participants = res.map(p => this.formAdapter.adapt(p))
      })
      this.formId = this.activityService.getFormId()
    }
    
  }

  getParticipants() {
    return this.participants
  }
}
