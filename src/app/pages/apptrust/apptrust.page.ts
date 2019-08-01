import {Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SecurityService } from '../../services/security.service';


declare var navigator: any;
@Component({
    selector: 'apptrust',
    templateUrl: './apptrust.page.html',
    styleUrls: ['./apptrust.page.scss'],
})

export class AppTrustPage {
  public serverUrl: any;
  public message: any;

  constructor(private securityService: SecurityService, private alertController: AlertController) {
    if (this.securityService.getConfig() !== undefined) {
      this.serverUrl = this.securityService.getConfig();
    } else {
      this.serverUrl = {url: '/apptrust'};
    }
  }

  public isDisabled() {
    return !this.securityService.isEnabled();
  }

  public clientInit() {
    this.securityService.clientInit()
    .then(clientData => {
      if (clientData.data.disabled) {
        // tslint:disable-next-line: max-line-length
        this.message = 'This application version is currently disabled <br /><br /><strong>Disable Message from Server</strong>:  ' + clientData.data.disabledMessage;
        this.alert(this.message);
      } else {
        this.message = 'This application version is currently enabled';
        this.alert(this.message);
      }
    })
    .catch(Error => {
      this.message = 'Unable to connect to the Mobile Security Service, check your internet connection';
      console.log(Error);
      this.alert(this.message);
    });
  }

  private async alert(message: string): Promise<any> {
    const alert = await this.alertController.create({
      header: 'Application Trust',
      subHeader: 'Check for App Version Disablement',
      message: message,
      // Typically As a Developer you should close the application on a negative outcome at this point
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Handle the exit of the application at this point');
            // navigator['app'].exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
