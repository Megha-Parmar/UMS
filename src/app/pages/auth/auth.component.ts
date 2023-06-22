import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    MatGridListModule,
    TranslateModule,
    RouterModule,//.forChild(AuthRoute)
    CommonModule
  ]
})
export class AuthComponent implements OnInit {

  constructor() { }
  today = new Date();

  ngOnInit(): void {

  }

}
