import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Route, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/_service/auth.service';
import { UserComponent } from '../../base/user/user/user.component';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // component.userData={email:'1997meghal@gmail.com',password:'Test@123'}
  let restService: AuthService;
  let httpMock: HttpTestingController;

 const routes:Routes =[{
    path: 'user',
    component:UserComponent
    // canActivate: [ModuleGuard],
    // data: { roles: [UserRolesEnum.Agent, UserRolesEnum.Builder, UserRolesEnum.Admin] }
  }]
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        RouterTestingModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    restService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;

  //   fixture.detectChanges();
  // });

  it('should create', () => {
    // component.submitLogin(component.sampleForm);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('login form is invalid', () => {
    component.sampleForm.form.setValue({
      email: '',
      password: '',
    });
     component.submitLogin();
    fixture.detectChanges();
    expect(component.sampleForm.form.valid).toBeFalsy();
  });

  it('login form is valid', () => {
    component.sampleForm.form.setValue({
      email: '1997meghal@gmail.com',
      password: 'Test@123',
    });
    fixture.detectChanges();
    //  component.submitLogin(component.sampleForm);
    expect(component.sampleForm.form.valid).toBeTruthy();
  });

  it('form submitted', () => {
    component.sampleForm.form.setValue({
      email: '1997meghal@gmail.com',
      password: 'Test@123',
      // password: '',
    });
    fixture.detectChanges();

    //  component.submitLogin(component.sampleForm);
    spyOn(component, 'submitLogin');
    let el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.sampleForm.form.valid).toBeTruthy();
    expect(component.submitLogin).toHaveBeenCalled();
    component.submitLogin();
    // component.authService.login(component.sampleForm.form.value).subscribe((res) => {
    //   //2
    //   console.log("Res=>",res)
    //   expect(res.success).toBe(true);
    // });
  });

 
  it('Login Sucess', () => {
    component.sampleForm.form.setValue({
      email: '1997meghal@gmail.com',
      password: 'Test@123',
      // password: '',
    });
    fixture.detectChanges();

    const payload = {
      email: component.sampleForm.form.value.email,
      password: component.userService.encryptUsingAES256(
        component.sampleForm.form.value.password
      ),
    };
    const mockList = {
      status_code: 200,
      success: true,
      body: [
        {
          firstName: 'megha',
          lastName: 'Parmar',
          username: 'megha.parmar',
          email: '1997meghal@gmail.com',
          phoneNumber: '4546576',
          role: {
            id: 2,
            name: 'ADMIN',
            value: 'Admin',
          },
          status: 'ACTIVE',
          uniqueId: 'U_5wyd4i',
          dob: '1997-03-21T18:30:00.000Z',
          password: 'aIkFQvGaLZ1hbnAA/FBS6A==',
          createdAt: 1648412948738,
          id: 12,
        },
      ],
      totalData: 7,
    };

   
    fixture.detectChanges();
    
    component.submitLogin();
    fixture.detectChanges();
    
    const req = httpMock.expectOne(
      `/api/auth/user?email=${payload.email}&password=${payload.password}`
    );
      


    expect(req.request.method).toBe('GET');

    req.flush(mockList, {status: 200, statusText: 'Success'});

    httpMock.verify();
    fixture.detectChanges();
  });

  it('Login failure', () => {
    component.sampleForm.form.setValue({
      email: '1997meghalllllll@gmail.com',
      password: 'Test@123',
      // password: '',
    });
    fixture.detectChanges();

    const payload = {
      email: component.sampleForm.form.value.email,
      password: component.userService.encryptUsingAES256(
        component.sampleForm.form.value.password
      ),
    };
    let arr:any=[];
    const mockList = {
      status_code: 200,
      success: true,
      body:arr,
      totalData: 7,
    };

   
    fixture.detectChanges();
    
    component.submitLogin();
    fixture.detectChanges();
    
    const req = httpMock.expectOne(
      `/api/auth/user?email=${payload.email}&password=${payload.password}`
    );
      


    expect(req.request.method).toBe('GET');
    req.flush(mockList, {status: 200, statusText: 'Success'});

    httpMock.verify();
    fixture.detectChanges();
  });



});
