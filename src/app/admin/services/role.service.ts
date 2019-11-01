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
import { ToastService } from 'src/app/_services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public apiPath = environment.apiPath;
  constructor(private http:HttpClient,private _router:Router,private toastService: ToastService) { }

  private _url:string = this.apiPath+"/api/roles";

  getRole():Observable<any>{
    this._url = this.apiPath+"/api/roles";
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

  getRol():Observable<any>{
    this._url = this.apiPath+"/api/users";
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

  getpermission():Observable<any>{
    this._url = this.apiPath+"/api/permissions";
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
    this._url = this.apiPath+"/api/modules";
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
    this._url = this.apiPath+"/api/users";
    return this.http.get<any>(this._url).pipe(
    retry(1),
    ).catch(this.errorHandar);          
  }

  // getUser():Observable<IUser[]>{
  //   return this.http.get<IUser[]>(this._url).catch(this.errorHandar);
          
  // }

  errorHandar(error){
    //console.log('erro',error.message);
    if(error.status !== 200){
      this.toastService.show('Server Error', {
        classname: 'bg-success text-light',
        delay: 10000 ,
        autohide: true,
        headertext: 'Success'
      });
    }
  	return Observable.throw(error.message || "Server Error");

  }

  getRoleId(){
    return localStorage.getItem('editRoleId')?localStorage.getItem('editRoleId'):'';
  }
  saveRole(roles){
     this._url=this.apiPath+"/api/roles/create";
   
     return this.http.put<any>(this._url,roles)
             .pipe(map(data => {
               //console.log(data);
               if(data.code == 1){
                localStorage.removeItem('editRoleId');
                if(data.isData==1){
                  //return data.result;
                  //return data.result;
                }
              }
               //
               this._router.navigate(['/role']);
              return true;
            })).catch(this.errorHandar);
  	//return this.http.post<any>(this._url,login).catch(this.errorHandar);
  }
//   saveRole(roles){
//     this._url=this.apiPath+"/api/roles/create";
  
//     return this.http.post<any>(this._url,roles)
//             .pipe(map(data => {
//               console.log(data);
//               if(data.code == 1){
//                localStorage.removeItem('editRoleId');
//                if(data.isData==1){
//                  //return data.result;
//                  //return data.result;
//                }
//              }
//               //
//               this._router.navigate(['/role']);
//              return true;
//            })).catch(this.errorHandar);
//    //return this.http.post<any>(this._url,login).catch(this.errorHandar);
//  }
  deleteRole(roles){
    this._url=this.apiPath+"/api/role/delete";
    let options= {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: roles,
    };
    return this.http.delete<any>(this._url,options).pipe(map(data => {
      if(data.code == 1){
        return true;
      }else{
        return false;
      }
   })).catch(this.errorHandar);
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
