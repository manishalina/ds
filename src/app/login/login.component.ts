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

  final(){
    //console.log('otp',this.otp);
    
    this._authService.twoFactorAuth({}).subscribe(
    data=>{
      // console.log('header',data.headers);
      // console.log('body',data.body);
      environment.token = data.headers.get('auth-token');
      let tempdata1 = data.body.data;
      let tempdata :any
      let modules=[];
      tempdata = this._authService.decrypt(tempdata1,environment.encToken);
      console.log('body',tempdata);
      //console.log('body',tempdata.);
      if(tempdata.code==1){
        if(tempdata.isData==1){
          environment.assignModule = tempdata.result.modules;

          // console.log('testMenu',tempdata.result.testMenu);
          // let tempdt =tempdata.result.testMenu;
          // let tempModule = [];
          // let i=0;
          // for (var key in tempdt) {
          //   if(tempdt[key].isParent){
          //     let obj={
          //         label: tempdt[key].name,
          //         link: tempdt[key].url,
          //         icon: 'favorite',
          //         //'module':tempdt[key],
          //         'permission':[],
          //         'parent_name':tempdt[key].parent_id.name,
          //         'parent_id':tempdt[key].parent_id._id
          //       }
          //     if(!tempModule[tempdt[key].parent_id._id])
          //     {
          //       tempModule[tempdt[key].parent_id._id]=[];
          //     }
          //     tempModule[tempdt[key].parent_id._id].push(obj);
          //     i++;
          //   }
            
          // }
          // for (var key in tempModule) {
          //   console.log(key , tempModule[key]);
          //   console.log('--------------');
          //   modules.push({'_id':key,link:'','label':tempModule[key][0].parent_name,"items":tempModule[key]});
          //   //modules.push({'data':tempModule[key]});
          // }
          // console.log('final',modules);
          // console.log('individual_permission',tempdata.result.permission.individual_permission);
          // console.log(tempdata.result.permission.system_permission);
          // console.log(tempdata.result.permission.system_permission.role.permission_map);
          // let assignModule = tempdata.result.permission.system_permission.role.permission_map;
          // environment.assignModule = assignModule;

          console.log('env',environment.assignModule);
           this.disabledScreen();
           environment.isLogin = true;
           environment.username = tempdata.result.profile.name;
           this._router.navigateByUrl('/dashboard'); 
           this.otp = '';
        }
      }else{
        alert('error');
      }
      environment.token = data.headers.get('auth-token');
    },error=>this.errorMsg=error)
  }
  otpVerify(){
    console.log('otp',this.otp);
    
    this._authService.twoFactorAuth({otp:this.otp}).subscribe(
    data=>{
      console.log('header',data.headers);
      console.log('body',data.body);
      environment.token = data.headers.get('auth-token');
      let tempdata1 = data.body.data;
      let tempdata :any
      tempdata = this._authService.decrypt(tempdata1,environment.encToken);

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
           if(tempdata.result.nextScreen == 'final'){
            this.final();
          }
           this.otp = '';
        }
      }else{
          this.toastService.show(tempdata.message, {
            classname: 'bg-danger text-light',
            delay: 2000 ,
            autohide: true,
            headertext: 'Opss Error!!!'
          });
      }
      environment.token = data.headers.get('auth-token');
    }, error=>this.errorMsg=error)
  }

  otpResend(){
    console.log('otp',this.otp);
    
    this._authService.otpSend({otp:this.otp}).subscribe(
    data=>{
      console.log('header',data.headers);
      console.log('body',data.body);
      environment.token = data.headers.get('auth-token');
      let tempdata1 = data.body.data;
      let tempdata :any
      tempdata = this._authService.decrypt(tempdata1,environment.encToken);
      console.log('tempdata',tempdata);
      if(tempdata.code==1){
        console.log('sadasadsas',tempdata.message)
           this.toastService.show(tempdata.message, {
            classname: 'bg-success text-light',
            delay: 10000,
            autohide: true,
            headertext: 'Error'
          });
        if(tempdata.isData==1){
            
            this.otp = '';
        }
      }else{
        alert('error');
      }
      
    }, error=>this.errorMsg=error)
  }

onSubmit(){

  
  this._authService.loginUser(this.userModel).subscribe(data=>
    {
      let mydata;
      mydata =this._authService.decrypt(data.body.data,'kingjuliean');
        if(mydata.code==1){
        if(mydata.isData==1){
         
          //console.log('token',data.headers.get('auth-token'));
          environment.token = data.headers.get('auth-token');
          //console.log('mydata',mydata);
          if(mydata.code == '1'){
            if(mydata.isData == '1'){

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
               
                
              }else{
                if(mydata.result.nextScreen == 'final'){
                  console.log('final')
                  this.final();
                }
              }
            }

          }
        }
      }else{
        this.toastService.show("Error ! "+mydata.message, {
          classname: 'bg-danger text-light',
          delay: 200000 ,
          autohide: true,
          headertext: 'Opss!!  '
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
