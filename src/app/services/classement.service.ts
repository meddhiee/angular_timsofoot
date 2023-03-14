import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassementService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +"/accueil/classement/add" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url +"/accueil/classement/update" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  getClassement(){
    return this.httpClient.get(this.url + "/accueil/classement/get");
  }

 

  delete(id:any){
    return this.httpClient.post(this.url +"/accueil/classement/delete/"+ id ,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }
}
