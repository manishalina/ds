import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interface/user';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import { map } from 'rxjs/internal/operators/map';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  public apiPath = environment.devPath;
  public _url;
  constructor(
    private http:HttpClient,
    private _router:Router
    ){}

  getmodule():Observable<any>{
    this._url = this.apiPath+"/api/modules";
    return this.http.get<any>(this._url,{observe: 'response'}).pipe(
      map(data => {
        environment.token = data.headers.get('auth-token');
        return data.body;
     }
    )).catch(this.errorHandar);          
  }
  saveModule(module){
    this._url=this.apiPath+"/api/modules/create";
    return this.http.put<any>(this._url,module,{observe: 'response'})
            .pipe(map(data => {
              console.log('save',data);
              environment.token = data.headers.get('auth-token');
              return data.body;
           })).catch(this.errorHandar);
   //return this.http.post<any>(this._url,login).catch(this.errorHandar);
 }

 getModuleId(){
  return localStorage.getItem('editModuleId')?localStorage.getItem('editModuleId'):'';
}
deleteModule(module){
  this._url=this.apiPath+"/api/modules/delete";
  let options= {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    body: module,
  };
  return this.http.delete<any>(this._url,options).pipe(map(data => {
    console.log('ressss',data)
    if(data.code == 1){
      return true;
    }else{
      return false;
    }
 })).catch(this.errorHandar);
}
  errorHandar(error){
    //console.log('erro',error.message);
    if(error.status !== 200){
      alert(error.message);
    }
  	return Observable.throw(error.message || "Server Error");

  }
}
