import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsComponent} from './tickets.component'
import {TicketListComponent} from './ticket-list/ticket-list.component'
import { FeedbackComponent } from '../feedback/feedback.component';
import { ForAdminComponent } from '../for-admin/for-admin.component';

const routes: Routes = [
  {
    path: '', component: TicketsComponent,
    

    children: [
      {
        path: 'tickets-list',
        component: TicketListComponent
      },
      {
        path: 'ticket',
        loadChildren: () => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'feedback',
        loadChildren: () => import('../feedback/feedback.module').then(m => m.FeedbackModule)
      },
      {
        path: 'for-admin',
        loadChildren: () => import('../for-admin/for-admin.module').then(m => m.ForAdminModule)
      }]
  },
  {path: '**', component: ForAdminComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
