import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm:any = FormGroup;
  responseMessage:any;



  constructor(private formBuilder:FormBuilder,
      private router:Router,
      private userService:UserService,
      private snackbarService:SnackbarService,
      public dialogRef:MatDialogRef<LoginComponent>,
      private ngxService:NgxUiLoaderService,
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null , Validators.required , Validators.pattern(GlobalConstants.emailRegex)],
      password:[null , Validators.required]
    })
  }


  handleSubmit(){
    this.ngxService.start();
    var formDate = this.loginForm.value;
    var data = {
      email: formDate.email,
      password: formDate.password  
    }
    /* la méthode login() utilise le service userService pour envoyer les informations de connexion de l'utilisateur (nom d'utilisateur et mot de passe) au backend pour vérification. 
    Si les informations de connexion sont valides, le backend renvoie une réponse avec un token JWT qui est stocké dans le stockage local de l'application 
    à l'aide de localStorage.setItem(). Ensuite, le token est décodé à l'aide de la bibliothèque jwt-decode pour obtenir des informations sur le rôle de l'utilisateur. 
    En fonction du rôle de l'utilisateur, l'application est redirigée vers la page appropriée à l'aide de router.navigate(). 
    Si le token est null ou invalide, une réponse d'erreur est affichée à l'utilisateur à l'aide d'un SnackbarService.*/
    //wakteli response *valid(return 200)
    this.userService.login(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      //token mawjoud fl loalstorage ,so whenever we log in we are expecting a jw token from the backend, setitem(key,value)
      localStorage.setItem('token' , response.token);
      const token = localStorage.getItem('token');
      if (token) {
        const tokenPayload: any = jwt_decode(token);
        if (tokenPayload.role === 'admin') {
          this.router.navigate(['timsofoot/dashboard']);
        } else if (tokenPayload.role === 'user') {
          this.router.navigate(['timsofoot/utilisateur/accueil']);
        }
      } else {
        // handle case where token is null
      }
     /* L'expression if(error.error?.message) utilise l'opérateur de navigation sécurisée ?. pour accéder à la propriété message de l'objet error.error, 
     sans provoquer d'erreur si la propriété error est nulle ou indéfinie. En d'autres termes, si error.error est nul ou indéfini, l'expression entière évalue false sans lever d'erreur.*/
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


