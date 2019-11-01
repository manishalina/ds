import { Component, OnInit } from '@angular/core';
import { Login } from '../admin/classes/login';
import { AuthService } from '../auth.service';
import { HostListener } from "@angular/core";
//import  {jsonwebtoken} from "jsonwebtoken"
import { ToastService } from '../_services/toast.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _authService:AuthService,
    private toastService: ToastService,
    private _router : Router
    ) {
     // this.getScreenSize();
  }

  // @HostListener('window:resize', ['$event'])
  // getScreenSize(event?) {
  //       this.screenHeight = window.innerHeight;
  //       this.screenWidth = window.innerWidth;
  //       console.log(this.screenHeight, this.screenWidth);
  // }

  screenHeight: number;
  screenWidth: number;
  loginFlag=true;
  emailFlag=false;
  mobileFlag=false;
  public email:string;
  public password:string; 
  userModel= new Login('admin@gmail.com','123456');
  netImage:any = "../../assets/bg.png";
  auth=[];
  
  disabledScreen(){
    this.loginFlag= this.emailFlag=this.mobileFlag=false;
  }

  loadScreen(){
    console.log(this.auth);
    console.log(this.auth.length);
    if(this.auth.length >0){
      this.disabledScreen();
      console.log('get element',this.auth[0]);
      if(this.auth[0] == 'email'){
        this.emailFlag = true;
      }
      if(this.auth[0] == 'mobile'){
        this.mobileFlag = true;
      }
    }
  }
onSubmit(){
  //console.log('login',environment.token);
  //console.log('login');
  //   let obj = {mobile:true,email:true};
    
  //   for (var key in obj) {
  //     console.log("======================>"+key+"=="+obj[key])
  //       if(obj[key] == true){
  //         this.auth.push(key);
  //       }
  //     // if(key == 'email'){
  //     //   if(obj[key] == true){
  //     //     this.auth.push('emailFlag');
  //     //   }
  //     // }
    
  // }
  //this.loadScreen();
  // this._authService.loginUser(this.userModel).subscribe(resp => {
  //   console.log(resp.body);
  //   console.log(resp.headers.get('auth-token'));
  // });
  this._authService.loginUser(this.userModel).subscribe(data=>
    {
    //console.log(data.body);
    //console.log(data.headers.get('auth-token'));
      let mydata;
      mydata =this._authService.decrypt(data.body.data,'kingjuliean');
      if(mydata.code==1){
        if(mydata.isData==1){
          // this.toastService.show(mydata.message, {
          //   classname: 'bg-success text-light',
          //   delay: 2000 ,
          //   autohide: true,
          //   headertext: 'Error'
          // });
          environment.token= mydata.result.token.auth_token;
          environment.isLogin = true;
          environment.username=  mydata.result.profile.name;
          this._router.navigateByUrl('/dashboard');
          //window.location.href= '/dashboard';
        }
      }else{
        this.toastService.show("Error ! "+mydata.message, {
          classname: 'bg-danger text-light',
          delay: 200000 ,
          autohide: true,
          headertext: ' '
        });
        //console.log(mydata.message)
      }
    },
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
   // console.log('login',environment.token);
  }

}
