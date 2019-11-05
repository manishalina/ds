import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/admin/services/module.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  constructor(private _moduleService : ModuleService,
    private _router:Router,private confirmationDialogService: ConfirmationDialogService
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
    "label":this.name,
    "url":this.url,
    "isParent":this.isParent,
    "parent_id":this.parent_id
  }
  this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to save ?')
    .then((confirmed) => {
      
      if(confirmed){
        //console.log('save',module);
    this._moduleService.saveModule(module).subscribe(data=>
      {
        if(data.code == 1){
          this._router.navigateByUrl('/module');
        }else{
          
        }
      },
      error=>this.errorMsg=error
    );
      }

    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  

   

   
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
      "label":this.name,
      "url":this.url,
      "isParent":this.isParent,
      "parent_id":this.parent_id
    }
    console.log(module);
    
  }
  


}
