import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/admin/services/module.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

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
     private toastService: ToastService,private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this._moduleService.getmodule().subscribe(data=>
      {
        //console.log('data',data)
        //console.log('id',this._moduleService.getModuleId())

        let tempModule:any = data.find(module =>module._id === this._moduleService.getModuleId());
        //console.log(tempModule);
        this.name=tempModule.label;
        this.url=tempModule.url;
        this.parent_id=tempModule.isParent?tempModule.parent_id._id:'';
        this.isParent=false;
        //  console.log('name', this.name);
        //  console.log('url', this.url);
        // console.log('pa', this.isParent);
        
      },
      error=>this.errorMsg=error
    );


    this._moduleService.getmodule().subscribe(data=>
      this.modules = data,
      error=>this.errorMsg=error
    );
  }


  onChange(val){
    console.log('change')
    if(val == ''){
      this.isParent=false;
    }else{
      this.isParent=true;
    }
    
    let module = {
      "label":this.name,
      "url":this.url,
      "isParent":this.isParent,
      "parent_id":this.parent_id
    }
    //console.log(module);
    
  }

  onsave() {
    let module = {
    "label":this.name,
    "url":this.url,
    "isParent":this.isParent,
    "parent_id":this.parent_id,
    "module_id":this._moduleService.getModuleId()
  }

  this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to update ?')
    .then((confirmed) => {
      
      if(confirmed){
     
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

    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  

    
  }
}
