import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor() { }
otp = true;
password = false;
auth = false;
profile = false;
complete = false;
emailValue = "manish"; 
otpValue ="123";
  ngOnInit() {
  }
allDisabled(){
  this.otp =this.password=this.auth=this.profile=this.complete= false;
}
  verifyOTP(){
    console.log('otp');
    this.allDisabled();
    this.password=true;
  }

  verifyPassword(){
    console.log('password');
    this.allDisabled();
    this.auth=true;
  }
  verifySetting(){
    console.log('profile');
    this.allDisabled();
    this.profile=true;
  }
  verifyProfile(){
    console.log('profile');
    this.allDisabled();
    this.complete=true;
  }
  

  finish(){
    console.log('finish');
    this.allDisabled();
    //this.password=true;
  }

}
