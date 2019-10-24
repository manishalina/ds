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
    private teamMngService: TeamManagementService) { }

  public roles = [];
  public add_permission =true;
  public edit_permission =true;
  public view_permission =false;
  public delete_permission =false;
  selectedValue: string= '';  
  showPopup=false;
 
  
	
	
    ngOnInit() {
     
      this._roleService.getmodule().subscribe(data=>
        {
          this.module_name = data[0]._id;
          this.modules = data;

          console.log('module',this.modules);
        },error=>this.errorMsg=error
        );
        //console.log(this.modules);
        this._roleService.getpermission().subscribe(data=>
          {
            this.permission = data;
            //this.loadForm();
          },error=>this.errorMsg=error
          );

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
      console.log(data),
      error=>this.errorMsg=error
     );
    
    console.log("final===========",fnobj)
    }

   
  
}
