import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HeaderComponent } from '../tickets/header/header.component';
//import { FooterComponent } from '../tickets/footer/footer.component';
import { FeedbackComponent } from './feedback.component';
//import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
//import { AsideComponent } from '../tickets/aside/aside.component';
import { FeedbackRoutingModule } from './feedback-routing.module';



@NgModule({
  declarations: [
    FeedbackComponent
       
  ],
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    ToastModule,
    //BlocksStyleDirective,
    //HeaderComponent,
    //FooterComponent,
    //AsideComponent,
    ReactiveFormsModule,
    TabViewModule,
    ButtonModule,
    TableModule,
    FeedbackRoutingModule
  ]
})
export class FeedbackModule { }
