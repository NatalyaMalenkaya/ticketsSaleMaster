import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {StatisticComponent} from './statistic/statistic/statistic.component';
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    TabViewModule,
    TableModule
  ]
})
export class SettingsModule { }
