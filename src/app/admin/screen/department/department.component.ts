import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

public departments:any;
public errorMsg:any;
  constructor( private _departmentService:DepartmentService) { }
pageTitle="Department List";
  ngOnInit() {
    //getDepartment
    this._departmentService.getDepartment().subscribe(data=>
      this.departments = data,
      error=>this.errorMsg=error
      );
  }



}
