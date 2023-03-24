import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
//import {IStatisticUser} from '../../../models/users';
import { IOrder } from 'src/app/models/order';
//import { IStatisticUser } from 'src/app/models/users';
@Injectable({
  providedIn: 'root'
})
export class StatisticRestService {

  constructor(private http: HttpClient) { }

  /*getUserStatistic(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>("http://localhost:3000/orders/all");
  }*/
/*
  getOrderStatistic(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('http://localhost:3000/order/')
  }*/

}

