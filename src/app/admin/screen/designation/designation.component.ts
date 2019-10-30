import { Component, OnInit } from '@angular/core';
import { DesignationService } from '../../services/designation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  public designations:any;
  public errorMsg:any;
    constructor(private _designationService : DesignationService,
      private _router:Router
      ) { }
    pageTitle='Designation List'
    ngOnInit() {
      this._designationService.getdesignation().subscribe(data=>
        this.designations = data,
        error=>this.errorMsg=error
        );
    }
    

}
