import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AnimatedLikeComponent } from './animated-like.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [AnimatedLikeComponent],
    exports: [
        AnimatedLikeComponent
    ]
})
export class AnimatedLikeModule { }
