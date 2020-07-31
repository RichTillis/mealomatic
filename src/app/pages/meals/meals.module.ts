import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { RecipeCardModule } from '../../components/recipe-card/recipe-card.module';
import { RecipeListCardModule } from '../../components/recipe-list-card/recipe-list-card.module';

import { AnimatedLikeModule } from '../../components/animated-like/animated-like.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsPageRoutingModule,
    AnimatedLikeModule,
    RecipeCardModule,
    RecipeListCardModule
  ],
  declarations: [MealsPage, MealFormComponent]
})
export class MealsPageModule { }
