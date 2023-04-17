import { CommonModule, PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './core/_service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule,
    CommonModule,
  ],
  providers: [AuthService, HttpClient]
  // animations: ['routerAnimations']
})
export class AppComponent {
  title = 'UMS';

  constructor(private location: PlatformLocation, private authService: AuthService, private router: Router) {

    this.location.onPopState(() => {

      if (this.authService.getUserDetail()) {
        // console.log(this.router.url);
        if (this.router.url == '/user') {
          location.forward()
        }

      }
    });
  }
}
