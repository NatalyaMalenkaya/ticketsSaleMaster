import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TechmodelsComponent} from './techmodels.component'
import {TechmodelListComponent} from './techmodel-list/techmodel-list.component'
import { ForAdminComponent } from '../for-admin/for-admin.component';

const routes: Routes = [
  {
    path: '', component: TechmodelsComponent,
    children: [
      {
        path: 'techmodels-list',
        component: TechmodelListComponent
      },
      {
        path: 'techmodel',
        loadChildren: () => import('../techmodel-info/techmodel-info.module').then(m => m.TechmodelInfoModule)
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
