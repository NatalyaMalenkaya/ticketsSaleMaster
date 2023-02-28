import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForAdminComponent } from './for-admin.component';
import { ForAdminRoutingModule } from './for-admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ForAdminComponent
  ],
  imports: [
    CommonModule,
    ForAdminRoutingModule,
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
export class ForAdminModule { }
