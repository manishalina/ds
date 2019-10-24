import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../admin/services/role.service';
@Component({
  selector: 'my-test',
  templateUrl: 'test2.component.html',
})
export class Test2Component implements OnInit {
    //public myForm: FormGroup;

    constructor(private _fb: FormBuilder,private _roleService:RoleService) { }
    public modules=[];
    errorMsg = false;
    public module_name='user';
    permission:Array<String>;
    currentPermission=[];
    moduleId:any=null;
    rolename="";

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
    
   
    // getModuleName(val)
    // {
    //   const control = <FormArray>this.myForm.controls['permission_map'];
    //   control.push(this.initAddress(this.modules[val]._id));
    //   this.moduleId=this.modules[val]._id
    // }
    // initNumber() {
    //   return this._fb.group({
    //     add: [false, Validators.required],
    //     edit: [false, Validators.required],
    //     view: [false, Validators.required],
    //     delete: [false, Validators.required]
    //   })
    // }
    
   

   

  save(fm) {
    this.finalfn()
  }



  // removeAddress(i: number) {
  //   const control = <FormArray>this.myForm.controls['permission_map'];
  //   control.removeAt(i);
  // }

  // addNumber(permission_map): void {
  //   const control = <FormArray>permission_map.controls.permission;
  //   control.push(this.initNumber());
  // }

  // removeNumber(permission_map,j: number) {
  //   const control = <FormArray>permission_map.controls.permission;
  //   control.removeAt(j);
  // }
 // addAddress() {
    //   const control = <FormArray>this.myForm.controls['permission_map'];
    //   control.push(this.initAddress(this.module_name));
    // }

   //   loadForm(){
  //     console.log('permission',this.permission);
  //     this.myForm = this._fb.group({
  //       name: ['', [Validators.required, Validators.minLength(5)]],
  //       //id: ['', [Validators.required, Validators.minLength(5)]],
  //       permission_map: this._fb.array([
  //           this.initAddress(this.module_name),
  //       ])
  //     });
  //   }
  //   initAddress(module_name) {
  //     return this._fb.group({
  //         module: [module_name, Validators.required],
  //         permission: this._fb.array(
  //           this.currentPermission
  //           //this.permission
  //           //this.getPermissionId(this.permission)
  //         ),
  //         permission_name: this._fb.array(
  //           //this.permission
  //           this.getPermissionName(this.permission)
  //         )
  //     });
  // }
    // getPermissionId(obj :Array<any>) {
    //   var newarray =  obj.map(data=>{
    //     return data._id;
    //   });
    //   console.log(newarray);
    //   return  newarray;
    // }
    // getPermissionName(obj :Array<any>) {
    //   var newarray =  obj.map(data=>{
    //     return data.name;
    //   });
    //   console.log(newarray);
    //   return  newarray;
    // }
}