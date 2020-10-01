import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';
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
    RecipeListCardModule,    
    SharedComponentsModule
  ],
  declarations: [MealsPage]
})
export class MealsPageModule { }
