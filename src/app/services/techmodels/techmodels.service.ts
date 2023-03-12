import { Injectable } from '@angular/core';
import {TicketRestService} from '../rest/techmodel-rest.service';
import {map, Observable, Subject} from 'rxjs';
import {ITechnic, INearestTour, ITourLocation} from '../../models/technics';
import { ITechnicTypeSelect, ICustomTicketData , IWeightTypeSelect} from '../../models/technics';

@Injectable({
  providedIn: 'root'
})
export class TechnicService {
  private ticketSubject = new Subject<any>();
  private weightSubject = new Subject<IWeightTypeSelect>();

  private ticketUpdateSubject = new Subject<ITechnic[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();
  readonly ticketType$ = this.ticketSubject.asObservable();

  
  constructor(private TechnicServiceRest: TicketRestService) { }

 getTicketTypeObservable(): Observable<ITechnicTypeSelect> {
    return this.ticketSubject.asObservable();}

    getWeightTypeObservable(): Observable<IWeightTypeSelect> {
      return this.weightSubject.asObservable();}
  
 
  updateTechnic(type:any): void {
    this.ticketSubject.next(type);
  }

  updateWeight(type:any): void {
    this.weightSubject.next(type);
  }



  updateTicketList(data: ITechnic[]) {
    this.ticketUpdateSubject.next(data);
  }
  getTickets(): Observable<ITechnic[]> {
    return this.TechnicServiceRest.getTickets().pipe(map(
      (value:ITechnic[]) => {
        const singleTour = value.filter((el) => el.type === "single");
        return value.concat(singleTour);
      }
    ))
  }
  getError(): Observable<any> {
    return  this.TechnicServiceRest.getRestError();
  }
  getNearestTours(): Observable<INearestTour[]> {
    return this.TechnicServiceRest.getNearestTours();
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
  
  getRandomNearestEvent(name: string): Observable<ITechnic[]> {
    return this.TechnicServiceRest.getRandomNearestEvent(name);
  }
 
  sendTourData(data: any): Observable<any> {
    return this.TechnicServiceRest.sendTourData(data);
  }



  getTicketById(id: string): Observable<ITechnic> {
    return this.TechnicServiceRest.getTicketById(id);
  }



  createTour(body: any) {
    return  this.TechnicServiceRest.createTour(body);
  }

}
