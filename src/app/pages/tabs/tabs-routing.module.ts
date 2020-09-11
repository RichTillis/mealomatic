import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'current',
        loadChildren: () =>
          import('../current-menu/current-menu.module').then(m => m.CurrentMenuPageModule),
      },
      {
        path: 'meals',
        loadChildren: () =>
          import('../meals/meals.module').then(m => m.MealsPageModule),
      },
      {
        path: 'menus',
        loadChildren: () =>
          import('../menus/menus.module').then(m => m.MenusPageModule),
      },
      // {
      //   path: 'notifications',
      //   loadChildren: () =>
      //     import('../notifications/notifications.module').then(
      //       m => m.NotificationsPageModule
      //     ),
      // },
      {
        path: 'account',
        loadChildren: () =>
          import('../account/account.module').then(m => m.AccountPageModule),
      },
      {
        path: '',
        redirectTo: 'current',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
