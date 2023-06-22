import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [MatIconModule,
    TranslateModule,
    MatListModule,
    RouterModule]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
