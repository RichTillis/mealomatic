import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

import { MenusPageRoutingModule } from './menus-routing.module';

import { MenusPage } from './menus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenusPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [MenusPage]
})
export class MenusPageModule {}
