import { Component, OnInit } from '@angular/core';
import { StatisticRestService } from 'src/app/services/rest/statistic-rest/statistic-rest.service';
import {StatisticService} from '../../../../services/statistic/statistic.service';
import { UserService } from 'src/app/services/user/user.service';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';
import {TechnicService} from 'src/app/services/techmodels/techmodels.service';
import { IUser } from 'src/app/models/users';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
 cols = [
   {field: 'techName', header: 'Наименование спецтехники'},
   {field: 'firstName', header: 'Имя'},
   {field: 'cardNumber', header: 'Номер карты'},
   {field: 'workingTime', header: 'Срок выполнения'},
   {field: 'workingDay', header: 'Дата выполнения'},
   {field: 'workingLocation', header: 'Место выполнения'}
 ];
 
 /*orders: IOrder[];*/

 orders: IOrder[] | any;
 user: IUser | any;

 constructor(
  
  private orderService: OrderService,
  private userService: UserService,
) {
}


ngOnInit(): void {
  this.initOrders();
  
}
initOrders(): void {
  const userId = <string>this.userService.getUser()?.id; 
  this.userService.getUserById(userId).subscribe((data) => {
    this.user = data;
    if (this.user) {
      this.showUserOrders(userId);
    }
  });
}
showUserOrders(id: string) {
  this.orderService.getOrders(id).subscribe((data) => {
    this.orders = data;
   });
}

/*ngOnInit(): void {
  this.getData();
}

getData(): void {
  this.orderService.getOrderAll().subscribe((data) => {
    this.orders = data;
  });

}*/
/* constructor(private technicService: TechnicService) { }

 ngOnInit(): void {
 
   this.technicService.getOrders('all').subscribe((data: IOrder[]) => {
     this.orders = data;
   })
 }*/

}


