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
import { PermissionComponent } from './admin/screen/permission/permission.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { EditRoleComponent } from './admin/screen/role/edit-role/edit-role.component';
import { AddModuleComponent } from './admin/screen/module/add-module/add-module.component';
import { EditModuleComponent } from './admin/screen/module/edit-module/edit-module.component';
//import { PermissionComponent } from './admin/screen/permission/permission.component';


const routes: Routes = [

  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'set_password',
    component:SetPasswordComponent,
    canActivate:[AuthGuard]
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

  }
  ,
  {
    path:'permission',
    component:PermissionComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'module',
    component:ModuleComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'module/add',
    component:AddModuleComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'module/edit',
    component:EditModuleComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'test',
    component:TestComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'test1',
    component:Test1Component,
    canActivate:[AuthGuard]

  },
   {
    path:'test2',
    component:Test2Component,
    canActivate:[AuthGuard]

  },

  {
    path:'role',
    component:RoleComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'edit-role',
    component:EditRoleComponent,
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

  { path: 'customer-list', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
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
