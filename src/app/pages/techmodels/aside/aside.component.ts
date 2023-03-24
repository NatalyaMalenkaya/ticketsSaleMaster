import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {IMenuType} from '../../../models/menuType';
import {ITechnicTypeSelect, IWeightTypeSelect} from '../../../models/technics';
import {TechnicService} from '../../../services/techmodels/techmodels.service';
import {MessageService} from "primeng/api";
import { AccountService } from 'src/app/services/account/account.service';
//import { subscribeOn } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ITechnic } from '../../../models/technics';


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
  filter = {
  type: null,
  weight: null
}

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor(private technicService: TechnicService,
              private accountService: AccountService,
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
    this.technicService.updateTechnic(this.filter)
  }

  changeWeightType(ev:  {ev: Event, value: IWeightTypeSelect}): void {
    this.technicService.updateTechnic(this.filter)
    console.log('xx', this.filter) 
     
    
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
  initAccountData(): void {
    this.accountService.loadUserAccountSubject({
        saveToken: false
      });
  }

  initTechnics():void {
    this.http.post<ITechnic[]>("http://localhost:3000/technics/", {}).subscribe((data)=>{
     this.technicService.updateTechmodelList(data);
    });
  }



  deleteTechnics():void {
    this.http.delete("http://localhost:3000/technics/").subscribe((data)=>{
      this.technicService.updateTechmodelList([]);
    });
  }
}
