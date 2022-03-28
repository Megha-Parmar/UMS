import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/_service/auth.service';
import { UserService } from 'src/app/core/_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userData = {
    email: '',
    password: ''
  };
  hide = true;
  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    console.info('lifecycle hooks ngOnInit called');

  }

  submitLogin(form: NgForm) {

    if (form.form.valid) {

      // this.userService.encryptString(form.form.value.password).then((value) => {

      const payload = {
        email: form.form.value.email,
        password: form.form.value.password
      }
      // payload['password'] = value
      payload['password'] = this.userService.encryptUsingAES256(payload['password'])

      this.authService.login(payload).subscribe(response => {

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
      form.form.markAllAsTouched();
    }

  }

}
