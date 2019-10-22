import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/users';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _userService:UserService) { }
  errorMsg = '';
  pageTitle = 'User List';
  public users =[];
  roles = [
    {name:'admin', id:'1'},
    {name:'manager', id:'2'},
    {name:'Operator', id:'3'},
  ];
  departments = [
    {name:'one', id:'1'},
    {name:'two', id:'2'},
    {name:'three', id:'3'},
  ];
  ngOnInit() {
  console.log('user records');
    
  this._userService.getUser().subscribe(data=>{
     //console.log("data",data.data)
     this.users =data;
    },
    error=>this.errorMsg=error
    );


    this._userService.getRol().subscribe(data=>{
        this.roles =data;
        console.log("data",this.roles)
      },
      error=>this.errorMsg=error
    );

    this._userService.getDepartment().subscribe(data=>{
        this.departments =data;
        console.log("data",this.roles)
      },
      error=>this.errorMsg=error
    );
    
  }

 

  showPopup=false;
  userModel = new User('','','','');
  openPopup(){
    console.log('opened');
    this.showPopup = true;
   }
   closePopup(){
    this.showPopup = false;
   }

}
