import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StatisticComponent} from './statistic/statistic/statistic.component';
import {TableModule} from "primeng/table";
//import { TourLoaderComponent } from './technic-loader/technic-loader.component';



@NgModule({
  declarations: [
    AccountComponent,
    StatisticComponent,
   // TourLoaderComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    TabViewModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    TabViewModule,
    TableModule
  ]
})
export class AccountModule { }
