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
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@service/auth.service';
import { UserService } from '@service/user.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, TranslateModule, CommonModule, MustMatchDirective, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  public userData = {
    email: '',//'1997meghal@gmail.com',
  };
  hideP = true;
  hideC = true;

  @ViewChild('resetPasswordForm') sampleForm: NgForm;

  constructor(public authService: AuthService, private route: ActivatedRoute, public _snackBar: MatSnackBar, public userService: UserService, private router: Router) { }
  ngOnInit(): void { }

  // submitLogin(form: NgForm) {
  submitResetPassword() {


    if (this.sampleForm.valid) {

      this.authService.forgetPassword(this.sampleForm.value).subscribe(response => {
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
