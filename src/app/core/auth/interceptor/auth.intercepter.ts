import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { User } from "src/app/_modal/modal";
import { GlobalConstants } from "src/app/common/GlobalConstants";
import { AuthService } from "../../_service/auth.service";

export const authInterceptor: HttpInterceptorFn = (request, next) => {

    const authService = inject(AuthService);
    const user = <User>authService.getUserDetail();
    if (user) {
        const userName = user.userName
        request = request.clone({
            setHeaders: {
                UserName: `${userName}`,
                Authorization: 'Bearer ' + authService.getLocalStorageDetail(GlobalConstants.token)
            }
        });
    }
    else {
        request = request.clone();
    }
    return next(request);
}
