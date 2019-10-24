import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './admin/screen/header/header.component';
import { FooterComponent } from './admin/screen/footer/footer.component';
import { MenuComponent } from './admin/screen/menu/menu.component';
import { LeftnavComponent } from './admin/screen/leftnav/leftnav.component';
import { ContentComponent } from './admin/screen/content/content.component';
import { RoleComponent } from './admin/screen/role/role.component';
import { PermissionComponent } from './admin/screen/permission/permission.component';
import { DepartmentComponent } from './admin/screen/department/department.component';
import { UserComponent } from './admin/screen/user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthService } from './auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './admin/screen/dashboard/dashboard.component';
import { SidemenuComponent } from './admin/screen/sidemenu/sidemenu.component';
import { Dashboard1Component } from './admin/screen/dashboard1/dashboard1.component';
import { AddComponent } from './admin/screen/role/add/add.component';
import { TestComponent } from './test/test.component';
import { DesignationComponent } from './admin/screen/designation/designation.component';
import { ModuleComponent } from './admin/screen/module/module.component';
import { SetPasswordComponent } from './set-password/set-password.component';

import { ArchwizardModule } from 'ng2-archwizard';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { EditRoleComponent } from './admin/screen/role/edit-role/edit-role.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LeftnavComponent,
    ContentComponent,
    RoleComponent,
    PermissionComponent,
    DepartmentComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidemenuComponent,
    Dashboard1Component,
    AddComponent,
    TestComponent,
    DesignationComponent,
    ModuleComponent,
    SetPasswordComponent,
    Test1Component,
    Test2Component,
    EditRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ArchwizardModule,
	  ToastrModule.forRoot()
  ],
  providers: [AuthService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
