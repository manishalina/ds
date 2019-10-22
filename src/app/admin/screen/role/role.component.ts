import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/users';
import { Role } from '../../classes/role';
import { RoleService } from '../../services/role.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

// class item {  
//   name: string;  
//   val: number;  
// }  

export class RoleComponent implements OnInit {
  // {
  //   "name":"ufasdf",
  //   "permission_map":[
    
  //   {"module":"5da6d68ce100680f636f2533",
    
  //   "permission":
  //   ["5da6d83f5d878f0f63c5836d","5da6d8155d878f0f63c5836c"]
    
  //   }
  //   ],
    
  //   "role_id":""
  //   }
  constructor(private _roleService : RoleService) { }

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

    ngOnInit() {

       this._roleService.getRole().subscribe(data=>
            this.roles = data,
            error=>this.errorMsg=error
            );

            // getmodule
            // getpermission

            // this._roleService.getpermission().subscribe(data=>
            //   console.log('getpermission',data),
            //   error=>this.errorMsg=error
            //   );
            //console.log('load role',this.roles)

    }
  
   
   
  

    userModel = new User('','','','');
    //role = new Role('','');
    openPopup(){
      console.log('opened');
      this.showPopup = true;
     }
    
     
     closePopup(){
      this.showPopup = false;
     }
  
}
