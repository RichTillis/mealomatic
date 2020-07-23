import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortMenuPage } from './sort-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SortMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortMenuPageRoutingModule {}
