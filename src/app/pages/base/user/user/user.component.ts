import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/_service/auth.service';
import { UserService } from 'src/app/core/_service/user.service';
import { User, Role } from '../../../../_modal/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  public page = 1;
  public limit = 5;
  public searchKeyword = "";
  public users!: User[];//= [];
  public totalData = 0;
  public loadingSubject = new BehaviorSubject<boolean>(true);
  public isInEditMode: boolean = false;
  public userForm!: UntypedFormGroup;
  public pageIndex: number = 0;
  public formTitle = "";
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public showLoader$: Observable<boolean> = of(false);
  public currentDate = new Date();
  public displayedColumns: string[] = [
    "srNo",
    "uniqueId",
    "name",
    "email",
    "dob",
    "phoneNumber",
    "role",
    "status",
    "action",
  ];
  public loggedInUser: User;
  public roleList : any[];


  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([])
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  user!: User;
  constructor(private userService: UserService, public dialogRef: MatDialogRef<any>,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.getUserData();
    this.loggedInUser = this.authService.getUserDetail();



    this.userService.getRoles().subscribe((res)=>{
      this.roleList = res.roleData;
    })



    
    this.activatedRoute.data.subscribe((response: any) => {
      
      this.loadingSubject = new BehaviorSubject<boolean>(false);
      if (response.users.success) {
        // console.log("userdata", userData)


        if (this.loggedInUser.role.name === 'ADMIN') {
          this.users =  response.users.body.users;
          this.totalData =  response.users.body.totalData
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;

        } else {


          this.users = new Array( response.users.body.user);

          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;

          this.totalData = this.users.length
        }



      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onPaginationChange(event: { pageIndex: number; pageSize: number; }) {
    this.showLoader$ = of(true);

    if (event.pageIndex > this.pageIndex) {
      this.pageIndex = event.pageIndex;
      this.page = this.page + 1;
    } else {
      this.pageIndex = event.pageIndex;
      this.page = this.page - 1;
    }
    if (this.limit != event.pageSize) {
      this.limit = event.pageSize;
      this.page = 1;
      this.pageIndex = 0;
    }

    this.getUserData();
  }

  deleteUser(user: User, DeleteModel: any, message: any) {

    this.dialogRef = this.dialog.open(DeleteModel, {
      maxWidth: "400px",
      hasBackdrop: true
      // data: dialogData
    });

    this.dialogRef.afterClosed().subscribe(dialogResult => {


      if (dialogResult) {
        this.userService.DeleteUserData(user._id).subscribe(response => {
          this.loadingSubject = new BehaviorSubject<boolean>(false);


          if (response.success) {
            this._snackBar.open('User deleted successfully', 'close', {
              duration: 3000,
            });
            this.getUserData()
          }

        });
      }
    });

  }

  closeModel(flag: boolean) {
    // if(this.dialogRef.ha)

    this.dialogRef.close(flag);
  }
  openModal(content: any) {
    this.initForm();
    this.isInEditMode = false;

    this.formTitle = 'Add User',//this.translate.instant('USER.ADD_USER_LABEL');
      this.userForm.reset();
    this.modalService.open(content);
  }


  editDetails(userId: any, content: any) {
    this.initForm();
    this.formTitle = "Update User";
    this.userForm.reset();
    this.isInEditMode = true;
    this.user = this.users.find((x: { _id: any; }) => x._id == userId);
    this.setValue();
    this.modalService.open(content);
  }

  submit() {
    if (this.userForm.valid) {

      this.userForm.patchValue({ status: 'ACTIVE', uniqueId: "U_" + (Math.random() + 1).toString(36).substring(7) })

      let obj = this.userForm.value;
      // obj['role'] = this.roleList.find((x) => x._id == this.userForm.value.role);


      if (this.isInEditMode) {

        this.userService.UpdateUserData(obj, this.user._id).subscribe(response => {
          this.loadingSubject = new BehaviorSubject<boolean>(false);


          if (response.success) {

            this.user = response.body;
            this.modalService.dismissAll();
            if (this.loggedInUser._id == this.user._id) {
              this.authService.saveUserDetail(this.user);
              this.loggedInUser = this.user;

            }
            this._snackBar.open('User detail updated successfully', 'close', {
              duration: 3000,
            });
            // setTimeout(() => {
              this.getUserData();

              // if(response.user.role.name === 'ADMIN'){
              // this.getUserData();
              // } else {
              //   if(this.loggedInUser._id === response.users._id){
              //     this.users = new Array(response.user);
              //     this.dataSource = new MatTableDataSource(this.users);
              //   }
              // }
          }

        },(err)=>{
          // console.log(err)
          this._snackBar.open(err.error.message, 'close', {
            duration: 3000,
          });
        })
      } else {

        // obj['password'] = this.userService.encryptUsingAES256("Test@123");
        obj['password'] = "Test@123";

        this.userService.SaveUserData(obj).subscribe(response => {
          this.loadingSubject = new BehaviorSubject<boolean>(false);


          if (response.success) {
            // console.log("userdata", userData)
            this.user =  response.body;
            this.getUserData()
            this.modalService.dismissAll();
            this._snackBar.open('User added successfully', 'close', {
              duration: 3000,
            });

          }

        },(err)=>{
          this._snackBar.open(err.error.message, 'close', {
            duration: 3000,
          });

          // console.log(err)
        })


      }

    } else {
      this.userForm.markAllAsTouched();

    }


  }
  setValue() {
    this.userForm.setValue({
      // id: this.user._id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      userName: this.user.userName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      role: this.user.role._id,
      status: this.user.status,
      uniqueId: this.user.uniqueId,
      dob: new Date(this.user.dob),
      // dateOfBirth: this.cService.getFormattedDate(this.users.dateOfBirth)
    });
    // this.userForm.get('id').setValue(this.users._id);
  }


  initForm() {
    this.userForm = this.formBuilder.group({
      // id: [""],
      firstName: ["", [Validators.required, Validators.pattern("^[a-zA-Z]{1,200}$")]],
      lastName: ["", [Validators.required, Validators.pattern("^[a-zA-Z]{1,200}$")]],
      userName: ["", [Validators.required], this.validateUserIdNotTaken.bind(this)],
      email: ["",
        [Validators.required,
        Validators.email,
        Validators.pattern(
          "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
        )],
        this.validateEmailNotTaken.bind(this)],
      phoneNumber: ["", [Validators.required]],
      role: ["", [Validators.required]],
      status: [""],
      uniqueId: [""],
      dob: ["", [Validators.required]],
      // dateOfBirth: ["", [Validators.required]],
    });
  }


  validateEmailNotTaken(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {

      let isFound = this.users.find((x: any) => x.email == control.value);


      if (isFound) {
        if (!this.isInEditMode) { //for add new
          return resolve({ 'emailExist': true })
        }
        else {
          if ((this.loggedInUser._id == isFound._id && this.loggedInUser.email == isFound.email) || this.user._id == isFound._id) {
            return resolve(null);
          }
          else {
            return resolve({ 'emailExist': true })
          }
        }
      }
      return resolve(null);
    });
  }

  validateUserIdNotTaken(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {

      let isFound = this.users.find((x: any) => x.userName == control.value);

      // if (isFound)
      //   return resolve({ 'userIdExist': true })

      if (isFound) {
        if (!this.isInEditMode) { //for add new
          return resolve({ 'userIdExist': true })
        }
        else {
          if ((this.loggedInUser._id == isFound._id) || this.user._id == isFound._id) {
            return resolve(null);
          }
          else {
            return resolve({ 'userIdExist': true })
          }
        }
      }
      return resolve(null);


    });
  }

  getUserData() {
    const userData = {
      page: this.page,
      limit: this.limit,
      searchKeyword: this.searchKeyword
    };


    this.userService.getUserData(userData).subscribe(response => {
      this.loadingSubject = new BehaviorSubject<boolean>(false);


      if (response.success) {

        if (response.body && response.body.users && response.body.users.length > 0) {
          this.users = response.body.users;
          this.dataSource = new MatTableDataSource(this.users);
          this.totalData = response.body.totalData
        } else {
          if(this.loggedInUser._id === response.user._id){
          this.users = new Array(response.user);
          this.dataSource = new MatTableDataSource(this.users);
        }
        }

        this.dataSource.sort = this.sort;
        this.changeDetectorRef.detectChanges();
      }
      this.showLoader$ = of(false);
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    // this.loadingSubject.next();
    this.loadingSubject.complete();
  }
}
