import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {UserService} from '../../../services/user/user.service';
import {IUser} from '../../../models/users';
import {IMenuType} from '../../../models/menuType'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
   items: MenuItem[];
   time: Date;
   user: IUser | null;
   userName: string;
   private accountActive = false;

   private timerInterval: number;

  constructor(
    private userService: UserService) {}

  ngOnInit(): void {
    this.items = [    
      {
        label: 'Выйти',
        routerLink:['/auth']
      },
      {
        label: 'Спецтехника',
        routerLink:['techmodels-list']
      },
      {
        label: 'Отзывы',
        routerLink: ['feedback']
      },
      {
        label: 'Личный кабинет',
        routerLink:['account'],
      },   
      {
        label: 'Настройки',
        routerLink:['for-admin'],
        //visible: false
      }, 
    ];

    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.user = this.userService.getUser();
    //const authUser: IUser  = this.userService.getUser();
    //this.user = authUser;
    //this.userName = authUser.login
  }

  ngOnDestroy(): void{
    if(this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }
 /* ngOnChanges(ev: SimpleChanges): void {
    if (ev['menuType']) {
      this.accountActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();}
  }
  initMenuItems():MenuItem[] {
    return [
      
      {
        label: 'Выйти',
        routerLink:['/auth']
      },
      {
        label: 'Спецтехника',
        routerLink:['techmodels-list']
      },
      {
        label: 'Личный кабинет',
        routerLink:['account'],
        visible: this.accountActive
      },
      

      {
        label: 'Отзывы',
        routerLink: ['feedback']
      },

    ];
  }*/

}