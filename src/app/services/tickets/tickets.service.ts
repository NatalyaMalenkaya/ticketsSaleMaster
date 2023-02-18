import { Injectable } from '@angular/core';
import {TicketRestService} from '../rest/ticket-rest.service';
import {map, Observable, Subject} from 'rxjs';
import {ITour, INearestTour, ITourLocation} from '../../models/tours';
import { ITechnicTypeSelect, ICustomTicketData , IWeightTypeSelect} from '../../models/tours';

@Injectable({
  providedIn: 'root'
})
export class TechnicService {
  private ticketSubject = new Subject<ITechnicTypeSelect>();
  private weightSubject = new Subject<IWeightTypeSelect>();
  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();




  readonly ticketType$ = this.ticketSubject.asObservable();

  
  constructor(private TechnicServiceRest: TicketRestService) { }

 getTicketTypeObservable(): Observable<ITechnicTypeSelect> {
    return this.ticketSubject.asObservable();}

    getWeightTypeObservable(): Observable<IWeightTypeSelect> {
      return this.weightSubject.asObservable();}


  updateTechnic(type:ITechnicTypeSelect): void {
    this.ticketSubject.next(type);
  }

  updateWeight(type:IWeightTypeSelect): void {
    this.weightSubject.next(type);
  }

  updateTicketList(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
  }
  getTickets(): Observable<ITour[]> {
    return this.TechnicServiceRest.getTickets().pipe(map(
      (value:ITour[]) => {
        const singleTour = value.filter((el) => el.type === "single");
        return value.concat(singleTour);
      }
    ))
  }
  getError(): Observable<any> {
    return  this.TechnicServiceRest.getRestError();
  }
  getNearestTours(): Observable<INearestTour[]> {
    return this.TechnicServiceRest.getNearestTickets();
  }
  getTourLocations(): Observable<ITourLocation[]> {
    return this.TechnicServiceRest.getLocationList();
  }
  transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] {
    const newTicketData:  ICustomTicketData[] = [];
    data.forEach((el) => {
      const newEl = <ICustomTicketData>{...el};
      newEl.region = <ICustomTicketData>regions.find((region) => {return el.locationId === region.id});
      newTicketData.push(newEl);
    });
    return newTicketData
  }
  getRandomNearestEvent(type: number): Observable<INearestTour> {
    return this.TechnicServiceRest.getRandomNearestEvent(type);
  }
  sendTourData(data: any): Observable<any> {
    return this.TechnicServiceRest.sendTourData(data);
  }
  createTour(body: any) {
    return  this.TechnicServiceRest.createTour(body);
  }

}
