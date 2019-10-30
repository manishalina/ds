import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/admin/services/module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  constructor(private _moduleService : ModuleService,
    private _router:Router
    ) { }
  pageTitle='Module Add'
public name:any;
public url:any;
public isParent:any;
public parent_id:any;
public modules:any; 
public errorMsg:any; 
  onsave() {
    let module = {
    "name":this.name,
    "url":this.url,
    "isParent":this.isParent,
    "parent_id":this.parent_id
  }

    console.log('save',module);
    this._moduleService.saveModule(module).subscribe(data=>
      console.log(data),
      error=>this.errorMsg=error
    );

    this._router.navigateByUrl('/module');
  }

  ngOnInit() {
    this._moduleService.getmodule().subscribe(data=>
      this.modules = data,
      error=>this.errorMsg=error
      );
  }
  onChange(val){
    if(val == ''){
      this.isParent=false;
    }else{
      this.isParent=true;
    }
    
    let module = {
      "name":this.name,
      "url":this.url,
      "isParent":this.isParent,
      "parent_id":this.parent_id
    }
    console.log(module);
    
  }
  


}
