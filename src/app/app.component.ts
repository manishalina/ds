import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'biadmin';
  isLogin = true;
  constructor(
    private _authService:AuthService,
    private toastr: ToastrService
    ){
  }
  showToaster(){
    //console.log('hello');
    this.toastr.success("Hello, I'm the toastr message.")
  }
  logout(){
    this._authService.loggedOut();
    console.log('logout');
  }
}
