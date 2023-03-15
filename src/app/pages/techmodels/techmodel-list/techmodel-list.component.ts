import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TechnicService} from "../../../services/techmodels/techmodels.service";
import {ITechnic} from '../../../models/technics';
import { TechmodelsStorageService } from 'src/app/services/techmodels-storage/techmodels-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BlocksStyleDirective} from '../../../directive/blocks-style.directive';
import {Subscription, fromEvent, debounceTime} from 'rxjs';
import {ITechnicTypeSelect} from '../../../models/technics'

@Component({
  selector: 'app-techmodel-list',
  templateUrl: './techmodel-list.component.html',
  styleUrls: ['./techmodel-list.component.scss']
})
export class TechmodelListComponent implements OnInit {
  techmodels: ITechnic[];
  techmodelsCopy: ITechnic[];
  loadCountBlock = false;
  defaultDate: string;
  

  @ViewChild('technicWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective

  @ViewChild('technicWrap')  technicWrap: ElementRef

   technicUnsubscriber: Subscription

  @ViewChild('ticketSearch')ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private technicService: TechnicService,
              private router: Router,
              private route: ActivatedRoute,
              private techmodelStorage: TechmodelsStorageService) { }

              ngOnInit(): void {
                this.technicService.ticketUpdateSubject$.subscribe((data)=>{
                  this.techmodels=data;
                })
            
            
                this.technicService.getTickets().subscribe(
                  (data) => {
                    this.techmodels = data;
                    this.techmodelsCopy = [...this.techmodels];
                    this.techmodelStorage.setStorage(data);
                  }
                )
            //  1 вариант подписки
            
                this.technicUnsubscriber = this.technicService.ticketType$.subscribe((dataValue: {type: any, weight: any}) => {
                  console.log('data', dataValue)
                  let data = this.techmodelsCopy;
                  console.log('this.techmodelsCopy', this.techmodelsCopy);
                  
                  let ticketType: string;
                  switch (dataValue.type.value) {
                    case "excavator":
                      data = data.filter((el) => el.type === "excavator");
                      break;
                    case "loader":
                     data= data.filter((el) => el.type === "loader");
                      break;
                    case "all":
                      data = [...data];
                      break;
            
                  }
                  

            /*      if (dataValue.date) {
                    const dateWithoutTime = new Date(data.date).toISOString().split('T');
                    const dateValue = dateWithoutTime[0]
                    console.log('dateValue', dateValue)
                    this.techmodels = this.techmodelsCopy.filter((el) => el.date === dateValue);
                  }*/
                  let weightType: string;
                  switch (dataValue.weight.value) {
                    case "1t":
                      data= data.filter((el) => el.tonnazh === "1t");
                      break;
                      case "4t":
                        data = data.filter((el) => el.tonnazh === "4t");
                        break;
                        case "7t":
                          data = data.filter((el) => el.tonnazh === "7t");
                          break;
                          case "10t": 
                            data = data.filter((el) => el.tonnazh === "10t");
                            break;
                    case "all":
                      data = [...data];
                      break;
                            
                  }

                  this.techmodels = [...data];
                  setTimeout(() => {
            
                    this.blockDirective.updateItems();
            
                    this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
                  });
            
                });



            //  2 вариант подписки
            //     this.technicUnsubscriber = this.technicService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) => {  console.log('data', data)  });
            
              }
            
              goToTechmodelInfoPage(item: ITechnic) {
               this.router.navigate(['/techmodels/techmodel'], {queryParams: {id: item._id}})
              }
            
                  directiveRenderComplete(ev: boolean) {
                  const el: HTMLElement = this.technicWrap.nativeElement;
                  //el.setAttribute('style', 'background-color:#ebf8e1');
                  this.blockDirective.initStyle(3);
                  this.loadCountBlock = true;
                }
            
              ngAfterViewInit() {
                const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, "keyup");
                this.searchTicketSub = fromEventObserver.pipe(
                  debounceTime(200)).subscribe((ev:any)=>{
                    if (this.ticketSearchValue) {
                      this.techmodels = this.techmodelsCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
                    } else {
                      this.techmodels = [...this.techmodelsCopy];
                    }
                  }
                );
            }
            
            ngOnDestroy()
            {
              this.technicUnsubscriber.unsubscribe();
              this.searchTicketSub.unsubscribe();
            }
            
            
            }
            
            
