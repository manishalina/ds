import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './admin/screen/user/user.component';
import { RoleComponent } from './admin/screen/role/role.component';
import { DepartmentComponent } from './admin/screen/department/department.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './admin/screen/dashboard/dashboard.component';
import { AddComponent } from './admin/screen/role/add/add.component';
import { TestComponent } from './test/test.component';
import { ModuleComponent } from './admin/screen/module/module.component';
import { DesignationComponent } from './admin/screen/designation/designation.component';
//import { PermissionComponent } from './admin/screen/permission/permission.component';


const routes: Routes = [

  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'user',
    component:UserComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'designation',
    component:DesignationComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'module',
    component:ModuleComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'test',
    component:TestComponent,
    canActivate:[AuthGuard]

  },

  {
    path:'role',
    component:RoleComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'department',
    component:DepartmentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'role/add',
    component:AddComponent,
    canActivate:[AuthGuard]
  },
  // // {
  // //   path:'permission',
  // //   component:PermissionComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
