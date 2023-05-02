import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatchDirective } from 'src/app/core/_helper';
import { AuthService } from 'src/app/core/_service/auth.service';
import { UserService } from 'src/app/core/_service/user.service';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MustMatchDirective, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule]
})
export class GeneratePasswordComponent {

  public userData = {
    cPassword: '',//'1997meghal@gmail.com',
    password: '',//'Test@123'
  };
  hideP = true;
  hideC = true;

  @ViewChild('newPasswordForm') sampleForm: NgForm;

  constructor(public authService: AuthService, private route: ActivatedRoute, public _snackBar: MatSnackBar, public userService: UserService, private router: Router) { }
  ngOnInit(): void {
    console.info('lifecycle hooks ngOnInit called');

    // this.route.queryParams.subscribe(params => {

    //   console.log(params['id'])

    //   console.log(encodeURIComponent(params['id']))
    //   // console.log(decodeURIComponent("U2FsdGVkX18W6OGpof%2FJmCbX1EEKUpvxoMULUkffi3DCjItkTk9S%20beWYoAk0knW"))

    //   console.log(encodeURI(params['id']))
    //   // console.log(decodeURIComponent("U2FsdGVkX18W6OGpof%2FJmCbX1EEKUpvxoMULUkffi3DCjItkTk9S%20beWYoAk0knW"))
    // });
  }

  // submitLogin(form: NgForm) {
  submitGeneratePassword() {


    if (this.sampleForm.valid) {

      // this.userService.encryptString(form.form.value.password).then((value) => {
      let id;
      this.route.queryParams.subscribe(params => {
        id = params['id']


      });

      const payload = {
        id: id.replace(/ /g, '+'), // It' replace '+' to '' sign in url
        password: this.sampleForm.form.value.password
      }
      // payload['password'] = value
      // payload['password'] = this.userService.encryptUsingAES256(payload['password'])
      this.authService.setNewPassword(payload).subscribe(response => {
        if (response.success) {
          this.router.navigate(['auth/login'])
          this._snackBar.open('Password updated successfully.', 'close', {
            duration: 3000,
          });

        }

        // });
      }, err => {
        this._snackBar.open(err.error.message, 'close', {
          duration: 3000,
        });
      })

    } else {
      this.sampleForm.form.markAllAsTouched();
    }

  }

}
