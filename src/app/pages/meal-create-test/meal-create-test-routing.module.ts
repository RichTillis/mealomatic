import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealCreateTestPage } from './meal-create-test.page';

const routes: Routes = [
  {
    path: '',
    component: MealCreateTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealCreateTestPageRoutingModule {}
