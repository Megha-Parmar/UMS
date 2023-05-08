import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { GlobalConstants } from "@common/GlobalConstants";
import { User } from "@modal/modal";
import { EncryptDecryptService } from "@service/encrypt-decrypt.service";


export const authInterceptor: HttpInterceptorFn = (request, next) => {

    const encryptDecryptService = inject(EncryptDecryptService);
    const user = <User>encryptDecryptService.getDecryptedLocalStorage(GlobalConstants.user);
    if (user) {
        const userName = user.userName
        request = request.clone({
            setHeaders: {
                UserName: `${userName}`,
                Authorization: 'Bearer ' + encryptDecryptService.getDecryptedLocalStorage(GlobalConstants.token)
            }
        });
    }
    else {
        request = request.clone();
    }
    return next(request);
}
