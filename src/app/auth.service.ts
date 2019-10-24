import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
//import { ILogin } from './login';
import { Login } from './admin/classes/login';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';
//import { AppRoutingModule } from './app-routing.module';
import {Router} from "@angular/router"
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiPath = environment.apiPath;
  private _url:string = "";
  constructor(private http:HttpClient,private _router: Router) { }

  loginUser(login:Login){
    //console.log(login);
    let mdata:any=login;
    this._url=this.apiPath+"/api/login";
    this.mydata =this.encrypt(login,'kingjuliean');
    this.mydata1={data:this.mydata}
    console.log(this.mydata1);
    localStorage.setItem('token', 'abc');
    return this.http.post<any>(this._url,this.mydata1)
            .pipe(map(data => {
               this.mydata =this.decrypt(data.data,'kingjuliean');
               if(this.mydata.code==1){
                if(this.mydata.isData==1){
                  localStorage.setItem('token', this.mydata.result.token.auth_token);
                  console.log(this.mydata.result.token.auth_token);
                  this._router.navigate(['/dashboard']);
                }
              }else{
                localStorage.removeItem('token');
              }
               //
                return true;
            })).catch(this.errorHandar);
  	//return this.http.post<any>(this._url,login).catch(this.errorHandar);
  }

  errorHandar(error:HttpErrorResponse){
    alert(error.statusText);
    //alert(error.status);
  	return Observable.throw(error.message || "Server Error");

  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  loggedOut(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token')?localStorage.getItem('token'):'';
  }
  public mydata;
  public mydata1;
encrypt(o, salt) {
    o = JSON.stringify(o).split('');
    for(var i = 0, l = o.length; i < l; i++)
        if(o[i] == '{')
            o[i] = '}';
        else if(o[i] == '}')
            o[i] = '{';
    return encodeURI(salt + o.join(''));
}

decrypt(o, salt) {
    o = decodeURI(o);
    if(salt && o.indexOf(salt) != 0)
        throw new Error('object cannot be decrypted');
    o = o.substring(salt.length).split('');
    for(var i = 0, l = o.length; i < l; i++)
        if(o[i] == '{')
            o[i] = '}';
        else if(o[i] == '}')
            o[i] = '{';
    return JSON.parse(o.join(''));
}

  
}

