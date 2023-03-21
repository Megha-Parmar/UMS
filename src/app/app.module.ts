import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from './core/layout/layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PagesModule } from './pages/pages.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './core/_service/auth.service';
import { Interceptor } from './core/auth/interceptor/interceptor';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatTooltipModule} from '@angular/material/tooltip';
// import { MatToolbarModule } from '@angular/material/toolbar';


// MatFormFieldModule,
// MatInputModule,
// MatSnackBarModule,
// MatTooltipModule,
// MatToolbarModule



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatSliderModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    NgbModule
    // PagesModule
  ],
  providers: [AuthService, HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
