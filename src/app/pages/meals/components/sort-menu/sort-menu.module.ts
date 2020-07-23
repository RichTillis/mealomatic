import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SortMenuPageRoutingModule } from './sort-menu-routing.module';

import { SortMenuPage } from './sort-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SortMenuPageRoutingModule
  ],
  declarations: [SortMenuPage]
})
export class SortMenuPageModule {}
