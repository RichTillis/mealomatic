import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentMenuPageRoutingModule } from './current-menu-routing.module';

import { CurrentMenuPage } from './current-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentMenuPageRoutingModule
  ],
  declarations: [CurrentMenuPage]
})
export class CurrentMenuPageModule {}
