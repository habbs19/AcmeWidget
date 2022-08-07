import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcitivityService } from 'src/app/core/services/acitivity.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isRegistered: boolean = false;

  constructor(
    private activityService: AcitivityService,
  ) { }

  ngOnInit(): void {
    this.isRegistered = this.activityService.isRegistered()
  }

  signup() {
    this.activityService.setRegistered()
    this.ngOnInit()
  }

}
