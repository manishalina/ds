import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
public modules:any;
public errorMsg:any;
  constructor(private _moduleService : ModuleService,
    private _router:Router
    ) { }
  pageTitle='Module List'
  ngOnInit() {
   this.loadModule();
  }

  loadModule(){
    this._moduleService.getmodule().subscribe(data=>
      this.modules = data,
      error=>this.errorMsg=error
      );
  }
  editmodule(id){
    localStorage.removeItem("editModuleId");
    localStorage.setItem("editModuleId", id.toString());
    this._router.navigate(['module-edit']);
  }
  deleteRole(id): void {
    let obj = {'module_id':id};
    this._moduleService.deleteModule(obj).subscribe(data=>
     {
       if(data){
        this.loadModule();
       }
     },
      error=>this.errorMsg=error
      );
  
    
  }
}
