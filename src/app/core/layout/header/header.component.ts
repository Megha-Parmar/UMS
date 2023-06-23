import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { routerURLConstant } from '@common/GlobalConstants';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageService } from '@service/local-storage.service';
import { LoginActions } from 'src/app/store/actions/login.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule, TranslateModule
  ],
  // exportAs:[`HeaderComponent`]
})
export class HeaderComponent implements OnInit {

  constructor(private readonly store: Store, private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    this.localStorageService.clear();
    this.store.dispatch(LoginActions.logoutSuccess())
    this.router.navigate([`${routerURLConstant.auth}/${routerURLConstant.login}`]);
  }
}
