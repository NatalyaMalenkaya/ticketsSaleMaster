import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {ITour, INearestTour, ITourLocation} from '../../../models/tours';
import {ActivatedRoute, Router} from '@angular/router';
import {TiсketsStorageService} from '../../../../app/services/tiсkets-storage/tiсkets-storage.service';
import {IUser} from '../../../models/users';
import {UserService} from '../../../services/user/user.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {TechnicService} from '../../../services/tickets/tickets.service';
import {Subscription, fromEvent, forkJoin} from 'rxjs';
import { IOrder } from 'src/app/models/order';
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {
  ticket: ITour | undefined;
  user: IUser | any;
  userForm: FormGroup;
  ticketSearchValue: string;

  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1,2,3]

  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private technicService: TechnicService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    
    // first get info
  //  this.user = this.userService.getUser();


  const userId = <string>this.userService.getUser()?.id;

  this.route.queryParams.subscribe((par) => {
    // console.log('par', par)
    const parId = par['id'];
    this.technicService.getTicketById(parId).subscribe((data) => {
      this.ticket = data;
    })
  });

  this.userService.getUserById(userId).subscribe((data) => {
    this.user = data;
    this.userForm.controls["eMail"].setValue(this.user.email)
    console.log(this.user?.email, "email user до загрузки формы");
  });


    //init formGroup

    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      cardNumber: new FormControl(this.user?.cardNumber),
      workingTime: new FormControl('',[Validators.required, Validators.minLength(2)]),
      workingDay: new FormControl(''),
      workingLocation: new FormControl('')

    })

    //get nearest tour
    forkJoin([this.technicService.getNearestTours(), this.technicService.getTourLocations()]).subscribe((data) => {
      this.nearestTours = data[0];
      this.toursLocation = data[1];
      this.nearestTours = this.technicService.transformData(data[0], data[1]);

    })

   // params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if(paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }


    
  }

  ngAfterViewInit(): void {
   
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);

   // const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
   // this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
   //   const tourName = ev.target.value;
  //    this.initSearchTour(tourName);
  //  });
  }



  
  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }

  
  initSearchTour(name: string): void {
    this.ticketRestSub = this.technicService.getRandomNearestEvent(name).subscribe((data) => {
      this.nearestTours = data;
    });
  }


  onSubmit(): void {
   
  }

  selectDate(ev: Event): void {
  };

  
    initTour(): void{
      const userData=this.userForm.getRawValue();
      const postData={...this.ticket, ...userData};
      
      const userId= this.userService.getUser()?.id || null ;
      const postObj: IOrder = {
        firstName: postData.firstName,
       // lastName: postData.lastName,
       cardNumber: postData.cardNumber,
        workingTime: postData.workingTime,
        
        workingDay: postData.workingDay,
        workingLocation: postData.workingLocation,
        
        tourId: postData.id,
        userId: userId,
  
        

       // name: postData.name,
       // price: postData.price,
       // type: postData.type,
       // tonnazh: postData.tonnazh,
  


      }
          // console.log(postData, "postData");
          // console.log(this.userForm.getRawValue(), "this.userForm.getRawValue()");
          this.technicService.sendTourData(postObj).subscribe()
   
          
         this.userForm.valueChanges.subscribe((v) => {
          })
          this.messageService.add({
            severity: 'success',
            summary: 'Спасибо за Вашу заявку! Мы свяжемся с Вами в ближайшее время.'
          });
          this.userForm.reset();
        }
      
        goToTicketInfoPage(tour: ITour) {
          this.router.navigate(['/tickets/ticket'], {
              queryParams: {id: tour.id},
              relativeTo: this.route
            }
          );
        }
      
}