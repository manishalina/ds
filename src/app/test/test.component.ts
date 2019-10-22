import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-test',
  templateUrl: 'test.component.html',
})
export class TestComponent implements OnInit {
    public myForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            id: ['', [Validators.required, Validators.minLength(5)]],
            permission_mep: this._fb.array([
                this.initAddress(this.module_name),
            ])
        });
    }

    initAddress(module_name) {
        return this._fb.group({
            module: [module_name, Validators.required],
            phonenumber: this._fb.array([
              this.initNumber()
            ])
        });
    }
    public modules=[
      {
        "name":"name1",
        "_id":1,
        "isSelected":false
      },
      {
        "name":"name2",
        "_id":2,
        "isSelected":false
      }
    ];
    public module_name='name1';
    getModuleName(val)
    {
      const control = <FormArray>this.myForm.controls['permission_mep'];
      control.push(this.initAddress(this.modules[val].name));
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
    //   const control = <FormArray>this.myForm.controls['permission_mep'];
    //   control.push(this.initAddress(this.module_name));
    // }

    removeAddress(i: number) {
      const control = <FormArray>this.myForm.controls['permission_mep'];
      control.removeAt(i);
    }

    addNumber(permission_mep): void {
      const control = <FormArray>permission_mep.controls.phonenumber;
      control.push(this.initNumber());
    }

    removeNumber(permission_mep,j: number) {
      const control = <FormArray>permission_mep.controls.phonenumber;
      control.removeAt(j);
    }

  save(formData) {
    console.log(formData.value)
  }
}