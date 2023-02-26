import { Component, OnInit } from '@angular/core';
import {ICustomStatisticUser} from '../../../../models/users';
import {StatisticRestService} from '../../../../services/rest/statistic-rest/statistic-rest.service';
import {StatisticService} from '../../../../services/statistic/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
 cols = [
   {field: 'name', header: 'Имя'},
   {field: 'cardNumber', header: 'Номер карты'},
   {field: 'workingTime', header: 'Срок выполнения'},
   {field: 'workingDay', header: 'Дата выполнения'},
   {field: 'workingLocation', header: 'Место выполнения'}
 ];
 users: ICustomStatisticUser[];


  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.getUserStatistic().subscribe((data) => {
      this.users = data;
    })
  }

}
