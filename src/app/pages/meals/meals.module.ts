import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { AnimatedLikeModule } from '../../components/animated-like/animated-like.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsPageRoutingModule,
    AnimatedLikeModule
  ],
  declarations: [MealsPage, MealFormComponent]
})
export class MealsPageModule { }
