import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { ssoMockUser } from '@common/GlobalConstants';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@service/auth.service';
import { EncryptDecryptService } from '@service/encrypt-decrypt.service';
import { UserService } from '@service/user.service';
import { take } from 'rxjs/operators';
import { LoginActions } from 'src/app/store/actions/login.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, MatInputModule, FormsModule, MatButtonModule, SocialLoginModule, GoogleSigninButtonModule],
  // providers: [UserService, HttpClientModule,]

  providers: [
    UserService, HttpClientModule,
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '29112588479-ht3n7feeu4l94s6sgd61038qr2218te5.apps.googleusercontent.com'
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
})
export class LoginComponent implements OnInit {

  public userData = {
    email: '',//'1997meghal@gmail.com',
    password: '',//'Test@123'
  };
  hide = true;

  private accessToken = '';
  @ViewChild('loginForm') sampleForm: NgForm;
  response: any;
  constructor(private encryptDecryptService: EncryptDecryptService, private sAuthService: SocialAuthService, private readonly store: Store, public authService: AuthService, public _snackBar: MatSnackBar, public userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.sAuthService.authState.pipe(take(1)).subscribe((user) => {
      console.log("user", user)
      const payload = {
        ...ssoMockUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.firstName.substring(0, 4) + user.lastName.charAt(0)
      }

      // this.encryptDecryptService.setEncryptedLocalStorage(GlobalConstants.token, user.idToken);
      // this.encryptDecryptService.setEncryptedLocalStorage(GlobalConstants.user, user);

      this.authService.ssoLoginSave(payload).subscribe(response => {
        console.log("respo", response);
        this.response = response
        if (response.success) {



          if (response?.body) {
            this.authService.saveUserDetail(response.body);
            this.store.dispatch(LoginActions.loginSuccess({ user: response.body }));
            this.router.navigate(['']); //redirected to dashboard
            this._snackBar.open('Login successfully.', 'close', {
              duration: 3000,
            });
          } else {
            this._snackBar.open('Please enter valid email or password', 'close', {
              duration: 3000,
            });
          }

        } else {
          this._snackBar.open('Please enter valid email or password ', 'close', {
            duration: 3000,
          });
        }

        // });
      }, err => {
        console.log("err", err);

        this.store.dispatch(LoginActions.loginFailure(err));
        this._snackBar.open(err.error.message, 'close', {
          duration: 3000,
        });
      })
      // this.user = user;
      // this.loggedIn = (user != null);
    });

  }
  refreshToken(): void {
    this.sAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  getAccessToken(): void {
    this.sAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  // getGoogleCalendarData(): void {
  //   if (!this.accessToken) return;

  //   this.httpClient
  //     .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  //       headers: { Authorization: `Bearer ${this.accessToken}` },
  //     })
  //     .subscribe((events) => {
  //       alert('Look at your console');
  //       console.log('events', events);
  //     });
  // }

  // loginWithGoogle(): void {

  //   this.sAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).

  //     then(() => this.router.navigate(['/']));

  // }
  // refreshUserToken() {
  //   this.sAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(() => {
  //     // Any post-refresh actions if needed
  //   });
  // }

  signInWithFB(): void {
    this.sAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle(): void {
    try {
      this.sAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } catch (err) {
      console.log("err ==> ", err)
    }
  }
  signOut(): void {
    this.sAuthService.signOut();
  }

  // submitLogin(form: NgForm) {
  submitLogin() {


    if (this.sampleForm.valid) {

      // this.userService.encryptString(form.form.value.password).then((value) => {
      const payload = {
        email: this.sampleForm.form.value.email,
        password: this.sampleForm.form.value.password,
        // loginType: UserLoginType.Register
      }
      // payload['password'] = value
      // payload['password'] = this.userService.encryptUsingAES256(payload['password'])
      this.authService.login(payload).subscribe(response => {

        this.response = response
        if (response.success) {



          if (response?.body.user) {
            this.authService.saveUserDetail(response.body);
            this.store.dispatch(LoginActions.loginSuccess({ user: response.body }));
            this.router.navigate(['']); //redirected to dashboard
            this._snackBar.open('Login successfully.', 'close', {
              duration: 3000,
            });
          } else {
            this._snackBar.open('Please enter valid email or password', 'close', {
              duration: 3000,
            });
          }

        } else {
          this._snackBar.open('Please enter valid email or password ', 'close', {
            duration: 3000,
          });
        }

        // });
      }, err => {

        this.store.dispatch(LoginActions.loginFailure(err));
        this._snackBar.open(err.error.message, 'close', {
          duration: 3000,
        });
      })

    } else {
      this.sampleForm.form.markAllAsTouched();
    }

  }



}
