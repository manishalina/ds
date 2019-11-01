import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import { map } from 'rxjs/internal/operators/map';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  public apiPath = environment.apiPath;
  constructor(private http:HttpClient,private _router:Router) { }
  private _url:string = this.apiPath+"/api/roles";

  //sendOtp(obj):Observable<any>{
  sendOtp(obj):any{
    console.log(obj);
    this._url = this.apiPath+"/api/otp/sendOtp";
    //this._url = "http://192.168.10.3:3200/api/otp/sendOtp";
    let options= {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','user-token': obj })
     
    };
    return this.http.post<any>(this._url,{},options).pipe(
      map(data => {
        //console.log('res ',data);
        // if(data.code == 1){
        //   if(data.isData==1){
        //     return data.result;
        //   }
        // }
        return data;
     }
    )).catch(this.errorHandar);  

  }

  verifyOtp(obj):any{
    console.log(obj);
    //this._url = this.apiPath+"/api/roles";
    this._url = "http://192.168.10.3:3200/api/otp/verify_otp";
    return this.http.post<any>(this._url,obj).pipe(
      map(data => {
        //console.log('res ',data);
        // if(data.code == 1){
        //   if(data.isData==1){
        //     return data.result;
        //   }
        // }
        
        return data;
     }
    )).catch(this.errorHandar);  

  }

  createUser(obj):any{
    console.log(obj);
    this._url = this.apiPath+"/api/user/create";
    //this._url = "http://192.168.10.3:3200/api/user/create";
    return this.http.put<any>(this._url,obj).pipe(
      map(data => {
        return data;
     }
    )).catch(this.errorHandar);  

  }
  updateUser(obj):any{
    console.log(obj);
    this._url = this.apiPath+"/api/user/profileCreate";
    //this._url = "http://192.168.10.3:3200/api/user/profileCreate";
    return this.http.put<any>(this._url,obj).pipe(
      map(data => {
        return data;
     }
    )).catch(this.errorHandar);  

  }
  twoWayVerification(obj):any{
    console.log(obj);
    this._url = this.apiPath+"/api/user/twoWayVerification";
    //this._url = "http://192.168.10.3:3200/api/user/twoWayVerification";
    return this.http.put<any>(this._url,obj).pipe(
      map(data => {
        return data;
     }
    )).catch(this.errorHandar);  

  }

  errorHandar(error){
    console.log('erro',error.message);
    if(error.status !== 200){
      alert(error.message);
    }
  	return Observable.throw(error.message || "Server Error");

  }

}
