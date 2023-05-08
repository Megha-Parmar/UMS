import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { routerURLConstant } from "@common/GlobalConstants";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export const ErrorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next) => {
    const router = inject(Router);
    const _snackBar = inject(MatSnackBar);


    // const toasterService = inject(ToasterService);

    return next(request).pipe(

        catchError((err: HttpErrorResponse) => {
            console.log('err', err)
            if (err.status === 422) {

            }


            if (err.status === 401 || err.status === 403) {
                localStorage.clear();
                // this.store.dispatch(new Logout());
                router.navigate([`${routerURLConstant.auth}/${routerURLConstant.login}`]);
                _snackBar.open('Session expire...', 'close', {
                    duration: 3000,
                });
            }
            // toasterService.displaySnackBar(err.error?.message, messageType.error);

            const error = err.error || err;

            return throwError(() => {

                return error;

            });

        })

    );

}