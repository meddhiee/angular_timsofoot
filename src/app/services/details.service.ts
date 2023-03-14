import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +"/details/add" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url +"/details/update" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  getDetails(){
    return this.httpClient.get(this.url + "/details/get");
  }

 

  delete(id:any){
    return this.httpClient.post(this.url +"/details/delete/"+ id ,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }

  getById(id:any){
    return this.httpClient.get(this.url + "/details/getDetailsById/"+id);
  }
  
}
