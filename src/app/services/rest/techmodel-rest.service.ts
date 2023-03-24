import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITechnic, ISimiliarTechnic, ITechnicTitle} from '../../models/technics';
import {Observable} from 'rxjs';
import { IOrder } from 'src/app/models/order';


@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) {
  }

  getTickets(): Observable<ITechnic[]> {
    return this.http.get<ITechnic[]>('http://localhost:3000/technics/');
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/technics/notFound');
  }

  getSimiliarTechnics(): Observable<ITechnic[]> {
    return this.http.get<ITechnic[]>('http://localhost:3000/technics/');
  }

  getTitleList(): Observable<ITechnicTitle[]> {
    return this.http.get<ITechnicTitle[]>('http://localhost:3000/technics/'+ name);
  }

  getRandomNearestEvent(name: string): Observable<ITechnic[]> {
    return this.http.get<ITechnic[]>('http://localhost:3000/technic-item/' + name);
  }

  sendTourData(data: IOrder): Observable<any> {
    return this.http.post('http://localhost:3000/order/', data);
  }

  getTicketById(id: string): Observable<ITechnic> {
    return this.http.get<ITechnic>('http://localhost:3000/technics/' + id);
  }

  getOrders(userId: string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('http://localhost:3000/order/'+userId)
  }

  createTour(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/technic-item', body, {headers: {}});
  }

}



