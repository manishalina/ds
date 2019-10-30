import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/admin/services/module.service';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {
  public name:any;
  public url:any;
  public isParent:any;
  public parent_id:any;
  public modules:any; 
  public errorMsg:any; 

  constructor(private _moduleService:ModuleService) { }

  ngOnInit() {
    this._moduleService.getmodule().subscribe(data=>
      {
        let tempModule:any = data.find(module =>module._id === this._moduleService.getModuleId());
        this.name=tempModule.name;
        this.url=tempModule.url;
        this.parent_id=tempModule.isParent?tempModule.parent_id._id:'';
        this.isParent=false;
        console.log('pa', tempModule);
        console.log('pa', this.isParent);
        
      },
      error=>this.errorMsg=error
    );

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

  onsave() {
    let module = {
    "name":this.name,
    "url":this.url,
    "isParent":this.isParent,
    "parent_id":this.parent_id,
    "module_id":this._moduleService.getModuleId()
  }
    console.log('save',module);
    this._moduleService.saveModule(module).subscribe(data=>
      console.log(data),
      error=>this.errorMsg=error
    );
  }
}
