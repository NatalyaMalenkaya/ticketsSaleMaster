import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from 'rxjs';
import {  IOrder } from 'src/app/models/order';
import {StatisticRestService} from '../rest/statistic-rest/statistic-rest.service';


@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private order: IOrder | null;
  constructor(private http: HttpClient) {
  }

  getOrders(userId: string) {
    return this.http.get("http://localhost:3000/order/" + userId)
  }
  getOrderAll() {
    return this.http.get("http://localhost:3000/order/")
  }

}

