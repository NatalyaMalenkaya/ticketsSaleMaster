import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { TechmodelInfoRoutingModule } from './techmodel-info-routing.module';
import { TechmodelItemComponent } from './techmodel-item/techmodel-item.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  declarations: [
    TechmodelItemComponent
  ],
  imports: [
    CommonModule,
    TechmodelInfoRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    CarouselModule,
    FormsModule
  ]
})
export class TechmodelInfoModule { }
