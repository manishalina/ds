import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../interface/user';
//import { Employee } from './employeeModel';
//import { Observable } from 'rxjs';

import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  _router: any;

  constructor(private http:HttpClient) { }
  private _url:string = "http://192.168.10.3:3200/api/roles";

  getRole():Observable<any>{
    this._url = "http://192.168.10.4:3200/api/roles";
    return this.http.get<any>(this._url).pipe(
      map(data => {
        console.log('res ',data);
        if(data.code == 1){
          if(data.isData==1){
            return data.result;
          }
        }
        return false;
     }
    )).catch(this.errorHandar);          
  }

  getRol():Observable<any>{
    this._url = "http://192.168.10.3:3200/api/users";
    return this.http.get<any>(this._url).pipe(
      map(data => {
        console.log('res ',data);
        if(data.code == 1){
          if(data.isData==1){
            return data.result;
          }
        }
        return false;
     }
    )).catch(this.errorHandar);          
  }

  getpermission():Observable<any>{
    this._url = "http://192.168.10.3:3200/api/permissions";
    return this.http.get<any>(this._url).pipe(
      map(data => {
        //console.log('res ',data);
        if(data.code == 1){
          if(data.isData==1){
            return data.result;
          }
        }
        return false;
     }
    )).catch(this.errorHandar);          
  }
  getmodule():Observable<any>{
    this._url = "http://192.168.10.3:3200/api/modules";
    return this.http.get<any>(this._url).pipe(
      map(data => {
        //console.log('res ',data);
        if(data.code == 1){
          if(data.isData==1){
            return data.result;
          }
        }
        return false;
     }
    )).catch(this.errorHandar);          
  }
  
  getDepartment():Observable<any>{
    this._url = "http://192.168.10.3:3200/api/users";
    return this.http.get<any>(this._url).pipe(
    retry(1),
    ).catch(this.errorHandar);          
  }

  // getUser():Observable<IUser[]>{
  //   return this.http.get<IUser[]>(this._url).catch(this.errorHandar);
          
  // }

  errorHandar(error){
    console.log(error.message);
    if(error.status !== 200){
      alert(error.message);
    }
  	return Observable.throw(error.message || "Server Error");

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
