import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/core/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
import { SidebarComponent } from 'src/app/core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  standalone:true,
  imports:[ 
    CommonModule,
   HeaderComponent,
   FooterComponent,
    RouterModule,
    MatSidenavModule,
    SidebarComponent
  ]
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.info('lifecycle hooks ngOnInit called');

  }

}
