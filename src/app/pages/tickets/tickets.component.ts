import { Component, OnInit } from '@angular/core';
import {TechnicService} from '../../services/tickets/tickets.service';
import {ITour} from '../../models/tours';
import {IMenuType} from '../../models/menuType';
import { TicketRestService } from 'src/app/services/rest/ticket-rest.service';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: ITour[];
  selectedType: IMenuType;
  isOn: boolean = true;
  

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }
constructor(private ticketsRestService:  TicketRestService) { }

  ngOnInit(): void {

    

this.ticketsRestService.getTickets().subscribe((data)=>{
  this.tickets=data;
});
    }
}

