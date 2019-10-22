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
                this.initAddress(),
            ])
        });
    }

    initAddress() {
        return this._fb.group({
            module: ['', Validators.required],
            phonenumber: this._fb.array([
              this.initNumber()
            ])
        });
    }

    initNumber() {
      return this._fb.group({
        add: ['0', Validators.required],
        edit: ['0', Validators.required],
        view: ['0', Validators.required],
        delete: ['0', Validators.required]
      })
    }
    
    addAddress() {
      const control = <FormArray>this.myForm.controls['permission_mep'];
      control.push(this.initAddress());
    }

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