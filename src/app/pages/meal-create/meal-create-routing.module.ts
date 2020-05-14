import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealCreatePage } from './meal-create.page';

const routes: Routes = [
  {
    path: '',
    component: MealCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealCreatePageRoutingModule {}
