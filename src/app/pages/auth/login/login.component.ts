import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/_service/auth.service';
import { UserService } from 'src/app/core/_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[CommonModule,MatIconModule,MatInputModule,FormsModule,MatButtonModule,MatSnackBarModule,  ],
  providers:[UserService, HttpClientModule,]
  /*
   MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule, */
})
export class LoginComponent implements OnInit {

  public userData = {
    email: '',//'1997meghal@gmail.com',
    password: '',//'Test@123'
  };
  hide = true;
  @ViewChild('loginForm') sampleForm: NgForm;
  response: any;
  constructor(public authService: AuthService, public _snackBar: MatSnackBar, public userService: UserService, private router: Router) { }
  ngOnInit(): void {
    console.info('lifecycle hooks ngOnInit called');

  }

  // submitLogin(form: NgForm) {
  submitLogin() {

    
    if (this.sampleForm.valid) {

      // this.userService.encryptString(form.form.value.password).then((value) => {
      const payload = {
        email: this.sampleForm.form.value.email,
        password: this.sampleForm.form.value.password
      }
      // payload['password'] = value
      payload['password'] = this.userService.encryptUsingAES256(payload['password'])
      this.authService.login(payload).subscribe(response => {

        this.response=response
        if (response.success) {



          if (response.body && response.body.length > 0) {
            this.authService.saveUserDetail(response.body[0]);
            this.router.navigate(['user']);
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
      })

    } else {
      this.sampleForm.form.markAllAsTouched();
    }

  }

}
