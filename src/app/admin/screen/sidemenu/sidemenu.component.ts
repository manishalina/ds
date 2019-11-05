import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ModuleService } from '../../services/module.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  constructor(
    private _authService:AuthService,
    private toastr: ToastrService,
    private _moduleService:ModuleService
    ){
  }

  appitems = environment.assignModule;
//   appitems = [
    
//     {
//         label: 'Master',
//         faIcon: 'fab fa-500px',
//         items: [
//             {
//                 label: 'Role',
//                 link: 'role',
//                 faIcon: 'fab fa-accusoft'
//             },
//             {
//               label: 'Department',
//               link: 'department',
//               faIcon: 'fab fa-accusoft'
//           },
//         ]
//     },
//     {
//         label: 'Item 2',
//         icon: 'alarm',
//         items: [
//         {
//             label: 'Item 2.1',
//             link: '/item-2-1',
//             icon: 'favorite_border',
//             activeIcon: 'favorite',
//             disabled: true,
//         },
//         {
//             label: 'Item 2.2',
//             link: '/item-2-2',
//             icon: 'favorite_border',
//             activeIcon: 'favorite',
//             navigationExtras: {
//                 queryParams: { order: 'popular', filter: 'new' },
//             }
//         }
//         ]
//     },
//     {
//         label: 'Item 3',
//         icon: 'offline_pin',
//         onSelected: function() {
//             console.log('Item 3');
//         }
//     },
//     {
//         label: 'Item 4',
//         link: '/item-4',
//         icon: 'star_rate',
//         hidden: true
//     }
// ];
  
config = {
  paddingAtStart: false,
  classname: 'my-custom-class',
  listBackgroundColor: '#fafafa',
  fontColor: 'rgb(8, 54, 71)',
  backgroundColor: '#fff',
  selectedListFontColor: 'red',
  interfaceWithRoute: true
};
  errorMsg='';
  modules:any;
  ngOnInit() {
 
    //this.modules = environment.assignModule;
    console.log('side menu',environment.assignModule);
    // this._moduleService.getmodule().subscribe(data=>
    //   {
    //     console.log('module list',data)
    //     this.modules = data
    //   },
    //   error=>this.errorMsg=error
    // );
  }

}
