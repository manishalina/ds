import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
//import { ILogin } from './login';
import { Login } from './admin/classes/login';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';
//import { AppRoutingModule } from './app-routing.module';
import {Router} from "@angular/router"
import { environment } from '../environments/environment';
import { ToastService } from './_services/toast.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiPath = environment.devPath;

  private _url:string = "";
  constructor(
    private http:HttpClient,
    private _router: Router,
    private toastService: ToastService
    ) { }

    

  loginUser(login:Login):any {
    let mdata:any=login;
    this._url=this.apiPath+"/api/login";
    this.mydata =this.encrypt(login,environment.encToken);
    this.mydata1={data:this.mydata}
    return this.http.post<any>(this._url,this.mydata1, {observe: 'response'});
  }
  twoFactorAuth(obj):any {
   // let mdata:any=login;
    this._url=this.apiPath+"/api/user/twoFactorAuth";
    //this.mydata =this.encrypt(login,environment.encToken);
    //this.mydata1={data:this.mydata}
    return this.http.post<any>(this._url,obj, {observe: 'response'});
  }

  otpSend(obj):any {
     this._url=this.apiPath+"/api/user/resendOtp";
     return this.http.post<any>(this._url,obj, {observe: 'response'});
   }
 
  errorHandar(error:HttpErrorResponse){
    alert(error.statusText);
    //alert(error.status);
  	return Observable.throw(error.message || "Server Error");

  }

  loggedIn(){
    return environment.isLogin;
  }

  loggedOut(){
    environment.token = '';
    environment.isLogin = false;
    environment.username='';
    this._router.navigate(['/login']);
  }
  getUsername(){
    return environment.username?environment.username:'';
  }
  getToken(){
    return environment.token;
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

