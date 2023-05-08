import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { routerURLConstant } from '@common/GlobalConstants';
import { MustMatchDirective } from '@helper/must-match.directive';
import { AuthService } from '@service/auth.service';
import { UserService } from '@service/user.service';


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


    // this.route.queryParams.subscribe(params => {
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
      this.authService.setNewPassword(payload).subscribe(response => {
        if (response.success) {
          this.router.navigate([`${routerURLConstant.auth}/${routerURLConstant.login}`])
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
