import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  constructor(
    private _authService:AuthService,
    private toastr: ToastrService
    ){
  }
  ngOnInit() {
  }

}
