import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecipeListCardComponent } from './recipe-list-card.component'
import { AnimatedLikeModule } from '../../components/animated-like/animated-like.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AnimatedLikeModule
    ],
    declarations: [RecipeListCardComponent],
    exports: [
        RecipeListCardComponent
    ]
})
export class RecipeListCardModule { }
