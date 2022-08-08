import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  isRegistered: boolean = false;

  constructor(
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    this.isRegistered = this.activityService.isRegistered()
  }

  signup() {
    this.activityService.setRegistered()
    this.ngOnInit()
  }

}
