import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealCreatePageRoutingModule } from './meal-create-routing.module';

import { MealCreatePage } from './meal-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MealCreatePageRoutingModule
  ],
  declarations: [MealCreatePage]
})
export class MealCreatePageModule {}
