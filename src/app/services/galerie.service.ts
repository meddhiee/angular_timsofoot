import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalerieService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +"/accueil/galerie/add" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url +"/accueil/galerie/update" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  getGalerie(){
    return this.httpClient.get(this.url + "/accueil/galerie/get");
  }

 

  delete(id:any){
    return this.httpClient.post(this.url +"/accueil/galerie/delete/"+ id ,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }
}
