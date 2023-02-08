import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITour, INearestTour, ITourLocation} from '../../models/tours';
import {Observable} from 'rxjs';
import { IOrder } from 'src/app/models/order';


@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) { }

  getTickets(): Observable<ITour[]>{
    return this.http.get<ITour[]>('http://localhost:3000/tours/')
  }
  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }
  getNearestTickets(): Observable<INearestTour[]> {
       return this.http.get<INearestTour[]>('http://localhost:3000/tours/')
  }
  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
  }

  getRandomNearestEvent(name: string): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tour-item/'+name);

  }


  sendTourData(data: IOrder):Observable<any>{
    return this.http.post('http://localhost:3000/order/', data);
  }


  getTicketById(id:string):Observable<ITour>{
    return this.http.get<ITour>('http://localhost:3000/tours/'+id);
  }

  createTour(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/tour-item', body, {headers:{}});
  }


}

