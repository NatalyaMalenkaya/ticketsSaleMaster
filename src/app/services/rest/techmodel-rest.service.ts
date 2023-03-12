import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITechnic, INearestTour, ITourLocation} from '../../models/technics';
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

  getNearestTours(): Observable<ITechnic[]> {
    return this.http.get<ITechnic[]>('http://localhost:3000/technics/');
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
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

  createTour(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/technic-item', body, {headers: {}});
  }

}



