import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from 'primeng/api';
import { TicketsRoutingModule } from './techmodels-routing.module';
import { TechmodelsComponent } from './techmodels.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TechmodelListComponent } from './techmodel-list/techmodel-list.component';
import { AsideComponent } from './aside/aside.component';
import {MenubarModule} from 'primeng/menubar';
import {BlocksStyleDirective} from '../../directive/blocks-style.directive';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    TechmodelsComponent,
    HeaderComponent,
    FooterComponent,
    TechmodelListComponent,
    AsideComponent,
    BlocksStyleDirective
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class TicketsModule { }
