import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _authService:AuthService) { }
  // intercept(req,next){

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          observe:'response',
          'responseType': 'text',
          //'Authorization': 'my-auth-token'
          'auth-token': this._authService.getToken(),
         // 'user-token': localStorage.getItem('userToken')
        })
      });
      //console.log('Intercepted HTTP call', authReq);
      return next.handle(authReq);
  }
}
