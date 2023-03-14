import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;
  responseMessage:any;
  
  registerSucess:boolean = false;
  isButtonVisible = true;

  constructor(private formBulider:FormBuilder, 
    private userService:UserService , 
    public dialogRef:MatDialogRef<ForgotPasswordComponent> ,
    private snackbarService:SnackbarService,
    private ngxService: NgxUiLoaderService
    ) { }
     
  ngOnInit(): void {
    this.forgotPasswordForm = this.formBulider.group({
      email:[null,[Validators.required , Validators.pattern(GlobalConstants.emailRegex)]]
    });
    
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email:formData.email
    }
    //Le subscribe permet de s'abonner à l'observable renvoyé par la méthode forgotPassword, ce qui permet de récupérer la réponse du serveur (ou une erreur en cas d'échec de la requête).
    this.userService.forgotPassword(data).subscribe((response:any)=>{
      this.ngxService.stop();
     /*En effet, si l'objet response est défini, mais que sa propriété message est nulle ou indéfinie, l'opérateur de lissage de l'optionnel 
      va simplement renvoyer une valeur nulle (undefined), sans générer d'erreur.
      Cela permet d'assurer que la variable responseMessage est toujours définie*/
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.responseMessage,"");
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
