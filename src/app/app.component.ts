import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule,
    // CommonModule,
  ],
  // providers: [AuthService, HttpClient]
  // animations: ['routerAnimations']
})
export class AppComponent {
  title = 'UMS';

  constructor() { }
}
