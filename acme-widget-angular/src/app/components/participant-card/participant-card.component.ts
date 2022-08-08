import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityForm, ActivityFormAdapter } from 'src/app/core/models/activityForm.model';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-participant-card',
  templateUrl: './participant-card.component.html'
})
export class ParticipantCardComponent implements OnInit {

  @Input() activityForm: ActivityForm | undefined
  @Input() formId: number | null | undefined

  constructor(
    private actService: ActivityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  delete() {
    let id: number = -1
    if (this.formId) {
      id = this.formId
    }
    this.actService.deleteParticipant(id).subscribe(res => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['home/participants']);
    })
  }

}

