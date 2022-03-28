import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }
  today = new Date();

  ngOnInit(): void {
    console.info('lifecycle hooks ngOnInit called');
  }

}
