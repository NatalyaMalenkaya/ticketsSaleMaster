import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {ITechnic, INearestTour, ITourLocation} from '../../../models/technics';
import {ActivatedRoute, Router} from '@angular/router';
import { TechmodelsStorageService } from 'src/app/services/techmodels-storage/techmodels-storage.service';
import {IUser} from '../../../models/users';
import {UserService} from '../../../services/user/user.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {TechnicService} from '../../../services/techmodels/techmodels.service';
import {Subscription, fromEvent, forkJoin} from 'rxjs';
import { IOrder } from 'src/app/models/order';
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-techmodel-item',
  templateUrl: './techmodel-item.component.html',
  styleUrls: ['./techmodel-item.component.scss']
})
export class TechmodelItemComponent implements OnInit, AfterViewInit, OnDestroy {
  techmodel: ITechnic | undefined;
  user: IUser | any;
  userForm: FormGroup;
  ticketSearchValue: string;
  

  nearestTours: INearestTour[];
  technicsLocation: ITourLocation[];
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1,2,3]

  constructor(private route: ActivatedRoute,
              private techmodelStorage: TechmodelsStorageService,
              private userService: UserService,
              private technicService: TechnicService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    
  // first get info
  // this.user = this.userService.getUser();

  const userId = <string>this.userService.getUser()?.id;
  this.route.queryParams.subscribe((par) => {
    // console.log('par', par)
    const parId = par['id'];
    this.technicService.getTicketById(parId).subscribe((data) => {
      this.techmodel = data;
    })
  });

  this.userService.getUserById(userId).subscribe((data) => {
    this.user = data;
   // this.userForm.controls["eMail"].setValue(this.user.email);
    this.userForm.controls["cardNumber"].setValue(this.user.cardNumber);
    //console.log(this.user.cardNumber, "email user до загрузки формы");
  });


    //init formGroup

    this.userForm = new FormGroup({
      techName: new FormControl('', {validators: Validators.required}),
      firstName: new FormControl('', {validators: Validators.required}),
      cardNumber: new FormControl(this.user?.cardNumber),
      workingTime: new FormControl('',[Validators.required, Validators.minLength(2)]),
      workingDay: new FormControl('', {validators: Validators.required}),
      workingLocation: new FormControl('', {validators: Validators.required})

    })

    //get nearest technic
    forkJoin([this.technicService.getNearestTours(), this.technicService.getTourLocations()]).subscribe((data) => {
      this.nearestTours = data[0];
      this.technicsLocation = data[1];
      this.nearestTours = this.technicService.transformData(data[0], data[1]);

    })

   // params
   const routeIdParam = this.route.snapshot.paramMap.get('id'); //for route
   const queryIdParam = this.route.snapshot.queryParamMap.get('id');
   const paramValueId = routeIdParam || queryIdParam;
   if (paramValueId) {
     this.technicService.getTicketById(paramValueId).subscribe((data) => {
       this.techmodel = data;
     })
     // const techmodelStorage= this.techmodelStorage.getStorage();
     // this.techmodel = techmodelStorage.find((el) => el.id === paramValueId);
   }



    
  }

  ngAfterViewInit(): void {
   
   
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);


  /* const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
     const technicName = ev.target.value;
     this.initSearchTour(technicName);
   });*/
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
      const postData={...this.techmodel, ...userData};
      
      const userId= this.userService.getUser()?.id || null ;
      const postObj: IOrder = {
        techName: postData.techName,
        firstName: postData.firstName,
       // lastName: postData.lastName,
       cardNumber: postData.cardNumber,
        workingTime: postData.workingTime,
        
        workingDay: postData.workingDay,
        workingLocation: postData.workingLocation,
        
        technicId: postData.id,
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
      
       // goToTicketInfoPage(technic: ITechnic) {
      //    this.router.navigate(['/techmodels/techmodel/${item.id}'], {

            // queryParams: {id: technic.id},
            // relativeTo: this.route

        //    }
       //   );
      //  }

      goToTicketInfoPage(technic: ITechnic) {
        this.router.navigate(['/techmodels/techmodel'], {
            queryParams: {id: technic._id},
            relativeTo: this.route
          }
        );
      }
    }