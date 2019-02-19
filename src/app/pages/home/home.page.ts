import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushService, PushMessage } from '../../services/push.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NavController } from '@ionic/angular';

declare var document: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private background = false;

    constructor(
        private localNotifications: LocalNotifications,
        plt: Platform,
        push: PushService,
        public navCtrl: NavController) {
        // We need to wait for the platform to initialize the plugins
        plt.ready().then(() => {
            push.initPush();
            push.setCallback(this.handleNotification.bind(this));
            push.register();

            if (document) {
              document.addEventListener('deviceready', () => {
                document.addEventListener('pause', () => { this.background = true; }, false);
                document.addEventListener('resume', () => { this.background = false; }, false);
              }, false);
            }
        });
    }

    public handleNotification(notification: PushMessage) {
      if (this.background) {
        this.navCtrl.navigateForward('tasks');
      }
    }
}
