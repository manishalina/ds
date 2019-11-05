import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import { ToastService } from './_services/toast.service';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'biadmin';
  application_token = 'biadmin';
  isLogin = true;
  
  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '#fafafa',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: '#fff',
    selectedListFontColor: 'red',
    interfaceWithRoute: true
  };

    appitems = [
    
    {
        label: 'Master',
        faIcon: 'fab fa-500px',
        items: [
            {
                label: 'test',
                link: 'test',
                faIcon: 'fab fa-accusoft'
            },
            {
              label: 'Department',
              link: 'dpt',
              faIcon: 'fab fa-accusoft'
          },
        ]
    },
    {
        label: 'Item 2',
        icon: 'alarm',
        items: [
        {
            label: 'Item 2.1',
            link: '/item-2-1',
            icon: 'favorite_border',
            activeIcon: 'favorite',
            disabled: true,
        },
        {
            label: 'Item 2.2',
            link: '/item-2-2',
            icon: 'favorite_border',
            activeIcon: 'favorite',
            navigationExtras: {
                queryParams: { order: 'popular', filter: 'new' },
            }
        }
        ]
    },
    {
        label: 'Item 3',
        icon: 'offline_pin',
        onSelected: function() {
            console.log('Item 3');
        }
    },
    {
        label: 'Item 4',
        link: '/item-4',
        icon: 'star_rate',
        hidden: true
    }
];



  constructor(
    private _authService:AuthService,
    private toastService: ToastService,
    private confirmationDialogService: ConfirmationDialogService
    ){
  }
  
  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  showStandard() {
    this.toastService.show('I am a standard toast', {
      delay: 2000,
      autohide: true
    });
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Toast Header'
    });
  }
  showError() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }

  showCustomToast(customTpl) {
    this.toastService.show(customTpl, {
      classname: 'bg-info text-light',
      delay: 3000,
      autohide: true
    });
  }
  
  logout(){
    this._authService.loggedOut();
    console.log('logout');
  }
}
