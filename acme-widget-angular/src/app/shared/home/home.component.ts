import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    '.nav-ul {margin: 0;padding: 0;list-style-type: none;display: block;}',
    '.nav-ul > li { display: inline-block;margin: 0 10px;}'
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
