//In Angular, a token interceptor is an HTTP interceptor that is used to automatically attach an authorization token to all outgoing HTTP requests that require authorization.

//The token interceptor intercepts outgoing HTTP requests before they are sent and adds an authorization header to the request with the token value. This allows the server to identify and authenticate the user making the request.

//Token interceptors are commonly used when implementing authentication and authorization in Angular applications. After a user logs in, the server provides a token that is stored in the browser's local storage or session storage. The token is then passed in the authorization header of all subsequent requests.

//By using a token interceptor, the developer can write the token handling logic in one place and have it applied to all relevant requests automatically. This improves security by reducing the likelihood of forgetting to include the token in a request and simplifies code maintenance by keeping the logic in one place.
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
/*Ce code est un Interceptor HTTP qui intercepte chaque requête HTTP et ajoute un header d'autorisation (Authorization) avec un jeton (token) stocké
 dans le stockage local du navigateur (localStorage), s'il est présent. L'intercepteur est également capable de gérer les erreurs de réponse HTTP
  liées à l'autorisation et de rediriger l'utilisateur vers la page de connexion.*/
@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  

  constructor(private router:Router) {}
//C'est la méthode intercept() de l'interface HttpInterceptor qui intercepte chaque requête HTTP et renvoie un Observable<HttpEvent<unknown>> après avoir ajouté un header d'autorisation s'il est présent.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //C'est la récupération du token depuis le stockage local du navigateur.
    const token = localStorage.getItem('token');
//C'est la vérification si le token est présent, et si oui, on ajoute le header d'autorisation à la requête.
    if(token){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    //C'est l'envoi de la nouvelle requête modifiée à la chaîne de gestion suivante avec la méthode pipe(), qui permet de traiter les erreurs de réponse HTTP.
    //La méthode "handle" renvoie un Observable d'un événement HTTP, qui peut être une réponse réussie ou une erreur. Cette réponse est transmise à travers la méthode "pipe" pour permettre le traitement d'éventuelles erreurs.
    return next.handle(request).pipe(
      catchError((err)=>{
        //C'est la vérification si l'erreur est une instance de HttpResponse( si l'erreur interceptée est une réponse HTTP.)
        if(err instanceof HttpResponse){
          //C'est l'affichage de l'URL de la requête ayant généré l'erreur dans la console.
          console.log(err.url);
          //C'est la vérification si le statut de l'erreur est 401 (non autorisé) ou 403 (interdit).
          if(err.status === 401 || err.status === 403){
            //C'est la vérification si l'utilisateur est déjà sur la page de connexion ou non.
            if(this.router.url === '/'){}
            else{
              //C'est la suppression du token de stockage local.
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(err);
      })
    )
  }
}
