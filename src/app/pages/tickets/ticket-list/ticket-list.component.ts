import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TechnicService} from "../../../services/tickets/tickets.service";
import {ITour} from '../../../models/tours';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import {Router} from '@angular/router';
import {BlocksStyleDirective} from '../../../directive/blocks-style.directive';
import {Subscription, fromEvent, debounceTime} from 'rxjs';
import {ITechnicTypeSelect} from '../../../models/tours'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  ticketsCopy: ITour[];
  loadCountBlock = false;
  defaultDate: string;
  

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective

  @ViewChild('tourWrap')  tourWrap: ElementRef

   tourUnsubscriber: Subscription

  @ViewChild('ticketSearch')ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private technicService: TechnicService,
              private router: Router,
              private ticketStorage: TiсketsStorageService) { }

              ngOnInit(): void {
                this.technicService.ticketUpdateSubject$.subscribe((data)=>{
                  this.tickets=data;
                })
            
            
                this.technicService.getTickets().subscribe(
                  (data) => {
                    this.tickets = data;
                    this.ticketsCopy = [...this.tickets];
                    this.ticketStorage.setStorage(data);
                  }
                )
            //  1 вариант подписки
            
                this.tourUnsubscriber = this.technicService.ticketType$.subscribe((data: ITechnicTypeSelect) => {
                  console.log('data', data)
            
                  let ticketType: string;
                  switch (data.value) {
                    case "excavator":
                      this.tickets = this.ticketsCopy.filter((el) => el.type === "excavator");
                      break;
                    case "loader":
                      this.tickets = this.ticketsCopy.filter((el) => el.type === "loader");
                      break;
                    case "all":
                      this.tickets = [...this.ticketsCopy];
                      break;
            
                  }
                  

                  if (data.date) {
                    const dateWithoutTime = new Date(data.date).toISOString().split('T');
                    const dateValue = dateWithoutTime[0]
                    console.log('dateValue', dateValue)
                    this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
                  }
                  let weightType: string;
                  switch (data.value) {
                    case "1t":
                      this.tickets = this.ticketsCopy.filter((el) => el.tonnazh === "1t");
                      break;
                      case "4t":
                        this.tickets = this.ticketsCopy.filter((el) => el.tonnazh === "4t");
                        break;
                        case "7t":
                          this.tickets = this.ticketsCopy.filter((el) => el.tonnazh === "7t");
                          break;
                          case "10t":
                            this.tickets = this.ticketsCopy.filter((el) => el.tonnazh === "10t");
                            break;
                    case "all":
                      this.tickets = [...this.ticketsCopy];
                      break;
            
                  }
                  setTimeout(() => {
            
                    this.blockDirective.updateItems();
            
                    this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
                  });
            
                });



            //  2 вариант подписки
            //     this.tourUnsubscriber = this.technicService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) => {  console.log('data', data)  });
            
              }
            
              goToTicketInfoPage(item: ITour) {
                this.router.navigate( ['/tickets/ticket/${item.id}'])
                // если пусть в роутинг модуле записан так: path: 'tickets/:id',
            
               // this.router.navigate(['/tickets/ticket'], {queryParams: {id: item.id}})
                // если пусть в роутинг модуле записан так: path: 'ticket',
              }
            
                  directiveRenderComplete(ev: boolean) {
                  const el: HTMLElement = this.tourWrap.nativeElement;
                  //el.setAttribute('style', 'background-color:#ebf8e1');
                  this.blockDirective.initStyle(3);
                  this.loadCountBlock = true;
                }
            
              ngAfterViewInit() {
            
                const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, "keyup");
            
                this.searchTicketSub = fromEventObserver.pipe(
                  debounceTime(200)).subscribe((ev:any)=>{
                    if (this.ticketSearchValue) {
                      this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
                    } else {
                      this.tickets = [...this.ticketsCopy];
                    }
                  }
                );
            }
            
            ngOnDestroy()
            {
              this.tourUnsubscriber.unsubscribe();
              this.searchTicketSub.unsubscribe();
            }
            
            
            }
            
            
