import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_service/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ CommonModule,
    MatToolbarModule,
    MatIconModule
  ],
  // exportAs:[`HeaderComponent`]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.info('lifecycle hooks ngOnInit called');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
