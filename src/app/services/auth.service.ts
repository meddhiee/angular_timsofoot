import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router:Router) { }
//this method will return true or false if the localstorage have a token or not
  public isAuthenticated():boolean{
    const token = localStorage.getItem('token');
    //console.log("token is : " + token);
      if(!token){
      this.router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
  
}
