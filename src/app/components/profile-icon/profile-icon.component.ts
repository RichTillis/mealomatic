import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';

import { ModalBaseComponent } from 'src/app/components/modal-base/modal-base.component';
import { AccountPage } from '../../pages/account/account.page';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss'],
})
export class ProfileIconComponent implements OnInit {

  constructor(public modalController: ModalController, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() { }

  async openAccount() {
    const modal = await this.modalController.create({
      component: ModalBaseComponent,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        rootPage: AccountPage,
      },
    });
    await modal.present();
  }

}
