import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//inport {}
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router:Router,private _authService:AuthService){}
  canActivate():boolean{
    if(this._authService.loggedIn()){
      return true;
    }else{
      this._router.navigate(['/login']);
      return false;
    }
  }
  
}
