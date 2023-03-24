import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'techmodels',
    loadChildren: ()  => import('./pages/techmodels/techmodels.module').then(m => m.TicketsModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackModule)
  },
  {
    path: 'for-admin',
    loadChildren: () => import('./pages/for-admin/for-admin.module').then(m => m.ForAdminModule)
  },
  { path: '**',
   redirectTo: 'auth'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
