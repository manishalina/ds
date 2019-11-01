import { Component, OnInit } from '@angular/core';

import { VerifyService} from '../verify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private _verifyService : VerifyService,
    private _router:Router,
    private http:HttpClient,private route: ActivatedRoute) {
      this.token = this.route.snapshot.paramMap.get('token');
      environment.token = (this.token);
      environment.isLogin = false;
     }
token:any;
otp = true;
password = false;
auth = false;
profile = false;
complete = false;
login = false;
emailValue = "manish@gmail.com"; 
roleValue = ""; 
departmentValue = ""; 
otpValue ="123";
errorMsg = '';
authType = false;
  ngOnInit() {
   console.log('load')
    let decodeData;
    
    //localStorage.setItem('token',this.token);
    //decodeData = atob(this.token);

    // console.log(decodeData);
    // var obj = JSON.parse(decodeData);
    // console.log(obj.email);
    // this.emailValue = obj.email;
    // this.departmentValue = obj.department_id;
    // this.roleValue = obj.role_id;


    this._verifyService.sendOtp(this.token).subscribe(data=>{
        console.log(data)
        if(data.code == 1){
          if(data.step==2){
            this.allDisabled();
            this.password=true;
          }
          this.errorMsg = data.message;
        }else{
          this.allDisabled();
          this.login =true;
          this.errorMsg = data.message;
        }

      },error=>this.errorMsg=error);
  }

  resendOTP(){
    this._verifyService.sendOtp({'email_id':this.emailValue,type:'resend'}).subscribe(data=>
      {
        console.log(data)
        if(data.code == 1){
          this.errorMsg = data.message;
        }else{
          this.errorMsg = data.message;
        }

      },
      error=>this.errorMsg=error
     );
  }
  decodeData:any;
  param:any;
  userdata ={
    password:'',
    confirmpassword:'',
    otp:'1234'};
    profiledata ={
      user_id:'',
      name:'manish',
      mobile:'9926331375',
      };

      authdata ={
        user_id:'',
        auth:false,
        mobile:false,
        email:false,
        };
        validForm = true;
      checkAuthFormData(){
        if(this.authdata.mobile || this.authdata.email ){
          this.validForm = true;
        }else{
          this.validForm = false;
        }
      }
      authChange(flag){
        if(flag){
        this.checkAuthFormData();
        }else{
          this.validForm = true;
          this.authdata.mobile= false;
          this.authdata.email= false;
        }
        
        this.authdata.auth= flag;
        this.authType=flag;
        // console.log(this.authdata);
        // console.log(this.validForm);
      }
      authDataChange(){
        this.checkAuthFormData();
        // console.log(this.authdata);
        // console.log(this.validForm);
      }
allDisabled(){
  this.otp =this.password=this.auth=this.profile=this.complete= false;
}
verifyOTP(){
  console.log('otp');
  console.log('otp',this.userdata.otp);
    this._verifyService.verifyOtp({'email_id':this.emailValue,"otp":this.userdata.otp}).subscribe(data=>
    {
      console.log(data);
      if(data.code == 1){
        if(data.step==2){
          this.allDisabled();
          this.password=true;
        }
        this.errorMsg = '';
        this.allDisabled();
        this.password=true;
      }else{
        this.errorMsg = data.message;
      }
    },
    error=>this.errorMsg=error
    );
}

verifyPassword(){
  console.log('password');
  // this.allDisabled();
  // this.profile=true;

  this._verifyService.createUser({'email':this.emailValue,"department":this.departmentValue,
  "role":this.roleValue,
  "password":this.userdata.password}).subscribe(data=>
    {
      console.log(data);
      if(data.code == 1){
        if(data.isData==1){
          this.profiledata.user_id =  data.result;
          this.authdata.user_id =  data.result;
        }
        this.errorMsg = data.message;
        this.allDisabled();
        this.profile=true;
        console.log( this.profiledata);
      }else{
        this.errorMsg = data.message;
      }
    },
    error=>this.errorMsg=error
    );
}
  verifySetting(){
    console.log('profile');
    // this.allDisabled();
    // this.complete=true;

    this._verifyService.twoWayVerification(this.authdata).subscribe(data=>
      {
        console.log(data);
        if(data.code == 1){
          this.errorMsg = data.message;
          this.allDisabled();
          this.complete=true;
        }else{
          this.errorMsg = data.message;
        }
      },
      error=>this.errorMsg=error
      );
  }
  verifyProfile(){
    console.log('profile');
    // this.allDisabled();
    // this.auth=true;


    this._verifyService.updateUser(this.profiledata).subscribe(data=>
    {
      console.log(data);
      if(data.code == 1){
        this.errorMsg = data.message;
        this.allDisabled();
        this.auth=true;
      }else{
        this.errorMsg = data.message;
      }
    },
    error=>this.errorMsg=error
    );
  }
  
  finish(){
    console.log('finish');
    //this.allDisabled();
    this._router.navigateByUrl('/login');
    //this.password=true;
  }

}
