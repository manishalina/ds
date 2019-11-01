import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/users';
import { ToastrComponentlessModule } from 'ngx-toastr';


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
  roles = [];
  departments = [];
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
  userModel = new User('','','');
  onSubmit(){
    this._userService.saveUser(this.userModel).subscribe(data=>{
      console.log(data);
      console.log("data",this.roles)
    },
    error=>this.errorMsg=error
  )
    console.log(this.userModel);
  }
  openPopup(){
    console.log('opened');
    this.showPopup = true;
   }
   closePopup(){
    this.showPopup = false;
   }

}
