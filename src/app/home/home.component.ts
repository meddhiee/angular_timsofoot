import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
//Cela signifie que la classe dans laquelle se trouve ce constructeur a besoin de ces trois dépendances pour fonctionner correctement.

//Plus précisément, cela signifie que lorsque vous créez une instance de cette classe, Angular injectera automatiquement une instance de la classe MatDialog, de la classe UserService et de la classe Router dans le constructeur de cette classe.
  constructor(private dialog:MatDialog, private userService:UserService, private router:Router) { }

  //la méthode ngOnInit() est utilisée pour initialiser et configurer les fonctionnalités du composant une fois qu'il a été créé et les dépendances ont été injectées. 
  ngOnInit(): void {
    this.userService.checkToken().subscribe((response:any)=>{
      this.router.navigate(['/timsofoot/dashboard']);
    },(error:any)=>{
      console.log(error);
    }
    )
  
  }

  handleSignupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent , dialogConfig)
  }

  handleforgotPasswordAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ForgotPasswordComponent , dialogConfig)

  }
  handleLoginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent , dialogConfig)
  }

}
