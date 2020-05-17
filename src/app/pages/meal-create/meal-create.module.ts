import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealCreatePageRoutingModule } from './meal-create-routing.module';

import { MealCreatePage } from './meal-create.page';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MealCreatePageRoutingModule,
    ImageCropperModule
  ],
  declarations: [MealCreatePage]
})
export class MealCreatePageModule {}
