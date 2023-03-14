import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {

  
  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +"/accueil/calandrier/add" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url +"/accueil/calandrier/update" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  getCalendrier(){
    return this.httpClient.get(this.url + "/accueil/calandrier/get");
  }

 

  delete(id:any){
    return this.httpClient.post(this.url +"/accueil/calandrier/delete/"+ id ,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

 
}

