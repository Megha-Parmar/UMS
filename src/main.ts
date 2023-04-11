import { enableProdMode } from '@angular/core';

import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AuthService } from './app/core/_service/auth.service';
import { authInterceptor } from './app/core/auth/interceptor/auth.intercepter';
import { appRoute } from './app/routes/app-route';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoute),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    CommonModule,
    provideAnimations(),
    AuthService,    
    
  ],

})

