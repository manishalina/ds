import { Component, OnInit } from '@angular/core';
import { Login } from '../admin/classes/login';
import { AuthService } from '../auth.service';
import { HostListener } from "@angular/core";
//import  {jsonwebtoken} from "jsonwebtoken"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



   screenHeight: number;
    screenWidth: number;

    constructor(private _authService:AuthService) {
        this.getScreenSize();
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          console.log(this.screenHeight, this.screenWidth);
    }
public email:string;

public password:string; 
userModel= new Login('','');
netImage:any = "../../assets/bg.png";
onSubmit(){
  //console.log(this.userModel);
  //return false;
  this._authService.loginUser(this.userModel).subscribe(data=>
    console.log(data),
    error=>this.errorMsg=error
   );
}
public data =[
  { name: "John", age: 31, city: "New York" },
  { name: "John", age: 31, city: "New York" },
  { name: "John", age: 31, city: "New York" },
  { name: "John", age: 31, city: "New York" },
  { name: "John", age: 31, city: "New York" },
  { name: "John", age: 31, city: "New York" },
  { name: "John", age: 31, city: "New York" },
  { name: "John", age: 31, city: "New York" },
]
public errorMsg;
public res;
  ngOnInit() {
    // console.log('--------------');
    // console.log(this.data);
    // console.log('--------------');
    // this.res=this._authService.encrypt(this.data,'kingjuliean');
    // console.log(this.res);
    // console.log('--------------');
    // this.res=this._authService.decrypt(this.res,'kingjuliean');
    // console.log(this.res);
  }

}
