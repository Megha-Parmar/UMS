import { enableProdMode, importProvidersFrom } from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { SOCKET_ENDPOINT } from '@common/GlobalConstants';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/core/auth/interceptor/auth.intercepter';
import { ErrorInterceptor } from './app/core/auth/interceptor/error.intercepter';
import { appRoute } from './app/routes/app-route';
import { environment } from './environments/environment';

const config: SocketIoConfig = { url: SOCKET_ENDPOINT, options: {} };
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoute),
    importProvidersFrom(MatSnackBarModule),
    provideHttpClient(
      withInterceptors([authInterceptor, ErrorInterceptor]),
    ),
    // CommonModule,
    provideAnimations(),
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    // AuthService,  
    importProvidersFrom(SocketIoModule.forRoot(config)),

  ],

})

function getLocalStorage() { return typeof window !== 'undefined' ? window.localStorage : null; }