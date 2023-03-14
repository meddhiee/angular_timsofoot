import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from './auth.service';
import jwt_decode from "jwt-decode";
import { GlobalConstants } from '../shared/global-constants';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  constructor(public auth:AuthService,
    public router:Router,
    private snackbarService:SnackbarService) { }
//CanActivate : Vérifie si l'utilisateur est autorisé à accéder à la route.
    canActivate(router:ActivatedRouteSnapshot):boolean{
      let expectRoleArray = router.data;
      expectRoleArray = expectRoleArray['expectedRole'];

      const token:any = localStorage.getItem('token');

      var tokenPayload:any;
      //it decodes a JSON Web Token (JWT) using the jwt_decode function from the 'jwt-decode' library. If the decoding is successful, the tokenPayload variable is assigned the decoded token data.
      try{
        tokenPayload = jwt_decode(token);
      }catch(err){
        localStorage.clear();
        this.router.navigate(['/']);
      }

      let expectedRole = '';

      for(let i = 0 ;  i < expectRoleArray['length']; i++){
        if(expectRoleArray[i] == tokenPayload.role){
          expectedRole = tokenPayload.role;
        }
      }


      if(tokenPayload.role == 'admin'){
        if(this.auth.isAuthenticated() && tokenPayload.role == expectedRole){
          return true;
        }
        
        this.snackbarService.openSnackBar(GlobalConstants.unauthroized , GlobalConstants.error);
        this.router.navigate(['timsofoot/dashboard']);
        return false;
      }else if(tokenPayload.role == 'user' ){
        if(this.auth.isAuthenticated() && tokenPayload.role == expectedRole){
          return true;
        }
        
        this.snackbarService.openSnackBar(GlobalConstants.unauthroized , GlobalConstants.error);
        this.router.navigate(['timsofoot/utilisateur/acceuil']);
        return false;
      }
      else{
        this.router.navigate(['/']);  
        localStorage.clear();
        return false;
      }
    }
}
