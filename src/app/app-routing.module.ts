import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'menus',
    loadChildren: () => import('./pages/menus/menus.module').then( m => m.MenusPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'meals',
    loadChildren: () => import('./pages/meals/meals.module').then( m => m.MealsPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'meal-create',
    loadChildren: () => import('./pages/meal-create/meal-create.module').then( m => m.MealCreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
