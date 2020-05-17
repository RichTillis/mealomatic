import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealCreateTestPageRoutingModule } from './meal-create-test-routing.module';

import { MealCreateTestPage } from './meal-create-test.page';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealCreateTestPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [MealCreateTestPage]
})
export class MealCreateTestPageModule {}
