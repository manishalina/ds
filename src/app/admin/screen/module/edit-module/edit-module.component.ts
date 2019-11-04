import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/admin/services/module.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';

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

  constructor(private _moduleService:ModuleService,
     private _router:Router,
     private toastService: ToastService) { }

  ngOnInit() {
    this._moduleService.getmodule().subscribe(data=>
      {
        console.log('data',data)
        // let tempModule:any = data.find(module =>module._id === this._moduleService.getModuleId());
        // this.name=tempModule.name;
        // this.url=tempModule.url;
        // this.parent_id=tempModule.isParent?tempModule.parent_id._id:'';
        // this.isParent=false;
        // console.log('pa', tempModule);
        // console.log('pa', this.isParent);
        
      },
      error=>this.errorMsg=error
    );

    
    // this._moduleService.getmodule().subscribe(data=>
    //   this.modules = data,
    //   error=>this.errorMsg=error
    // );
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
    //console.log(module);
    
  }

  onsave() {
    let module = {
    "name":this.name,
    "url":this.url,
    "isParent":this.isParent,
    "parent_id":this.parent_id,
    "module_id":this._moduleService.getModuleId()
  }
    this._moduleService.saveModule(module).subscribe(data=>
      {
        if(data.code == 1){
          this.toastService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 200000 ,
            autohide: true,
            headertext: ' Notification !'
          });
          this._router.navigateByUrl('/module');
        }else{
          this.toastService.show(data.message, {
            classname: 'bg-danger text-light',
            delay: 200000 ,
            autohide: true,
            headertext: ' Error !'
          });
        }
      },
      error=>this.errorMsg=error
    );
  }
}
