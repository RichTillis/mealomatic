import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsPage } from './meals.page';

const routes: Routes = [
  {
    path: '',
    component: MealsPage
  },
  {
    path: 'sort-menu',
    loadChildren: () => import('./components/sort-menu/sort-menu.module').then( m => m.SortMenuPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsPageRoutingModule {}
