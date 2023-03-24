import { Injectable } from '@angular/core';
import {TicketRestService} from '../rest/techmodel-rest.service';
import {map, Observable, Subject} from 'rxjs';
import {ITechnic, ISimiliarTechnic, ITechnicTitle} from '../../models/technics';
import { ITechnicTypeSelect, ICustomTicketData , IWeightTypeSelect} from '../../models/technics';
import { IOrder } from 'src/app/models/order';

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



  updateTechmodelList(data: ITechnic[]) {
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
  getSimiliarTechnics(): Observable<ISimiliarTechnic[]> {
    return this.TechnicServiceRest.getSimiliarTechnics();
  }
  getTourLocations(): Observable<ITechnicTitle[]> {
    return this.TechnicServiceRest.getTitleList();
  }
  transformData(data: ISimiliarTechnic[], regions: ITechnicTitle[]): ICustomTicketData[] {
    const newTicketData:  ICustomTicketData[] = [];
    data.forEach((el) => {
      const newEl = <ICustomTicketData>{...el};
      newEl.title = <ICustomTicketData>regions.find((title) => {return el.locationId === title.id});
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

  getOrders(userId: string): Observable<IOrder[]> {
    return this.TechnicServiceRest.getOrders(userId);
  }


  createTour(body: any) {
    return  this.TechnicServiceRest.createTour(body);
  }

}
