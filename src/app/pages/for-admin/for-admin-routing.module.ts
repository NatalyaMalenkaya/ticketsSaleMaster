import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForAdminComponent } from './for-admin.component';

const routes: Routes = [
  {
    path: '',
    component: ForAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForAdminRoutingModule { }
