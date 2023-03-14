import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +"/joueur/add" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url +"/joueur/update" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  getJoueurs(){
    return this.httpClient.get(this.url + "/joueur/get");
  }

  getFilteredJoueurs(){
    return this.httpClient.get(this.url + "/joueur/get?filterValue=true");
  }
}
