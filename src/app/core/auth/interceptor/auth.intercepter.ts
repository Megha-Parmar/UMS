import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { User } from "src/app/_modal/modal";
import { AuthService } from "../../_service/auth.service";

export const authInterceptor: HttpInterceptorFn = (request, next) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const user = <User>authService.getUserDetail();


    if (user) {
        const userName = user.userName

        request = request.clone({
            setHeaders: {
                UserName: `${userName}`,
                Authorization: 'Bearer ' + authService.getLocalStrorageDetail('token')
            }
        });

    }
    else {
        request = request.clone();
    }



    return next(request).pipe(
        tap(
            event => {
                if (event instanceof HttpResponse) {
                    console.log('all looks good', event);
                    //when unautherized user then redirect to login page 
                    if (event.body['statusCode'] === 403) {
                        // this.openSnackBar(event.body.message,'')
                        localStorage.clear();
                        router.navigate(['auth/login']);

                    }


                }
            },
        )
    );

}
