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
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiPath = environment.apiPath;
  public devPath = environment.devPath;
  constructor(private http:HttpClient) { }
  private _url:string = this.devPath+"/api/users";
  //private apiPath:string = 'http://192.168.10.3:3200/';

  getUser():Observable<any>{
    this._url = this.devPath+"/api/users";
    return this.http.get<any>(this._url).pipe(
      map(data => {
        //console.log('res ',data);
        this.mydata =this.decrypt(data.data,'kingjuliean');
        // console.log('my data',this.mydata);
        // console.log('my data',this.mydata.code);
        return this.mydata;
        // if(this.mydata.code == 1){
        //   if(this.mydata.isData==1){
        //     return this.mydata;
        //   }
        // }
        return false;
     }
    )).catch(this.errorHandar);          
  }

  getRol():Observable<any>{
    this._url = this.devPath+"/api/roles";
    return this.http.get<any>(this._url).pipe(
      map(data => {
        console.log('roles ',data);
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
    this._url = this.devPath+"/api/departments";
    return this.http.get<any>(this._url).pipe(
      map(data => {
       console.log('department ',data);
        if(data.code == 1){
          if(data.isData==1){
            return data.result;
          }
        }
        return false;
     }
    )).catch(this.errorHandar);          
  }

  // getUser():Observable<IUser[]>{
  //   return this.http.get<IUser[]>(this._url).catch(this.errorHandar);
          
  // }

  saveUser(user){
    this._url=this.devPath+"/api/user/sendEmail";
    //this._url="http://192.168.10.3:3200/api/user/sendEmail";
  
    return this.http.post<any>(this._url,user)
            .pipe(map(data => {
              console.log(data);
            //   if(data.code == 1){
            //    //localStorage.removeItem('editRoleId');
            //    if(data.isData==1){
            //      //return data.result;
            //      //return data.result;
            //    }
            //  }
              //
             // this._router.navigate(['/module']);
             return true;
           })).catch(this.errorHandar);
   //return this.http.post<any>(this._url,login).catch(this.errorHandar);
 }
  errorHandar(error:HttpErrorResponse){
    if(error.status !== 200){
      alert('Server Error');
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
