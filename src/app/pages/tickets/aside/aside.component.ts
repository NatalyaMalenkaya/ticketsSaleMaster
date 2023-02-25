import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {IMenuType} from '../../../models/menuType';
import {ITechnicTypeSelect, IWeightTypeSelect} from '../../../models/tours';
import {TechnicService} from '../../../services/tickets/tickets.service';
import {MessageService} from "primeng/api";
import {SettingsService} from '../../../services/settings/settings.service';
import { subscribeOn } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ITour } from '../../../models/tours';




@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
@Output()

export class AsideComponent implements OnInit {
 //menuTypes: IMenuType[];
 //obj = {type: 'custom', label: 'Обычное'}
//  selectedMenuType: IMenuType;
  technicTypes: ITechnicTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Экскаватор', value: 'excavator'},
    {label: 'Погрузчик', value: 'loader'}
  ];
  weightTypes: IWeightTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: '1-тонник', value: '1t'},
    {label: '4-тонник', value: '4t'},
    {label: '7-тонник', value: '7t'},
    {label: '10-тонник', value: '10t'}
  ]

 



  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor(private technicService: TechnicService,
              private settingsService: SettingsService,
              private messageService: MessageService,
              private http: HttpClient
              ) { }

  /*ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }
  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }*/
  changeTechnicType(ev:  {ev: Event, value: ITechnicTypeSelect}): void {
    this.technicService.updateTechnic(ev.value)
  }

  changeWeightType(ev:  {ev: Event, value: IWeightTypeSelect}): void {
    this.technicService.updateTechnic(ev.value)
  }

  

  /*selectDate(ev: string) {
    this.technicService.updateTechnic({date:ev})
  }*/

  /*initRestError(): void {
    this.technicService.getError().subscribe({next: (data) => {
      },
    error:(err) => {
      this.messageService.add({severity: 'success', summary: 'Error'});
      console.log('err', err)
    },
      complete: () => {}
    })
  }*/
  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
        saveToken: false
      });
  }

  initTechnics():void {
    this.http.post<ITour[]>("http://localhost:3000/tours/", {}).subscribe((data)=>{
     this.technicService.updateTicketList(data);
    });
  }



  deleteTechnics():void {
    this.http.delete("http://localhost:3000/tours/").subscribe((data)=>{
      this.technicService.updateTicketList([]);
    });
  }
}
