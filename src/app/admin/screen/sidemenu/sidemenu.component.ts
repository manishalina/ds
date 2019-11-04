import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  constructor(
    private _authService:AuthService,
    private toastr: ToastrService,
    private _moduleService:ModuleService
    ){
  }
  modules=[];
  errorMsg='';
  ngOnInit() {
    this._moduleService.getmodule().subscribe(data=>
      {
        console.log('module list',data)
        this.modules = data
      },
      error=>this.errorMsg=error
    );
  }

}
