import { Component, OnInit } from '@angular/core';
import {TechnicService} from '../../services/techmodels/techmodels.service';
import {ITechnic} from '../../models/technics';
import {IMenuType} from '../../models/menuType';
import { TicketRestService } from 'src/app/services/rest/techmodel-rest.service';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';


@Component({
  selector: 'app-techmodels',
  templateUrl: './techmodels.component.html',
  styleUrls: ['./techmodels.component.scss']
})
export class TechmodelsComponent implements OnInit {
  techmodels: ITechnic[];
  selectedType: IMenuType;
  isOn: boolean = true;
  

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }
constructor(private techmodelsRestService:  TicketRestService) { }

  ngOnInit(): void {

    

this.techmodelsRestService.getTickets().subscribe((data)=>{
  this.techmodels=data;
});
    }
}

