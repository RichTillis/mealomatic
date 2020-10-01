import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MealEditPageRoutingModule } from './meal-edit-routing.module';
import { MealEditPage } from './meal-edit.page';
import { ImageCropModule } from '../../components/image-crop/image-crop.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MealEditPageRoutingModule,
    ImageCropModule
  ],
  declarations: [MealEditPage]
})
export class MealEditPageModule {}
