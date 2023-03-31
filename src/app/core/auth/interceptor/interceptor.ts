import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../_service/auth.service";
import { User } from "src/app/_modal/modal";
import { Router } from "@angular/router";
import { catchError, map, tap } from 'rxjs/operators'
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user = <User>this.authService.getUserDetail();


        if (user) {
            const userName = user.userName

            request = request.clone({
                setHeaders: {
                    UserName: `${userName}`,
                    Authorization: 'Bearer '+this.authService.getLocalStrorageDetail('token')
                }
            });

        }
        else {
            request = request.clone();
        }



        return next.handle(request).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        // console.log('all looks good');
                        //when unautherized user then redirect to login page 
                        if (event.body.statusCode === 403) {
                            // this.openSnackBar(event.body.message,'')
                            localStorage.clear();
                            this.router.navigate(['auth/login']);

                        }


                    }
                },
                error => {

                    if (error.status === 422) {
                        // console.log(error.error.error, '');
                    }

                    // navigate to login and clear localstorage if the token is expired or
                    // unauthorized error is occured from the backend
                    if (error.status === 401) {
                        localStorage.clear();
                        // this.store.dispatch(new Logout());
                        this.router.navigate(['auth/login']);
                    }
                    // console.log('--- end of response---');
                }
            )
        );


    }
}


