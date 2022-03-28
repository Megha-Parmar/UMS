import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/_service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: ['routerAnimations']
})
export class AppComponent {
  title = 'UMS';

  constructor(private location: PlatformLocation, private authService: AuthService, private router: Router) {

    location.onPopState(() => {

      if (this.authService.getUserDetail()) {
        // console.log(this.router.url);
        if (this.router.url == '/user') {
          location.forward()
        }

      }
    });
  }
}
