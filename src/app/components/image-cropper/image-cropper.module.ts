import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ImageCropperComponent } from './image-cropper.component'
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ImageCropperModule
    ],
    declarations: [ImageCropperComponent],
    exports: [
        ImageCropperComponent
    ]
})
export class ImageCropModule { }
