import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/users';
import { Role } from '../../classes/role';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

// class item {  
//   name: string;  
//   val: number;  
// }  

export class RoleComponent implements OnInit {
  // {
  //   "name":"ufasdf",
  //   "permission_map":[
    
  //   {"module":"5da6d68ce100680f636f2533",
    
  //   "permission":
  //   ["5da6d83f5d878f0f63c5836d","5da6d8155d878f0f63c5836c"]
    
  //   }
  //   ],
    
  //   "role_id":""
  //   }
  constructor(private _roleService : RoleService,
    private _router:Router,
    private http:HttpClient,private confirmationDialogService: ConfirmationDialogService) { }

  errorMsg = '';
  pageTitle = 'Role List';
  public roles = [];
  public add_permission =true;
  public edit_permission =true;
  public view_permission =false;
  public delete_permission =false;
  public permissions = [
    {'name':'add'},
    {'name':'edit'},
    {'name':'view'},
    {'name':'delete'},
  ]

  public modules = [
    {'name':'m1'},
    {'name':'m2'},
    {'name':'m3'},
  ]

  departments = [
    {name:'one', id:'1'},
    {name:'two', id:'2'},
    {name:'three', id:'3'},
  ]
  items = [
    {name: 'One', val: 1}, {name: 'Two', val: 2}, {name: 'Three', val: 3}
  ];  
  selectedValue: string= '';  
  showPopup=false;

    ngOnInit() {
      console.log('role',environment.token)
       this.loadRole();

        
    }
  loadRole(){
    this._roleService.getRole().subscribe(data=>
      this.roles = data,
      error=>this.errorMsg=error
      );
  }
   
    editRole(id): void {
      localStorage.removeItem("editRoleId");
      localStorage.setItem("editRoleId", id.toString());
      this._router.navigate(['edit-role']);
    };
  

    deleteRole(id): void {
      let obj = {'role_id':id};
      this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if(confirmed){
          console.log('User confirmed delete api call ', confirmed);
          this._roleService.deleteRole(obj).subscribe(data=>
            {
              if(data){
               this.loadRole();
              }
            },
             error=>this.errorMsg=error
           );
        }

      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      
    
      
    }
  

    userModel = new User('','','');
    //role = new Role('','');
    openPopup(){
      console.log('opened');
      this.showPopup = true;
     }
    
     
     closePopup(){
      this.showPopup = false;
     }
  
}
