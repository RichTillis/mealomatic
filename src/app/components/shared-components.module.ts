import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ModalBaseComponent } from './modal-base/modal-base.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';

@NgModule({
  declarations: [ModalBaseComponent, ProfileIconComponent],
  imports: [CommonModule, IonicModule],
  exports: [ModalBaseComponent, ProfileIconComponent],
})
export class SharedComponentsModule { }
