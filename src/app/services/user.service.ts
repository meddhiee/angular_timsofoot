import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

//le décorateur @Injectable permet à la classe UserService d'être injectée en tant que dépendance dans d'autres classes de l'application. 
//Cela signifie que si une classe a besoin de l'objet UserService, elle peut simplement déclarer le service en tant que dépendance dans son constructeur, et Angular se chargera de fournir une instance de la classe UserService.
//Le paramètre providedIn: 'root' signifie que cette instance sera fournie au niveau racine de l'application, ce qui permet d'avoir une seule instance partagée entre tous les composants et services de l'application.
@Injectable({
  providedIn: 'root'
})
//la classe UserService est utilisée pour effectuer des appels HTTP vers l'API backend de l'application
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) {}
  //La méthode signup() est utilisée pour envoyer les informations d'inscription de l'utilisateur à l'API backend pour inscription.
  signup(data:any){
    return this.httpClient.post(this.url + "/user/signup" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url + "/user/forgotPassword" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }
  login(data:any){
    return this.httpClient.post(this.url + "/user/login" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }
  checkToken(){
    return this.httpClient.get(this.url+"/user/checkToken");
  }

  changePassword(data:any){
    return this.httpClient.post(this.url + "/user/changePassword" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }

  getUsers(){
    return this.httpClient.get(this.url + "/user/get");
  }

  update(data:any){
    return this.httpClient.post(this.url + "/user/update" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }
  delete(id:any){
    return this.httpClient.post(this.url +"/user/delete/"+ id ,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }
}