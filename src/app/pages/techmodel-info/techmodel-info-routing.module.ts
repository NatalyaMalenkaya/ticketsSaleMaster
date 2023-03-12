import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TechmodelItemComponent} from "./techmodel-item/techmodel-item.component"

const routes: Routes = [
  {
    path: '',
    component: TechmodelItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechmodelInfoRoutingModule { }
