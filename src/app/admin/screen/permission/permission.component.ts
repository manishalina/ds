import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  public permissions:any;
  public errorMsg:any;
    constructor(private _permissionService : PermissionService,
      private _router:Router
      ) { }
    pageTitle='Permission List'
    ngOnInit() {
      this._permissionService.getPermission().subscribe(data=>
        this.permissions = data,
        error=>this.errorMsg=error
        );
    }

}
