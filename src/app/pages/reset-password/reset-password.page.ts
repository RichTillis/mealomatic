import { LoadingController, AlertController, IonNav } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email = '';

  constructor(
    private auth: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private nav: IonNav
  ) { }

  ngOnInit() {
  }

  async sendResetEmail() {
    const loading = await this.loadingController.create();

    await loading.present();

    this.auth.resetPw(this.email).then(
      async res => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Check your emails for a recovery email now!',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.nav.pop();
              }
            }
          ]
        });
        await alert.present();
      },

      async err => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: ':(',
          message: err.message,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}
