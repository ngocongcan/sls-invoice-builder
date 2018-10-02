import { Component } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

/*
  Generated class for the AlertBox component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'alert-box',
  templateUrl: 'alert-box.html'
})

export class AlertBoxComponent {

  constructor(private alertCtrl: AlertController) {
    console.log('Hello AlertBox Component');
  }

  showInfoAlert(title?: string, subTitle?: string, message?: string) {
     this.alertCtrl.create(
      {
        title: title,
        subTitle: subTitle,
        message: message,
        buttons: ['OK'],
        enableBackdropDismiss: false
      }
    ).present();
  }

  createInfoAlert(title?: string, subTitle?: string, message?: string): Alert {
    return this.alertCtrl.create(
      {
        title: title,
        subTitle: subTitle,
        message: message,
        buttons: ['OK'],
        enableBackdropDismiss: false
      }
    );
  }

  createInfoAlertWithCallback(okCallback, title?: string, subTitle?: string, message?: string, buttonText: string = 'OK'): Alert {
    return this.alertCtrl.create(
      {
        title: title,
        subTitle: subTitle,
        message: message,
        buttons: [{
          text: buttonText,
          handler: () => {
            okCallback();
          }
        }],
        enableBackdropDismiss: false
      }
    );
  }

  createConfirmAlert(okCallback, title?: string, subTitle?: string, message?: string) {
    return this.alertCtrl.create(
      {
        title: title,
        subTitle: subTitle,
        message: message,
        buttons: [
          {
            text: 'NO'
          },
          {
            text: 'YES',
            handler: () => {
              okCallback();
            }
          }
        ]
      }
    );
  }
}