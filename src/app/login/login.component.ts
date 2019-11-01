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
    this.loginFlag= this.emailFlag=false;
  }

  loadScreen(){
    //console.log(this.auth);
    //console.log(this.auth.length);
    if(this.auth.length >0){
      this.disabledScreen();
      //console.log('get element',this.auth[0]);
      if(this.auth[0] == 'email'){
        this.emailFlag = true;

      }
      if(this.auth[0] == 'mobile'){
        this.mobileFlag = true;
      }
    }
  }
  OTPLabel = "Email OTP";
  otp = "1";
  otpVerify(){
    console.log('otp',this.otp);
    
    this._authService.twoFactorAuth({otp:this.otp}).subscribe(
    data=>{
      console.log('header',data.headers);
      console.log('body',data.body);
      environment.token = data.headers.get('auth-token');
      let tempdata = data.body.data;
      

      if(tempdata.code==1){
        if(tempdata.isData==1){
            this.disabledScreen();
            if(tempdata.result.nextScreen == 'email'){
              this.emailFlag=true;
              this.OTPLabel = "Email OTP";
            }
            if(tempdata.result.nextScreen == 'mobile'){
              this.emailFlag=true;
              this.OTPLabel = "Mobile OTP";
              
           }
           this.otp = '';
        }
      }
      environment.token = data.headers.get('auth-token');
    }, error=>this.errorMsg=error)
  }
onSubmit(){

  
  this._authService.loginUser(this.userModel).subscribe(data=>
    {
      let mydata;
      mydata =this._authService.decrypt(data.body.data,'kingjuliean');
        if(mydata.code==1){
        if(mydata.isData==1){
          //   this.toastService.show(mydata.message, {
          //   classname: 'bg-success text-light',
          //   delay: 2000 ,
          //   autohide: true,
          //   headertext: 'Error'
          // });
         //environment.token= mydata.result.token.auth_token;
          //environment.username=  mydata.result.profile.name;
          console.log('token',data.headers.get('auth-token'));
          environment.token = data.headers.get('auth-token');
          console.log('mydata',mydata);

          if(mydata.result.two_factor_authentication){
            this.disabledScreen();
            if(mydata.result.nextScreen == 'email'){
              this.emailFlag=true;
              this.OTPLabel = "Email OTP";
            }
            if(mydata.result.nextScreen == 'mobile'){
              this.emailFlag=true;
              this.OTPLabel = "Mobile OTP";
            }
          }


          // environment.isLogin = true;
          // this._router.navigateByUrl('/dashboard'); 
           //localStorage.setItem('islogin', mydata.result.token.auth_token);
          // if(!mydata.result.two_factor_authentication)
          // {
          //  console.log("================================dashboard");
          //  environment.isLogin = true;
          //   this._router.navigateByUrl('/dashboard'); 
          // }
          // else{
          //  // console.log("================================"+mydata.result.two_factor_authentication);
          //   if(mydata.result.two_factor_authentication_type.email)
          //   {
          //     this.emailFlag=true;
          //     this.loginFlag=false;
          //   }
            
           
          // }
         
          //environment.token= mydata.result.token.auth_token;
          //console.log('login token',environment.token);
          // console.log(mydata.result.token.auth_token);
           //console.log("================================"+mydata);
          //environment.username=  mydata.result.profile.name;
          //this._router.navigateByUrl('/dashboard');

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

  }

}
