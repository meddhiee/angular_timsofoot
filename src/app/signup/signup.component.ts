import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services//user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  password = true;
  confirmPassword = true;
  signupForm:any = FormGroup;
  responseMessage:any;
  roles: any = ['entraineur','joueur'];
  selectedRole:any ;
  constructor(private formBuilder:FormBuilder,
      private router:Router,
      private userService:UserService,
      private snackbarService:SnackbarService,
      public dialogRef:MatDialogRef<SignupComponent>,
      private ngxService:NgxUiLoaderService,
    ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[null , [Validators.required]],
      email:[null , Validators.required],
      contactNumber:[null , [Validators.required]],
      password:[null , Validators.required],
      confirmPassword:[null , [Validators.required]],
      role: [null , [Validators.required]]
    })
  }
  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }

  handleSubmit(){
    this.ngxService.start();
    var formDate = this.signupForm.value;
    var data = {
      name: formDate.name,
      email: formDate.email,
      contactNumber: formDate.contactNumber,
      password: formDate.password,
      role:formDate.role,
    }

    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      
      this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
    })
  }
}
