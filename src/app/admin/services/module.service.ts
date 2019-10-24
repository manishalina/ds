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
  public apiPath = environment.apiPath;
  public _url;
  constructor(
    private http:HttpClient,
    private _router:Router
    ){}

  getmodule():Observable<any>{
    this._url = this.apiPath+"/api/modules";
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
}
