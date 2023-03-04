import { Component, OnInit } from '@angular/core';
import {ICustomStatisticUser} from '../../../../models/users';
import {StatisticRestService} from '../../../../services/rest/statistic-rest/statistic-rest.service';
import {StatisticService} from '../../../../services/statistic/statistic.service';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from '../../../../models/users';
import { IOrder } from 'src/app/models/order';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
 cols = [
   {field: 'techName', header: 'Наименование спецтехники'},
   {field: 'name', header: 'Имя'},
   {field: 'cardNumber', header: 'Номер карты'},
   {field: 'workingTime', header: 'Срок выполнения'},
   {field: 'workingDay', header: 'Дата выполнения'},
   {field: 'workingLocation', header: 'Место выполнения'}
 ];
 users: ICustomStatisticUser[];

  user: IUser | any;
  orders: IOrder[] | any;
  techName: string | any;
  name: string | any;
  cardNumber: number;
  workingTime: string | any;
  workingDay: string | any;
  workingLocation: string | any;

  constructor(private statisticService: StatisticService,
    private userService: UserService,
   /* private orderService: OrderService*/) { }

  /*ngOnInit(): void {
    this.statisticService.getUserStatistic().subscribe((data) => {
      this.users = data;
    })
  }*/

 /* ngOnInit(): void {
    this.initOrders();
  }

  initOrders(): void {
    const userId = <string>this.userService.getUser()?.id;  
    this.userService.getUserById(userId).subscribe((data) => {
    this.loadUserOrders(userId);
    });
  }
 loadUserOrders(id: string) {

    this.orderService.getOrders(id).subscribe((data) => {
      this.orders = data;
    });
  }*/


}
