import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../admin/services/role.service';
@Component({
  selector: 'my-test',
  templateUrl: 'test.component.html',
})
export class TestComponent implements OnInit {
    public myForm: FormGroup;

    constructor(private _fb: FormBuilder,private _roleService:RoleService) { }
    errorMsg = false;
    //public module_name='user';
    public module='user';
    permission:Array<String>;
    ngOnInit() {
    this._roleService.getmodule().subscribe(data=>
      {
        this.module = data[0];
        this.modules = data;
      },error=>this.errorMsg=error
      );

      this._roleService.getpermission().subscribe(data=>
        {
          this.permission = data;
          console.log('pre',data);
          this.loadForm();
        },error=>this.errorMsg=error
        );

   
        // this.myForm = this._fb.group({
        //     name: ['', [Validators.required, Validators.minLength(5)]],
        //     id: ['', [Validators.required, Validators.minLength(5)]],
        //     permission_map: this._fb.array([
        //         this.initAddress(this.module_name),
        //     ])
        // });
    }

    loadForm(){
      console.log('permission',this.permission);
      this.myForm = this._fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        //id: ['', [Validators.required, Validators.minLength(5)]],
        permission_map: this._fb.array([
            this.initAddress(this.module),
        ])
      });
    }

    initAddress(module) {
        return this._fb.group({
            module: [module._id, Validators.required],
            name: [module.name, Validators.required],
            permission: this._fb.array([
              this.initNumber()
            ])
        });
    }
    public modules=[];
    //public module_name='name1';
    getModuleName(val)
    {
      const control = <FormArray>this.myForm.controls['permission_map'];
      control.push(this.initAddress(this.modules[val]));
    }
    initNumber() {
      return this._fb.group({
        add: [false, Validators.required],
        edit: [false, Validators.required],
        view: [false, Validators.required],
        delete: [false, Validators.required]
      })
    }
    
    // addAddress() {
    //   const control = <FormArray>this.myForm.controls['permission_map'];
    //   control.push(this.initAddress(this.module_name));
    // }

    removeAddress(i: number) {
      const control = <FormArray>this.myForm.controls['permission_map'];
      control.removeAt(i);
    }

    addNumber(permission_map): void {
      const control = <FormArray>permission_map.controls.permission;
      control.push(this.initNumber());
    }

    removeNumber(permission_map,j: number) {
      const control = <FormArray>permission_map.controls.permission;
      control.removeAt(j);
    }

  save(formData) {
    console.log(formData.value)
  }
}