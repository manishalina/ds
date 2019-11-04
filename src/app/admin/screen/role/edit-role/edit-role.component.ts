import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isNgTemplate } from '@angular/compiler';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  teamForm: FormGroup;
	isValidFormSubmitted = null;
  allSkills: Observable<any[]>;
  masterSelected:boolean;
  checklist:any;
  checkedList:any;
  public modules=[];
    errorMsg = false;
    public module_name='user';
    permission:Array<String>;
    currentPermission=[];
    moduleId:any=null;
    rolename:any;
    roleid:any;
  constructor(
    private _roleService : RoleService,
    private formBuilder: FormBuilder,
    private _router: Router,private confirmationDialogService: ConfirmationDialogService
    ){}

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
      console.log(data);
      this.module_name = data[0]._id;
      this.modules = data;

      //console.log('module',this.modules);
    },error=>this.errorMsg=error
    );
    //console.log(this.modules);
    this._roleService.getpermission().subscribe(data=>
      {
        this.permission = data;
        //this.loadForm();
      },error=>this.errorMsg=error
      );

        this._roleService.getRole().subscribe(data=>
          {
            //this.module_name = data[0]._id;
            //console.log('role id ',this._roleService.getRoleId())
           
            //
            let tempRole:any = data.find(role =>role._id === this._roleService.getRoleId());
            let permission =tempRole.permission_maps;
             //this.roles = data[0];
            //console.log('role  final',a);
            let final =[];
            for (var key in permission) {
              final[permission[key].module._id]=[];
              var moduleIds = (permission[key].permission).map(function (m) {
                final[permission[key].module._id].push(m._id);
                return m._id
              });
              
          }
          this.currentPermission = final;

          this.rolename = tempRole.name;
          this.roleid = tempRole._id;
        },error=>this.errorMsg=error
      );
      this.masterSelected = false;
      this.checklist = [
        {id:1,value:'Elenor Anderson',isSelected:false},
        {id:2,value:'Caden Kunze',isSelected:true},
        {id:3,value:'Ms. Hortense Zulauf',isSelected:true},
        {id:4,value:'Grady Reichert',isSelected:false},
        {id:5,value:'Dejon Olson',isSelected:false},
        {id:6,value:'Jamir Pfannerstill',isSelected:false},
        {id:7,value:'Aracely Renner DVM',isSelected:false},
        {id:8,value:'Genoveva Luettgen',isSelected:false}
      ];
      this.getCheckedItemList();
}
checkUncheckAll() {
  for (var i = 0; i < this.checklist.length; i++) {
    this.checklist[i].isSelected = this.masterSelected;
  }
  this.getCheckedItemList();
}
isAllSelected() {
  this.masterSelected = this.checklist.every(function(item:any) {
      return item.isSelected == true;
    })
  this.getCheckedItemList();
}

getCheckedItemList(){
  this.checkedList = [];
  for (var i = 0; i < this.checklist.length; i++) {
    if(this.checklist[i].isSelected)
    this.checkedList.push(this.checklist[i]);
  }
  this.checkedList = JSON.stringify(this.checkedList);
}
//public assignModule:any;
checkIfInMediaFromLead(pid,mid){
  let i=0;
  for (var key in this.currentPermission) {
    if(mid == key){
      if (this.currentPermission[key].indexOf(pid) != -1) {
        return true;
      }
    }

  }

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
      
     
    }
    
    finalfn()
    {
      let fnobj={
        name:this.rolename,
        permission_map:[],
        role_id:this.roleid
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
    this._roleService.saveRole(fnobj).subscribe(data=>{
      this._router.navigate(['/role']);
   
    }
      ,
      error=>this.errorMsg=error
     );
    }

  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    }

}
