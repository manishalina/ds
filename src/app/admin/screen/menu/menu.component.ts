import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private _authService:AuthService,
    private toastr: ToastrService
    ){
  }

  ngOnInit() {
  }
  logout(){
    this._authService.loggedOut();
    console.log('logout');
  }
}
