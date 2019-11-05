import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
public modules:any;
public errorMsg:any;
  constructor(private _moduleService : ModuleService,
    private _router:Router,private confirmationDialogService: ConfirmationDialogService
    ) { }
  pageTitle='Module List'
  ngOnInit() {
   this.loadModule();
  
  }

  loadModule(){
    this._moduleService.getmodule().subscribe(data=>
      {
        console.log('module',data);
        // let tempModule = [];
        // let i=0;
        // for (var key in data) {
        //   if(data[key].isParent){
        //     let obj={
        //         'module':data[key],
        //         'permission':[],
        //         'name':data[key].parent_id.name
        //       }
        //     if(!tempModule[data[key].parent_id._id])
        //     {
        //       tempModule[data[key].parent_id._id]=[];
        //     }
        //     tempModule[data[key].parent_id._id].push(obj);
        //     i++;
        //   }
          
        // }
        // console.log('final',tempModule);
        console.log(data);
        this.modules = data;
      },
      error=>this.errorMsg=error
      );
  }
  editmodule(id){

    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to edit ?')
    .then((confirmed) => {
      
      if(confirmed){
        localStorage.removeItem("editModuleId");
        localStorage.setItem("editModuleId", id.toString());
        this._router.navigate(['module-edit']);
      }

    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  
  }
  
  deleteRole(id): void {

    let obj = {'module_id':id};
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ?')
    .then((confirmed) => {
      
      if(confirmed){
        this._moduleService.deleteModule(obj).subscribe(data=>
          {
            if(data){
             this.loadModule();
            }
          },
           error=>this.errorMsg=error
           );
      }

    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    

   
  
    
  }
}
