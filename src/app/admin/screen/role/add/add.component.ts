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
  // bioSection = new FormGroup({
  //   name: new FormControl(''),
  //   moduleDetail: new FormGroup({
  //     module: new FormControl(''),
  //     permission:  new FormGroup({
  //       pr: new FormControl(''),
  //     })
  //   })
  //   });
 

    data=[];
    userModel=
    {
    'name':'name',
    'permission_map':[
      {'module':'1',
      'permission':['2','1']
      },
      {'module':'2',
      'permission':['2','1']
      }
    ]
    };
    
    getModuleData(e){
      console.log(e)
    }
    getPermissionData(e){
      console.log(e)
    }
  constructor(private _roleService : RoleService,
    private formBuilder: FormBuilder,
    private teamMngService: TeamManagementService) { }

  errorMsg = '';
  public roles = [];
  public add_permission =true;
  public edit_permission =true;
  public view_permission =false;
  public delete_permission =false;
  public permissions = [
    {'name':'add'},
    {'name':'edit'},
    {'name':'view'},
    {'name':'delete'},
  ]

  public modules = [
    {'name':'m1'},
    {'name':'m2'},
    {'name':'m3'},
  ]

  departments = [
    {name:'one', id:'1'},
    {name:'two', id:'2'},
    {name:'three', id:'3'},
  ]
  items = [
    {name: 'One', val: 1}, {name: 'Two', val: 2}, {name: 'Three', val: 3}
  ];  
  selectedValue: string= '';  
  showPopup=false;
  createEmpFormGroup() {
		return this.formBuilder.group({
			empName: ['', [Validators.required]],
			age: ['', [Validators.required, Validators.min(21)]],
			skill: ['', [Validators.required]],
		})
  }
  // addEmployee() {
	// 	let fg = this.createEmpFormGroup();
	// 	this.employees.push(fg);
  // }
  get teamName() {
		return this.teamForm.get('teamName');
	}
	get employees(): FormArray {
		return this.teamForm.get('employees') as FormArray;
	}
	addEmployee() {
		let fg = this.createEmpFormGroup();
		this.employees.push(fg);
	}
	deleteEmployee(idx: number) {
		this.employees.removeAt(idx);
	}
	onFormSubmit() {
    console.log('log');
		this.isValidFormSubmitted = false;
		if (this.teamForm.invalid) {
			return;
    }
    console.log('log two');
		this.isValidFormSubmitted = true;
		let team: Team = this.teamForm.value;
		this.teamMngService.saveTeam(team);
		this.teamForm.reset();
	}
	resetTeamForm() {
		this.teamForm.reset();
	}
    ngOnInit() {
      this.allSkills = this.teamMngService.getSkills();

      this.teamForm = this.formBuilder.group({
        teamName: ['', Validators.required],
        employees: this.formBuilder.array(
          [this.createEmpFormGroup()],
          [Validators.required])
      });

      //console.log(this.bioSection.value);
       this._roleService.getRole().subscribe(data=>
            this.roles = data,
            error=>this.errorMsg=error
            );

            // getmodule
            // getpermission

            this._roleService.getpermission().subscribe(data=>
              this.permissions = data,
              error=>this.errorMsg=error
              );

              this._roleService.getmodule().subscribe(data=>
                this.modules = data,
                error=>this.errorMsg=error
                );
            //console.log('load role',this.roles)

    }
    //userModel = new Role('',[]);
   
    
    //role = new Role('','');
    openPopup(){
      console.log('opened');
      this.showPopup = true;
     }
    
     
     closePopup(){
      this.showPopup = false;
     }
  
}
