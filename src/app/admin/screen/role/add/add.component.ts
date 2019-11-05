import { Component, OnInit } from '@angular/core';
import { User } from '../../../classes/users';
import { Role } from '../../../classes/role';
import { RoleService } from '../../../services/role.service';
// import { FormBuilder } from '@angular/forms';
//import { FormControl, FormGroup } from '@angular/forms';
//import { Validators } from '@angular/forms';
//import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../../classes/employee';
import { Team } from '../../../classes/team';
import { TeamManagementService } from '../../../services/team-management.service';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

// class item {  
//   name: string;  
//   val: number;  
// }  

export class AddComponent implements OnInit {
  teamForm: FormGroup;
	isValidFormSubmitted = null;
	allSkills: Observable<any[]>;
  public modules=[];
    errorMsg = false;
    public module_name='user';
    permission:Array<String>;
    currentPermission=[];
    moduleId:any=null;
    rolename="";

  constructor(private _roleService : RoleService,
    private formBuilder: FormBuilder,
    private teamMngService: TeamManagementService
    ,private _router: Router,private confirmationDialogService: ConfirmationDialogService) { }

  public roles = [];
  public add_permission =true;
  public edit_permission =true;
  public view_permission =false;
  public delete_permission =false;
  selectedValue: string= '';  
  showPopup=false;
 
  
	
	
    ngOnInit() {
      this._roleService.getpermission().subscribe(data=>
        {
          for (var key in data) {
            data[key].selected = true;
          }
          console.log('data',data)
          this.permission = data;
        },error=>this.errorMsg=error
        );
      this._roleService.getmodule().subscribe(data=>
        {
          this.module_name = data[0]._id;
          //this.modules = data;
          let tempModule = [];
          let i=0;
          for (var key in data) {
            if(data[key].isParent){
              let obj={
                  'module':data[key],
                  'permission':this.permission,
                  'IsSelected':true,
                  'name':data[key].parent_id.name
                }
              if(!tempModule[data[key].parent_id._id])
              {
                tempModule[data[key].parent_id._id]=[];
              }
              tempModule[data[key].parent_id._id].push(obj);
              i++;
            }
            
          }
         
          for (var key in tempModule) {
            console.log(key);
            this.modules.push({'data':tempModule[key]});
          }
          console.log('module',this.modules);
        },error=>this.errorMsg=error
        );
        //console.log(this.modules);
        

    }
    setPermissionFn(id,mid){
      
      if(mid!=null)
      {
        if(this.currentPermission[mid])
        {

        }
        else
        {
          this.currentPermission[mid]=[];
        }
        if (this.currentPermission[mid].indexOf(id) == -1) {
          console.log('not found');
          this.currentPermission[mid].push(id);
        }else{
          console.log('found',this.currentPermission[mid].indexOf(id));
          this.currentPermission[mid].splice(this.currentPermission[mid].indexOf(id), 1);
          
        }
        
      }
      console.log("--------------------------",  this.currentPermission);
     
    }
    
    finalfn()
    {
      let fnobj={
        name:this.rolename,
        permission_map:[],
        role_id:""
      }

  this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to add ?')
  .then((confirmed) => {
    
    if(confirmed){
        //console.log("===========",this.currentPermission)
      for (var key in this.currentPermission) {
        //console.log("======================>"+key+"=="+this.currentPermission[key])
        let tobj={
          "module":key,
          "permission":this.currentPermission[key]
        }
        fnobj.permission_map.push(tobj);
    }
    this._roleService.saveRole(fnobj).subscribe(data=>
      this._router.navigate(['/role'])
      
     );
    }

  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    }

   
  
}
